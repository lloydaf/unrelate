import * as exported from '../configure';

describe('tests for configure.ts', () => {
  it('should export a function called configure', () => {
    expect(exported['configure']).toBeTruthy();
  });
});
