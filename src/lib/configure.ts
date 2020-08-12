import { configFileDataManager } from '../util/file.util';
import { CommentJSONValue } from 'comment-json';
import { removeTrailingCharacter } from '../util/string.util';
import { Commands, Config } from '../model/enums';

export async function configure(action: string, value: string): Promise<void> {
  try {
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
  } catch (err) {
    logError(err.message);
  }
}

/**
 * Adds an absolute path configuration to your project
 * @param path The path to be added to your ts project
 */
async function addPath(path: string): Promise<void> {
  if (!path.startsWith('./')) {
    path = `./${path}`;
  }
  const manager = configFileDataManager();
  const data = (await manager.next()).value;
  const baseUrl = data?.compilerOptions?.baseUrl;
  if (!baseUrl) {
    throw new Error(`${Commands.BASE_URL} must be configured before adding paths!`);
  }
  if (baseUrl === path) {
    throw new Error(`${Commands.BASE_URL} and path cannot be the same!`);
  }
  if (path.includes(baseUrl)) {
    path = path.replace(baseUrl, '');
  }
  path = removeTrailingCharacter(path, '/');
  const paths = data.compilerOptions.paths || {};
  const keyStart = path.lastIndexOf('/') || 0;
  const key = path.slice(keyStart + 1);
  paths[`@${key}/*`] = [`${path}/*`];
  data.compilerOptions.paths = paths;
  await manager.next(data);
}

/**
 * Sets the base directory relative to which custom import configurations are matched against
 * @param baseUrl The baseUrl value to set
 */
async function configureBaseUrl(baseUrl: string): Promise<void> {
  const manager = configFileDataManager();
  const data: CommentJSONValue = (await manager.next()).value;
  if (baseUrl === '.') {
    baseUrl = './';
  }
  if (!baseUrl.startsWith('./')) {
    baseUrl = `./${baseUrl}`;
  }
  data.compilerOptions.baseUrl = baseUrl;
  await manager.next(data);
}

/**
 * @param message The error message object
 */
function logError(message: string): void {
  if (message.includes('ENOENT')) {
    console.error(`ERROR: Cannot find ${Config.TSCONFIG} or ${Config.JSCONFIG} in the current directory.`);
    console.log(`If you're using typescript, can run 'tsc --init' to create one.`);
  } else {
    console.error(message);
  }
}
