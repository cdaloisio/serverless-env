import fs from 'fs';
import YAML from 'yaml';
import { interpolateValue } from './dictionary';
export function findFile(options) {
    const { envMapFile } = options;
    return fs.existsSync(envMapFile)
        ? Promise.resolve(true)
        : Promise.reject(new Error(`Cannot find ${envMapFile}. Please use option --envMapFile to provide the correct YAML file.`));
}
export function writeFile(mappings, options) {
    const { stage } = options;
    const envFile = `.env.${stage}`;
    const data = Object.entries(mappings)
        .map(value => `${value[0]}=${value[1]}`)
        .join('\n');
    return fs.writeFileSync(envFile, data);
}
export function parseEnvMappings(options) {
    const { envMapFile, stage } = options;
    const yaml = parseFile(envMapFile);
    const processedYaml = interpolateValue(yaml, 'stage', stage);
    return processedYaml;
}
function parseFile(filePath) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return YAML.parse(fileContents);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52TWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbnZNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBQ3BCLE9BQU8sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUd4QixPQUFPLEVBQWMsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFNUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxPQUFnQjtJQUN2QyxNQUFNLEVBQUUsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRS9CLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDOUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNaLElBQUksS0FBSyxDQUNQLGVBQWUsVUFBVSxvRUFBb0UsQ0FDOUYsQ0FDRixDQUFDO0FBQ1IsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsUUFBb0IsRUFBRSxPQUFnQjtJQUM5RCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBQzFCLE1BQU0sT0FBTyxHQUFHLFFBQVEsS0FBSyxFQUFFLENBQUM7SUFFaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDbEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7U0FDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWQsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE9BQWdCO0lBQy9DLE1BQU0sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRXRDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTdELE9BQU8sYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxRQUFnQjtJQUNqQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUV2RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9