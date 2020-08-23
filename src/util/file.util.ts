import files, { promises as fs } from 'fs';
import { parse, stringify, CommentJSONValue } from 'comment-json';
import { Config, PathTypes } from '../model/enums';
import { resolve, dirname } from 'path';
import { removeTrailingCharacter, removeLeadingCharacter } from './string.util';
import findUp from 'find-up';

async function saveFile(data: string, path: string): Promise<void> {
  const file = getFilePath(path);
  await fs.writeFile(file, data, 'utf-8');
}

async function getFile(path: string): Promise<string> {
  const file = getFilePath(path);
  const data: string = await fs.readFile(file, 'utf-8');
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

export async function getPathFromProjectRoot(path: string): Promise<string> {
  const projectRootDirectory = resolve(dirname((await findUp(Config.TSCONFIG)) || Config.TSCONFIG));
  let currentPath = resolve(`${process.cwd()}/${path}`);
  currentPath = removeLeadingCharacter(currentPath.replace(`${projectRootDirectory}`, ''), '/');
  return `./${currentPath}`;
}

/**
 * This is a generator function that is used to get/set data from tsconfig
 */
export async function* configFileDataManager(): AsyncGenerator<CommentJSONValue, void, CommentJSONValue> {
  const configFilePath = (await findUp(Config.TSCONFIG)) || Config.TSCONFIG;
  const dataStr = await fs.readFile(configFilePath, 'utf-8');
  const data: CommentJSONValue = yield parse(dataStr);
  await fs.writeFile(configFilePath, stringify(data, null, 2), 'utf-8');
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
