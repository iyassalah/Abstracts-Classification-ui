import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { settings } from "./config/settings";
import AuthProvider from "./state/auth/provider";
import { ResultsProvider } from "./state/results";

axios.defaults.baseURL = settings.API_ENDPOINT;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ResultsProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ResultsProvider>
  </BrowserRouter >
);
