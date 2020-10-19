import * as exported from '../string.util';

describe('tests for string.util', () => {
  it('should export removeTrailingCharacter, removeLeadingCharacter', () => {
    expect(exported['removeTrailingCharacter']).toBeTruthy();
    expect(exported['removeLeadingCharacter']).toBeTruthy();
  });

  describe('removeTrailingCharacter', () => {
    const removeTrailingCharacter = exported['removeTrailingCharacter'];
    const sampleString = 'Hello';
    const sampleCharacter = '+';
    it('removes a trailing character if character present', () => {
      const stringWithTrailingCharacter = sampleString + sampleCharacter;
      const stringWithoutTrailingCharacter = removeTrailingCharacter(stringWithTrailingCharacter, sampleCharacter);
      expect(stringWithoutTrailingCharacter).toEqual(sampleString);
    });

    it('does not alter the string if trailing character not present', () => {
      expect(removeTrailingCharacter(sampleString, sampleCharacter)).toEqual(sampleString);
    });
  });
});
