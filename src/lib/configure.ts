import { configFileDataManager } from '../util/config-file.util';
import { CommentJSONValue } from 'comment-json';

export async function configure(action: string, value: string): Promise<void> {
  try {
    if (!action || !value) {
      throw new Error('Error: configure requires two parameters');
    }
    switch (action) {
      case 'base-url': {
        await configureBaseUrl(value);
        break;
      }
      case 'add-path': {
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
  // remove a trailing forward slash
  if (path[path.length - 1] === '/') {
    path = path.slice(0, path.length - 1);
  }
  const manager = configFileDataManager();
  const data = (await manager.next()).value;
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
  data.compilerOptions.baseUrl = baseUrl;
  await manager.next(data);
}

/**
 * @param message The error message object
 */
function logError(message: string): void {
  if (message.includes('ENOENT')) {
    console.error('ERROR: Cannot find tsconfig.json in the current directory.');
    console.log(`You can run 'tsc --init' to create one.`);
  } else {
    console.error(message);
  }
}
