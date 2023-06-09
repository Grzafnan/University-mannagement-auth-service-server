const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> & Record<K, T[K]> => {
  const finalObj: Partial<T> & Record<K, T[K]> = {} as Partial<T> &
    Record<K, T[K]>;

  for (const key of keys) {
    if (obj && obj.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
