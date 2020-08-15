import {
  fileDataManager,
  configFileDataManager,
  getFilePath,
  doesItExist,
  fileOrFolder,
  getDirectoryItems,
} from '../util/file.util';
import { CommentJSONValue } from 'comment-json';
import { dirname } from 'path';
import { removeTrailingCharacter } from '../util/string.util';
import { PathTypes } from '../model/enums';

export async function cleanup(paramPath: string): Promise<void> {
  if (!doesItExist(paramPath)) {
    throw new Error(`Not a valid ${fileOrFolder(paramPath)} path`);
  }
  if (fileOrFolder(paramPath) === PathTypes.FOLDER) {
    const filesInDirectory = getDirectoryItems(paramPath);
    filesInDirectory.forEach((item) => {
      switch (fileOrFolder(item)) {
        case PathTypes.FILE: {
          if (item.endsWith('.ts')) {
            console.log('cleaning up', item);
            cleanup(item);
          }
          break;
        }
        case PathTypes.FOLDER: {
          cleanup(item);
          break;
        }
      }
    });
    return;
  }
  const configManager = configFileDataManager();
  const configFile: CommentJSONValue = (await configManager.next()).value;
  const configuredPathsObj: Record<string, string[]> = configFile?.compilerOptions?.paths;
  const baseUrl: string = configFile?.compilerOptions?.baseUrl;

  if (!configuredPathsObj || !baseUrl) {
    throw new Error('You need to configure base-url and paths first');
  }

  // the configured paths
  const configuredPaths: Record<string, string> = Object.entries(configuredPathsObj).reduce(
    (acc: Record<string, string>, [key, val]: [string, string[]]) => ({
      ...acc,
      [getFilePath(baseUrl + val[0])]: removeTrailingCharacter(key, '*'),
    }),
    {},
  );

  const fileManager = fileDataManager(paramPath);
  let file: string = <string>(await fileManager.next()).value;

  const relativePathsInFile: string[] = file.match(RegExp(`(?<=['"]{1})(\\./)*(\\.\\./)+.*`, 'g')) || [];
  const absolutePathsInFile =
    relativePathsInFile.map((path: string) => getFilePath(`${dirname(paramPath)}/${path}`)) || [];
  Object.entries(configuredPaths).forEach(([key, value]) => {
    absolutePathsInFile.forEach((path, index) => {
      if (path.includes(key)) {
        path = path.replace(`${key}`, value);
        path = path.replace(/\\/g, '/');
        path = path.replace(/\/\//g, '/');
        file = file.replace(relativePathsInFile[index], path);
      }
    });
  });

  fileManager.next(file);
  return;
}
