import { combineReducers } from "@reduxjs/toolkit";

import { authApi } from "./apis/auth-api";
import { awardsApi } from "./apis/awards-api";
import { collectionsApi } from "./apis/collections-api";
import { photosApi } from "./apis/photos-api";
import uiReducer from "./slices/ui-slice";

export const apiReducers = {
  [awardsApi.reducerPath]: awardsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [photosApi.reducerPath]: photosApi.reducer,
  [collectionsApi.reducerPath]: collectionsApi.reducer,
};

export const sliceReducers = {
  ui: uiReducer,
};

export const rootReducer = combineReducers({
  ...apiReducers,
  ...sliceReducers,
});
