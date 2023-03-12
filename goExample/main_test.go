package main

import (
	"testing"
)

func TestInitialLRUObj(t *testing.T) {

	if newLRUObj := initialLRUObj(2); newLRUObj.obj.category != 2 {
		t.Errorf("initial obj wrong: %v", newLRUObj.obj.category)
	}

	if newLRUObj := initialLRUObj(-9); newLRUObj.result != "the category out of the range(1-1000)" {
		t.Errorf("initial obj wrong: %v", newLRUObj.obj.category)
	}
}

func TestPutLRUObj(t *testing.T) {

	newLRUObj := initialLRUObj(2)

	newLRUResult := putLRUObj(1, 1, newLRUObj.obj)

	if len(newLRUResult.obj.lruArray) != 1 {
		t.Errorf("initial obj wrong %v", newLRUObj.obj)
	}

	newLRUResult = putLRUObj(2, 2, newLRUResult.obj)

	if len(newLRUResult.obj.lruArray) != 2 {
		t.Errorf("initial obj wrong %v", newLRUObj)
	}

	newLRUResult = putLRUObj(3, 3, newLRUResult.obj)

	if len(newLRUResult.obj.lruArray) != 2 {
		t.Errorf("initial obj wrong %v", newLRUObj)
	}
}

func TestGetLRUObj(t *testing.T) {

	newLRUObj := initialLRUObj(2)

	newLRUResult := putLRUObj(1, 1, newLRUObj.obj)

	newLRUResult = putLRUObj(2, 2, newLRUResult.obj)

	if getValue := getLRUObj(2, newLRUResult.obj); getValue.result != "2" {
		t.Errorf("initial obj wrong %v", newLRUObj)
	}

	newLRUResult = putLRUObj(3, 3, newLRUResult.obj)

	if getValue := getLRUObj(1, newLRUResult.obj); getValue.result != "-1 (not found)" {
		t.Errorf("initial obj wrong %v", newLRUObj)
	}
}

func TestDeleteLRUObj(t *testing.T) {

	newLRUObj := initialLRUObj(2)

	newLRUResult := putLRUObj(1, 1, newLRUObj.obj)

	newLRUResult = putLRUObj(2, 2, newLRUResult.obj)

	if getValue := getLRUObj(2, newLRUResult.obj); getValue.result != "2" {
		t.Errorf("initial obj wrong %v", newLRUObj)
	}

	newLRUResult = deleteLRUObj(2, newLRUResult.obj)

	if getValue := getLRUObj(2, newLRUResult.obj); getValue.result != "-1 (not found)" {
		t.Errorf("initial obj wrong %v", newLRUObj)
	}
}
