import { fileDataManager, configFileDataManager, getFilePath, doesItExist } from '../util/file.util';
import { CommentJSONValue } from 'comment-json';
import { dirname } from 'path';
import { removeTrailingCharacter } from '../util/string.util';

export async function cleanup(filePath: string): Promise<void> {
  if (!doesItExist(filePath)) {
    throw new Error('Not a valid file path');
  }
  const configManager = configFileDataManager();
  const configFile: CommentJSONValue = (await configManager.next()).value;
  const configuredPathsObj: Record<string, string> = configFile?.compilerOptions?.paths;
  const baseUrl: string = configFile?.compilerOptions?.baseUrl;

  if (!configuredPathsObj || !baseUrl) {
    throw new Error('You need to configure base-url and paths first');
  }

  // the configured paths
  const configuredPaths: Record<string, string> = Object.entries(configuredPathsObj).reduce(
    (acc, [key, val]) => ({ ...acc, [getFilePath(baseUrl + val)]: removeTrailingCharacter(key, '*') }),
    {},
  );

  const fileManager = fileDataManager(filePath);
  let file: string = <string>(await fileManager.next()).value;

  const relativePathsInFile: string[] = file.match(RegExp(`(?<=['"]{1})(./)*(../)+.*`, 'g')) || [];
  const absolutePathsInFile =
    relativePathsInFile.map((path: string) => getFilePath(`${dirname(filePath)}/${path}`)) || [];

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
