import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/app.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { AnimatedRoutes } from "./routes/AnimatedRoutes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </App>
  </Provider>
);
