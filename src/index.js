import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Commented are the code using Redux
import { Provider } from "react-redux";
import store from "./context/store";

// Here would have been a store.dispatch(fetchData())

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
