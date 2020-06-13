export function removeTrailingAsterisk(str: string): string {
  if (str.substr(-1) === '*') {
    str = str.slice(0, str.length - 1);
  }
  return str;
}
