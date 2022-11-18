import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatedRoutes } from "./routes/AnimatedRoutes";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";

const App: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="App">{children}</div>;
};

export default App;
