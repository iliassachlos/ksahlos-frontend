import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authApi } from "./apis/auth-api";
import { awardsApi } from "./apis/awards-api";
import { photosApi } from "./apis/photos-api";
import { rootReducer } from "./root-reducer";

export const setupStore = (preloadedState?: Partial<RootState>) => {
  const str = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(awardsApi.middleware, authApi.middleware, photosApi.middleware),
    preloadedState,
  });

  setupListeners(str.dispatch);

  return str;
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
