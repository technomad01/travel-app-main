import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import CurrentUserProvider from "./context/CurrentUser";
import PlannerIDsContextProvider from "./context/plannerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <CurrentUserProvider>
      <PlannerIDsContextProvider>
        <App />
      </PlannerIDsContextProvider>
    </CurrentUserProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
