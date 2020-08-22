import * as exported from '../configure';

describe('tests for configure.ts', () => {
  it('should export a function called configure, configureBaseUrl and addPath', () => {
    expect(exported['configure']).toBeTruthy();
    expect(exported['addPath']).toBeTruthy();
    expect(exported['configureBaseUrl']).toBeTruthy();
  });
});
