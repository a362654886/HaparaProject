class LRUValue {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  update(value) {
    this.value = value;
  }
}

class LRUCache {
  constructor(capacity) {
    // the capacity should less than 1000 and bigger than 1
    this.capacity = capacity > 1000 ? 1000 : capacity < 1 ? 1 : capacity;
    this.mapValues = [];
  }

  checkKeyAndValue(key, value) {
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

  getAllKeys() {
    return this.mapValues.map((LRUcache) => LRUcache.key);
  }

  put(key, value) {
    // check if this key exist
    if (this.getAllKeys().indexOf(key) !== -1) {
      throw new Error("this key already exist");
    }
    // check key and value range
    if (!this.checkKeyAndValue(key, value)) {
      throw new Error("this key or value out of the range");
    }
    // insert the new key and value
    const newObj = new LRUValue(key, value);

    if (this.mapValues.length + 1 > this.capacity) {
      //print
      console.log(`evicts key ${this.mapValues.reverse()[0].key}`);
      //remove the last element
      this.mapValues.pop();
    }
    this.mapValues.push(newObj);
  }

  get(key) {
    const index = this.getAllKeys().indexOf(key);
    if (index == -1) {
      //print
      console.log("-1 (not found)");
    } else {
      const resultObj = new LRUValue(
        this.mapValues[index].key,
        this.mapValues[index].value
      );
      //move the element to the first position in the array
      this.mapValues.splice(index, 1);
      this.mapValues.push(resultObj);
      //print
      console.log(resultObj.value);
    }
  }

  delete(key) {
    const index = this.getAllKeys().indexOf(key);
    if (index !== -1) {
      const removeObj = this.mapValues.splice(index, 1);
      return removeObj[0].value;
    } else {
      return "-1 (not found)";
    }
  }
}

const testLRUCache = new LRUCache(2);

//test put
testLRUCache.put(1, 1);
testLRUCache.put(2, 2);
testLRUCache.get(1); // should be 1
testLRUCache.get(2); // should be 2

// test if the last one will be removed when the capacity is full
testLRUCache.put(3, 3); // should print evicts key 2
testLRUCache.get(1); // should be -1 (not found)

const r = testLRUCache.delete(3);
console.log(r);
testLRUCache.get(3); // should be -1 (not found)

//test check value

testLRUCache.put(Math.pow(10, 4), 1);

testLRUCache.put(10, Math.pow(10, 6));
