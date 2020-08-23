import * as exported from '../string.util';

describe('tests for string.util', () => {
  it('should export removeTrailingCharacter, removeLeadingCharacter', () => {
    expect(exported['removeTrailingCharacter']).toBeTruthy();
    expect(exported['removeLeadingCharacter']).toBeTruthy();
  });
});
