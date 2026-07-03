import { RouterProvider } from "react-router-dom";
import type { FC } from "react";
import { setupStore } from "./store/store";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { AppThemeProvider } from "./theme/theme-provider";
import router from "./routes";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App: FC = () => {
  const store = setupStore();

  return (
    <HelmetProvider>
      <Provider store={store}>
        <AppThemeProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            theme="light"
            transition={Slide}
          />
          <RouterProvider router={router}/>
        </AppThemeProvider>
      </Provider>
    </HelmetProvider>
  );
};
