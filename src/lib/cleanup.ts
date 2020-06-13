import { fileDataManager, configFileDataManager, getFilePath } from '../util/file.util';
import { CommentJSONValue } from 'comment-json';
import { dirname } from 'path';
import { removeTrailingAsterisk } from '../util/string.util';

export async function cleanup(filePath: string): Promise<void> {
  const configManager = configFileDataManager();
  const configFile: CommentJSONValue = (await configManager.next()).value;
  const configuredPathsObj: Record<string, string> = configFile?.compilerOptions?.paths;
  const baseUrl: string = configFile?.compilerOptions?.baseUrl;

  if (!configuredPathsObj || !baseUrl) {
    throw new Error('You need to configure base-url and paths first!');
  }

  // the configured paths
  const configuredPaths: Record<string, string> = Object.entries(configuredPathsObj).reduce(
    (acc, [key, val]) => ({ ...acc, [getFilePath(baseUrl + val)]: removeTrailingAsterisk(key) }),
    {},
  );

  const fileManager = fileDataManager(filePath);
  let file: string = <string>(await fileManager.next()).value;

  const relativePathsInFile: string[] = file.match(RegExp(`(?<=import.*)(?<=['"]{1}(./)*)(../)+.*`, 'g')) || [];
  const absolutePathsInFile =
    relativePathsInFile.map((path: string) => getFilePath(`${dirname(filePath)}/${path}`)) || [];

  Object.entries(configuredPaths).forEach(([key, value]) => {
    absolutePathsInFile.forEach((path, index) => {
      if (path.includes(key)) {
        path = path.replace(`${key}/`, value);
        file = file.replace(relativePathsInFile[index], path);
      }
    });
  });

  fileManager.next(file);
  return;
}
