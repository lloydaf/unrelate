import files, { promises as fs } from 'fs';
import { parse, stringify, CommentJSONValue } from 'comment-json';
import { Config, PathTypes } from '../model/enums';
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
  const fileName = Config.TSCONFIG;
  const dataStr = await getFile(fileName);
  const data: CommentJSONValue = yield parse(dataStr);
  await saveFile(stringify(data, null, 2), fileName);
  return;
}

export function doesItExist(path: string): boolean {
  return files.existsSync(path);
}

export function fileOrFolder(path: string): PathTypes {
  const stat = files.lstatSync(path);
  return (stat.isFile() && PathTypes.FILE) || PathTypes.FOLDER;
}

export function getDirectoryItems(path: string): string[] {
  return files.readdirSync(path).map((val: string) => `${path}/${val}`);
}
