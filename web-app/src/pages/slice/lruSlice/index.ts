import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer } from "redux-injectors";
import { cloneDeep } from "lodash";
import { LRUValue, RootState } from "types/RootState";
import { checkKeyAndValue, getAllKeys } from "pages/utils";

export const initialState: RootState = {
  category: 0,
  LRUCache: [],
  result: "",
};

const slice = createSlice({
  name: "lruCache",
  initialState,
  reducers: {
    /*
    channel method
    */
    updateCategory(state, action: PayloadAction<number>) {
      const newState: RootState = cloneDeep(state);
      if (action.payload < -1 || action.payload > 1000) {
        newState.result = "the category should between 1 and 1000";
      } else {
        newState.category = action.payload;
        newState.LRUCache = [];
        newState.result = "";
      }
      return newState;
    },
    putCache(state, action: PayloadAction<LRUValue>) {
      const newState: RootState = cloneDeep(state);

      // check if this key exist
      if (getAllKeys(state.LRUCache).indexOf(action.payload.key) !== -1) {
        newState.result = "this key already exist";
        return newState;
      }
      // check key and value range
      if (!checkKeyAndValue(action.payload.key, action.payload.value)) {
        newState.result = "this key or value out of the range";
        return newState;
      }

      // insert the new key
      if (state.LRUCache.length >= state.category) {
        const obj = newState.LRUCache.pop();
        newState.result = `evicts key ${obj?.key}`;
      }
      newState.LRUCache.unshift(action.payload);
      return newState;
    },
    getCatch(state, action: PayloadAction<number>) {
      const newState: RootState = cloneDeep(state);
      const index = getAllKeys(state.LRUCache).indexOf(action.payload);
      if (index === -1) {
        newState.result = "-1 (not found)";
      } else {
        //move the element to the first position in the array
        newState.LRUCache.splice(index, 1);
        newState.LRUCache.push({
          key: state.LRUCache[index].key,
          value: state.LRUCache[index].value,
        });
        newState.result = state.LRUCache[index].value;
      }
      return newState;
    },
    deleteCatch(state, action: PayloadAction<number>) {
      const newState: RootState = cloneDeep(state);
      const index = getAllKeys(state.LRUCache).indexOf(action.payload);
      if (index !== -1) {
        const removeObj = newState.LRUCache.splice(index, 1);
        newState.result = removeObj[0].value;
      } else {
        newState.result = "-1 (not found)";
      }
      return newState;
    },
  },
});
export const { actions, reducer, name: channelsSlice } = slice;

export const useStateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
