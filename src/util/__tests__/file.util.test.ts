import * as exported from '../file.util';

describe('tests for config-file.util', () => {
  it('should export configFileDataManager, fileDataManager, getFilePath', () => {
    expect(exported['configFileDataManager']).toBeTruthy();
    expect(exported['fileDataManager']).toBeTruthy();
    expect(exported['getFilePath']).toBeTruthy();
  });
});
