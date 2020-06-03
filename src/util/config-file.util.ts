import { promises as fs } from 'fs';
import { parse, stringify, CommentJSONValue } from 'comment-json';
import { Config } from '../model/enums';

export async function saveConfigFile(data: string): Promise<void> {
  const configFile = getFilePath();
  await fs.writeFile(configFile, data, 'utf-8');
}

export async function getConfigFile(): Promise<string> {
  const configFile = getFilePath();
  const data: string = await fs.readFile(configFile, 'utf-8');
  return data;
}

function getFilePath(path = Config.TSCONFIG): string {
  const directory = process.cwd();
  const configFile = `${directory}/${path}`;
  return configFile;
}

/**
 * This is a generator function that is used to get/set data from tsconfig
 */
export async function* configFileDataManager(): AsyncGenerator<CommentJSONValue, void> {
  const dataStr = await getConfigFile();
  const data = yield parse(dataStr);
  await saveConfigFile(stringify(data, null, 2));
  return;
}
