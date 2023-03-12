package main

import (
	"strconv"
)

type LRUValue struct {
	key   int
	value int
}

type LRUType struct {
	category int
	lruArray []LRUValue
}

type LRUTypeResult struct {
	obj    LRUType
	result string
}

func main() {
}

func initialLRUObj(category int) LRUTypeResult {

	LRUResult := LRUTypeResult{}

	if category > 1000 || category < 1 {
		LRUResult.result = "the category out of the range(1-1000)"
	} else {
		LRUObj := LRUType{}
		LRUObj.category = category
		LRUObj.lruArray = []LRUValue{}
		LRUResult.obj = LRUObj
	}

	return LRUResult
}

func putLRUObj(key int, value int, LRUObj LRUType) LRUTypeResult {

	index := getKeyFromArr(key, LRUObj.lruArray)

	LRUResult := LRUTypeResult{}

	if index != -1 {
		LRUResult.obj = LRUObj
		LRUResult.result = "this key already exist"
		return LRUResult
	}

	if checkKeyAndValue(key, value) == false {
		LRUResult.obj = LRUObj
		LRUResult.result = "this key or value out of the range"
		return LRUResult
	}

	LRUItem := LRUValue{}
	LRUItem.key = key
	LRUItem.value = value
	if len(LRUObj.lruArray) >= int(LRUObj.category) {
		LRUObj.lruArray = append(LRUObj.lruArray[:len(LRUObj.lruArray)-1])
	}

	LRUObj.lruArray = insertValueToLRUarray(0, LRUObj.lruArray, LRUItem)

	LRUResult.obj = LRUObj

	return LRUResult
}

func getLRUObj(key int, LRUObj LRUType) LRUTypeResult {

	index := getKeyFromArr(key, LRUObj.lruArray)

	LRUResult := LRUTypeResult{}

	if index == -1 {
		LRUResult.obj = LRUObj
		LRUResult.result = "-1 (not found)"
	} else {
		LRUItem := LRUValue{}
		LRUItem.key = LRUObj.lruArray[index].key
		LRUItem.value = LRUObj.lruArray[index].value

		LRUObj.lruArray = removeValueFromLRUarray(index, LRUObj.lruArray)

		LRUObj.lruArray = insertValueToLRUarray(0, LRUObj.lruArray, LRUItem)

		LRUResult.obj = LRUObj
		LRUResult.result = strconv.Itoa(LRUItem.value)
	}

	return LRUResult
}

func deleteLRUObj(key int, LRUObj LRUType) LRUTypeResult {

	index := getKeyFromArr(key, LRUObj.lruArray)

	LRUResult := LRUTypeResult{}

	if index == -1 {
		LRUResult.obj = LRUObj
		LRUResult.result = "-1 (not found)"
	} else {

		LRUObj.lruArray = removeValueFromLRUarray(index, LRUObj.lruArray)

		LRUResult.obj = LRUObj
	}

	return LRUResult
}

func insertValueToLRUarray(key int, LRUArray []LRUValue, LRUItem LRUValue) []LRUValue {
	newArray := append(LRUArray, LRUValue{})
	index := key
	copy(newArray[index+1:], newArray[index:])
	newArray[index] = LRUItem
	return newArray
}

func removeValueFromLRUarray(key int, LRUArray []LRUValue) []LRUValue {
	newArray := append(LRUArray[:key], LRUArray[key+1:]...)
	return newArray
}

func getKeyFromArr(key int, LRUArray []LRUValue) int {
	index := -1
	for i := 0; i < len(LRUArray); i++ {
		if LRUArray[i].key == key {
			index = i
		}
	}
	return index
}

func checkKeyAndValue(key int, value int) bool {
	if key < 0 || key > 10*10 || value < 0 || value > 10*10*10*10*10 {
		return false
	} else {
		return true
	}
}
