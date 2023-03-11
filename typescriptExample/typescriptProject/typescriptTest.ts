class LRUValue {
  key: number;
  value: number;

  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
  }

  update(value: number) {
    this.value = value;
  }
}

export class LRUCache {
  capacity: number;
  mapValues: LRUValue[];
  constructor(capacity: number) {
    // the capacity should less than 1000 and bigger than 1
    this.capacity = capacity > 1000 ? 1000 : capacity < 1 ? 1 : capacity;
    this.mapValues = [];
  }

  checkKeyAndValue(key: number, value: number): boolean {
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
  }

  getAllKeys(): number[] {
    return this.mapValues.map((LRUcache) => LRUcache.key);
  }

  put(key: number, value: number): string | LRUValue {
    // check if this key exist
    if (this.getAllKeys().indexOf(key) !== -1) {
      return "this key already exist";
    }
    // check key and value range
    if (!this.checkKeyAndValue(key, value)) {
      return "this key or value out of the range";
    }
    // insert the new key and value
    const newObj = new LRUValue(key, value);

    let result = "";
    if (this.mapValues.length + 1 > this.capacity) {
      //print
      result = `evicts key ${this.mapValues.reverse()[0].key}`;
      //remove the last element
      this.mapValues.pop();
    }
    this.mapValues.unshift(newObj);
    return result;
  }

  get(key: number): string | number {
    const index = this.getAllKeys().indexOf(key);
    if (index == -1) {
      //print
      return "-1 (not found)";
    } else {
      const resultObj = new LRUValue(
        this.mapValues[index].key,
        this.mapValues[index].value
      );
      //move the element to the first position in the array
      this.mapValues.splice(index, 1);
      this.mapValues.push(resultObj);
      return resultObj.value;
    }
  }

  delete(key: number): number | string {
    const index = this.getAllKeys().indexOf(key);
    if (index !== -1) {
      const removeObj = this.mapValues.splice(index, 1);
      return removeObj[0].value;
    } else {
      return "-1 (not found)";
    }
  }
}
