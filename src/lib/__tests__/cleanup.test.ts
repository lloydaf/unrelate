import * as exported from '../cleanup';

describe('tests for cleanup.ts', () => {
  it('should export a function called cleanup', () => {
    expect(exported['cleanup']).toBeTruthy();
  });
});
