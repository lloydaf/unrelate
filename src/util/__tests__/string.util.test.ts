import * as exported from '../string.util';

describe('tests for string.util', () => {
  it('should export removeTrailingCharacter, removeLeadingCharacter', () => {
    expect(exported['removeTrailingCharacter']).toBeTruthy();
    expect(exported['removeLeadingCharacter']).toBeTruthy();
  });

  const sampleString = 'Hello';
  const sampleCharacter = '+';

  describe('removeTrailingCharacter', () => {
    const removeTrailingCharacter = exported['removeTrailingCharacter'];

    it('removes a trailing character if character present', () => {
      const stringWithTrailingCharacter = sampleString + sampleCharacter;
      const stringWithoutTrailingCharacter = removeTrailingCharacter(stringWithTrailingCharacter, sampleCharacter);
      expect(stringWithoutTrailingCharacter).toEqual(sampleString);
    });

    it('does not alter the string if trailing character not present', () => {
      expect(removeTrailingCharacter(sampleString, sampleCharacter)).toEqual(sampleString);
    });
  });

  describe('removeLeadingCharacter', () => {
    const removeLeadingCharacter = exported['removeLeadingCharacter'];

    it('removes a leading character if character present', () => {
      const stringWithLeadingCharacter = sampleCharacter + sampleString;
      const stringWithoutLeadingCharacter = removeLeadingCharacter(stringWithLeadingCharacter, sampleCharacter);
      expect(stringWithoutLeadingCharacter).toEqual(sampleString);
    });

    it('does not alter the string if leading character not present', () => {
      expect(removeLeadingCharacter(sampleString, sampleCharacter)).toEqual(sampleString);
    });
  });
});
