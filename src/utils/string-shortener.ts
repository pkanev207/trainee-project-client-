export function stringShortener(str: string): string {
  if (str.length >= 18) {
    return str.slice(0, 19) + "...";
  } else {
    return str;
  }
}
