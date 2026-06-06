import { combineReducers } from "@reduxjs/toolkit";

import { awardsApi } from "./apis/awards-api";
import uiReducer from "./slices/ui-slice";

export const apiReducers = {
  [awardsApi.reducerPath]: awardsApi.reducer,
};

export const sliceReducers = {
  ui: uiReducer,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...sliceReducers,
});
