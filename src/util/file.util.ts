import { promises as fs } from 'fs';
import { parse, stringify, CommentJSONValue } from 'comment-json';
import { Config } from '../model/enums';
import { resolve } from 'path';
import { removeTrailingCharacter } from './string.util';

async function saveFile(data: string, path: string): Promise<void> {
  const configFile = getFilePath(path);
  await fs.writeFile(configFile, data, 'utf-8');
}

async function getFile(path: string): Promise<string> {
  const configFile = getFilePath(path);
  const data: string = await fs.readFile(configFile, 'utf-8');
  return data;
}

export function getFilePath(relativeFilePath: string): string {
  relativeFilePath = removeTrailingCharacter(relativeFilePath, '*');
  const directory = process.cwd();
  const absoluteFilePath = resolve(`${directory}/${relativeFilePath}`);
  return absoluteFilePath;
}

export async function* fileDataManager(filePath: string): AsyncGenerator<string, void, string> {
  const dataStr = await getFile(filePath);
  const data: string = yield dataStr;
  await saveFile(data, filePath);
  return;
}

/**
 * This is a generator function that is used to get/set data from tsconfig
 */
export async function* configFileDataManager(): AsyncGenerator<CommentJSONValue, void, CommentJSONValue> {
  let dataStr: string;
  let fileName: string;
  try {
    dataStr = await getFile(Config.TSCONFIG);
    fileName = Config.TSCONFIG;
  } catch (err) {
    dataStr = await getFile(Config.JSCONFIG);
    fileName = Config.JSCONFIG;
  }
  const data: CommentJSONValue = yield parse(dataStr);
  await saveFile(stringify(data, null, 2), fileName);
  return;
}
