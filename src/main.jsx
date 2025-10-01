import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/all.scss";
import "bootstrap/dist/js/bootstrap.js";
import router from "./router/index";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </StrictMode>
);
