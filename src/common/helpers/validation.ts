export function isUrl(url: string): boolean {
  const urlExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const isUrlRegex = new RegExp(urlExpression);
  return isUrlRegex.test(url);
}
