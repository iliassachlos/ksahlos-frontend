import { RouterProvider } from "react-router-dom";
import type { FC } from "react";
import { setupStore } from "./store/store";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { AppThemeProvider } from "./theme/theme-provider";
import router from "./routes";

export const App: FC = () => {
  const store = setupStore();

  return (
    <HelmetProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <RouterProvider router={router}/>
        </AppThemeProvider>
      </Provider>
    </HelmetProvider>
  );
};
