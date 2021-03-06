import { configFileDataManager, doesItExist, fileOrFolder, getPathFromProjectRoot } from '../util/file.util';
import { CommentJSONValue } from 'comment-json';
import { removeTrailingCharacter, removeLeadingCharacter } from '../util/string.util';
import { Commands, PathTypes } from '../model/enums';

export async function configure(action: string, value: string): Promise<void> {
  if (!action || !value) {
    throw new Error('Error: configure requires two parameters');
  }
  switch (action) {
    case Commands.BASE_URL: {
      await configureBaseUrl(value);
      break;
    }
    case Commands.ADD_PATH: {
      await addPath(value);
      break;
    }
  }
}

/**
 * Adds an absolute path configuration to your project
 * @param path The path to be added to your ts project
 */
export async function addPath(path: string): Promise<void> {
  if (!doesItExist(path)) {
    throw new Error(`Not a valid ${fileOrFolder(path)} path`);
  }
  let relativePath = await getPathFromProjectRoot(path);
  const manager = configFileDataManager();
  const data = (await manager.next()).value;
  const baseUrl = data?.compilerOptions?.baseUrl;
  if (!baseUrl) {
    throw new Error(`${Commands.BASE_URL} must be configured before adding paths`);
  }
  if (baseUrl === relativePath) {
    throw new Error(`${Commands.BASE_URL} and path cannot be the same`);
  }
  relativePath = removeLeadingCharacter(relativePath.replace(baseUrl, ''), '/');
  relativePath = removeTrailingCharacter(relativePath, '/');
  const paths = data.compilerOptions.paths || {};
  const keyStart = relativePath.lastIndexOf('/') || 0;
  const key = relativePath.slice(keyStart + 1);

  // This allows adding a path for a file as well
  switch (fileOrFolder(path)) {
    case PathTypes.FILE: {
      paths[`@${key.slice(0, key.lastIndexOf('.'))}`] = [`${relativePath.slice(0, path.lastIndexOf('.'))}`];
      break;
    }
    case PathTypes.FOLDER: {
      paths[`@${key}*`] = [`${relativePath}*`];
      doesItExist(`${path}/index.ts`) && (paths[`@${key}`] = [`${relativePath}/index`]);
      break;
    }
  }
  data.compilerOptions.paths = paths;
  await manager.next(data);
}

/**
 * Sets the base directory relative to which custom import configurations are matched against
 * @param baseUrl The baseUrl value to set
 */
export async function configureBaseUrl(baseUrl: string): Promise<void> {
  if (!doesItExist(baseUrl)) {
    throw new Error('Not a valid directory path');
  }
  const manager = configFileDataManager();
  const data: CommentJSONValue = (await manager.next()).value;
  baseUrl = await getPathFromProjectRoot(baseUrl);
  data.compilerOptions.baseUrl = baseUrl;
  await manager.next(data);
}
