import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./slices/ui-slice";

export const apiReducers = {
  // [photosApi.reducerPath]: photosApi.reducer,
};

export const sliceReducers = {
  ui: uiReducer,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...sliceReducers,
});
