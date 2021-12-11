import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppContext from "./hooks/AppContext";

//Style
import "./index.css";

//Components
import App from "./components/App.js";

render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContext>
        <App />
      </AppContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
