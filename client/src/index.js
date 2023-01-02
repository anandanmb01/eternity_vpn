import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { HubProvider } from "./context/HubContext.js";
import { UsrProvider } from "./context/UsrContext.js";
import { VpnUsrProvider } from "./db/VpnUsrContext.js";
import { AlertProvider } from "./context/AlertContext.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <UsrProvider>
    <VpnUsrProvider>
      <HubProvider>
        <AlertProvider>
        <Router>
          <App />
        </Router>
        </AlertProvider>
      </HubProvider>
    </VpnUsrProvider>
  </UsrProvider>
  // </React.StrictMode>
);
