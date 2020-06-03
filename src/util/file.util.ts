import { promises as fs } from 'fs';
import { parse, stringify, CommentJSONValue } from 'comment-json';
import { Config } from '../model/enums';

async function saveFile(data: string, path: string): Promise<void> {
  const configFile = getFilePath(path);
  await fs.writeFile(configFile, data, 'utf-8');
}

async function getFile(path: string): Promise<string> {
  const configFile = getFilePath(path);
  const data: string = await fs.readFile(configFile, 'utf-8');
  return data;
}

function getFilePath(path: string): string {
  const directory = process.cwd();
  const configFile = `${directory}/${path}`;
  return configFile;
}

export async function* fileDataManager(filePath: string): AsyncGenerator<string, null, string> {
  const dataStr = await getFile(filePath);
  const data: string = yield dataStr;
  await saveFile(data, filePath);
  return null;
}

/**
 * This is a generator function that is used to get/set data from tsconfig
 */
export async function* configFileDataManager(): AsyncGenerator<CommentJSONValue, void, CommentJSONValue> {
  const dataStr = await getFile(Config.TSCONFIG);
  const data: CommentJSONValue = yield parse(dataStr);
  await saveFile(stringify(data, null, 2), Config.TSCONFIG);
  return;
}
