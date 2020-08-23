export function removeTrailingCharacter(str: string, character: string): string {
  if (str.substr(-1) === character) {
    str = str.slice(0, str.length - 1);
  }
  return str;
}

export function removeLeadingCharacter(str: string, character: string): string {
  if (str.slice(0, 1) === character) {
    str = str.slice(1, str.length);
  }
  return str;
}
