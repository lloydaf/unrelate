import * as exported from '../file.util';

describe('tests for config-file.util', () => {
  it('should export configFileDataManager, fileDataManager, getFilePath, doesItExist, fileOrFolder, getDirectoryItems', () => {
    expect(exported['configFileDataManager']).toBeTruthy();
    expect(exported['fileDataManager']).toBeTruthy();
    expect(exported['getFilePath']).toBeTruthy();
    expect(exported['doesItExist']).toBeTruthy();
    expect(exported['fileOrFolder']).toBeTruthy();
    expect(exported['getDirectoryItems']).toBeTruthy();
  });
});
