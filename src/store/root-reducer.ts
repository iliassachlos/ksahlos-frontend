import { combineReducers } from "@reduxjs/toolkit";

import { awardsApi } from "./apis/awards-api";
import uiReducer from "./slices/ui-slice";
import { photosApi } from "./apis/photos-api";

export const apiReducers = {
  [awardsApi.reducerPath]: awardsApi.reducer,
  [photosApi.reducerPath]: photosApi.reducer,
};

export const sliceReducers = {
  ui: uiReducer,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...sliceReducers,
});
