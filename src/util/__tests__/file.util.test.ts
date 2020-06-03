import { configFileDataManager, fileDataManager } from '../file.util';

describe('tests for config-file.util', () => {
  it('should export configFileDataManager, fileDataManager', () => {
    expect(configFileDataManager).toBeTruthy();
    expect(fileDataManager).toBeTruthy();
  });
});
