import * as exported from '../string.util';

describe('tests for string.util', () => {
  it('should export removeTrailingCharacter', () => {
    expect(exported['removeTrailingCharacter']).toBeTruthy();
  });
});
