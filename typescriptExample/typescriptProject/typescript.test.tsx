import { LRUCache } from "./typescriptTest";

describe("test LRU functions ", () => {
  const testLRUCacheWithTwo = new LRUCache(2);

  test("1 test get function", () => {
    //test put
    testLRUCacheWithTwo.put(1, 1);
    testLRUCacheWithTwo.put(2, 2);
    const getResultOne = testLRUCacheWithTwo.get(1); // should be 1
    const getResultTwo = testLRUCacheWithTwo.get(2); // should be 2

    expect(getResultOne).toEqual(1);
    expect(getResultTwo).toEqual(2);
  });

  test("2 test get function after put ", () => {
    //test put
    const putResult = testLRUCacheWithTwo.put(3, 3);

    expect(putResult).toEqual("evicts key 2");

    const getResult = testLRUCacheWithTwo.get(1);

    expect(getResult).toEqual("-1 (not found)");
  });

  test("3 test exist key function ", () => {
    //test put
    const result = testLRUCacheWithTwo.put(3, 5);

    expect(result).toEqual("this key already exist");
  });

  test("4 test delete function ", () => {
    //test put
    const deleteResult = testLRUCacheWithTwo.delete(3);
    expect(deleteResult).toEqual(3);

    const getResult = testLRUCacheWithTwo.get(3);

    expect(getResult).toEqual("-1 (not found)");
  });

  test("5 test key and value range ", () => {
    const resultOne = testLRUCacheWithTwo.put(Math.pow(10, 4), 1);

    expect(resultOne).toEqual("this key or value out of the range");

    const resultTwo = testLRUCacheWithTwo.put(Math.pow(10, 4), 1);

    expect(resultTwo).toEqual("this key or value out of the range");
  });
});
