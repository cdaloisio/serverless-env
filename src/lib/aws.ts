import AWS from 'aws-sdk';
import { Either, left, right } from 'fp-ts/lib/Either'

import { Options } from './cli';
import { Dictionary } from './dictionary';

function initCloudFormation(profile: string): AWS.CloudFormation {
  const credentials = new AWS.SharedIniFileCredentials({ profile });
  const region = 'ap-southeast-2';

  const config = {
    credentials,
    region
  };
  return new AWS.CloudFormation(config);
}

export async function fetchExports(
  options: Options
): Promise<readonly AWS.CloudFormation.Export[] | undefined> {
  const { profile } = options;
  const cloudFormation = initCloudFormation(profile);

  return cloudFormation
    .listExports()
    .promise()
    .then(result => result.Exports)
    .catch(error => Promise.reject(error));
}

export function replaceExportNamesWithValues(
  mappings: Dictionary,
  exports: readonly AWS.CloudFormation.Export[]
): Either<Error, Dictionary> {
  const result = Object.entries(mappings).reduce((acc, elem) => {
    const [primaryKey, primaryValue] = elem;

    const foundExport = exports.find(element => element.Name === primaryValue);
    return foundExport
      ? {
          ...acc,
          [primaryKey]: foundExport.Value || ''
        }
      : acc;
  }, {});
  return Object.keys(mappings).length === Object.keys(result).length
    ? right(result)
    : left(new Error('Not all keys could be found in CloudFormation exports.'))
}
