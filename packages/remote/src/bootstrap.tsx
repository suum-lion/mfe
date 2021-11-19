import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

// @ts-ignore
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
