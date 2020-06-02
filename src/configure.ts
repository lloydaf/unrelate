import { promises as fs } from 'fs';
import { parse, stringify } from 'comment-json';

export async function configure(action: string, value: string): Promise<void> {
  try {
    if (!action || !value) {
      throw new Error("Error: configure requires two parameters");
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
  }
  catch (err) {
    logError(err.message)
  }
}

/**
 * 
 * @param path The path to be added to your ts project
 */
async function addPath(path: string): Promise<void> {
  const manager = dataManager();
  let data = (await manager.next()).value;
  const paths = data.compilerOptions.paths || {};
  const keyStart = path.lastIndexOf('/') || 0;
  const key = path.slice(keyStart + 1);
  paths[`${key}/*`] = [`${path}/*`];
  data.compilerOptions.paths = paths;
  await manager.next(data);
}

async function configureBaseUrl(baseUrl: string): Promise<void> {
  const manager = dataManager();
  let data = (await manager.next()).value;
  data.compilerOptions.baseUrl = baseUrl;
  await manager.next(data);
}

/**
 * This is a generator function that is used to get/set data from tsconfig
 */
async function* dataManager() {
  let dataStr = await getConfigFile();
  const data = yield parse(dataStr);
  await setConfigFile(stringify(data, null, 2));
}

/**
 * @param message The error message object
 */
function logError(message: string): void {
  if (message.includes('ENOENT')) {
    console.error('ERROR: Cannot find tsconfig.json in the current directory.');
    console.log(`You can run 'tsc --init' to create one.`);
  }
  else {
    console.error(message);
  }
}

async function setConfigFile(data: string): Promise<void> {
  const configFile = getFilePath();
  await fs.writeFile(configFile, data, 'utf-8');
}

async function getConfigFile(): Promise<string> {
  const configFile = getFilePath();
  const data: string = await fs.readFile(configFile, 'utf-8');
  return data;
}

function getFilePath(): string {
  const directory = process.cwd();
  const configFile = `${directory}/tsconfig.json`;
  return configFile;
}