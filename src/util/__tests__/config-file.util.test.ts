import { configFileDataManager, getConfigFile, saveConfigFile } from '../config-file.util';

describe('tests for config-file.util', () => {
  it('should export configFileDataManager, getConfigFile, saveConfigFile', () => {
    expect(configFileDataManager).toBeTruthy();
    expect(getConfigFile).toBeTruthy();
    expect(saveConfigFile).toBeTruthy();
  });
});
