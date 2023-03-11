import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "types/RootState";
import { initialState } from ".";

// First select the relevant part from the state
const selectDomain = (state: { lruCache: RootState }) => state || initialState;

export const selectState = createSelector([selectDomain], (state) => state);
