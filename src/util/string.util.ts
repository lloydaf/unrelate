export function removeTrailingCharacter(str: string, character: string): string {
  if (str.substr(-1) === character) {
    str = str.slice(0, str.length - 1);
  }
  return str;
}
