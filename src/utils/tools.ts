export function isEmpty(obj: object) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

export function getFromStorage(key: string) {
  const stringContent = sessionStorage.getItem(key);
  // @ts-ignore
  return JSON.parse(stringContent);
}
