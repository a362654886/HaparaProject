import { LRUValue } from "types/RootState";

export const getAllKeys = (mapValues: LRUValue[]) =>
  mapValues.map((LRUcache) => LRUcache.key);

export const checkKeyAndValue = (key: number, value: number) => {
  /*
    key and value range
    0 <= key <= 10(3)
    0 <= value <= 10(5)
    */
  if (
    key < 0 ||
    key > Math.pow(10, 3) ||
    value < 0 ||
    value > Math.pow(10, 5)
  ) {
    return false;
  } else {
    return true;
  }
};
