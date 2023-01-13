import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { HubProvider } from "./context/HubContext.js";
import { UsrProvider } from "./context/UsrContext.js";
import { VpnUsrProvider } from "./context/VpnUsrContext.js";
import { AlertProvider } from "./context/AlertContext.js";
import { CookiesProvider } from 'react-cookie';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <CookiesProvider>
  <AlertProvider>
  <UsrProvider>
  <HubProvider>
    <VpnUsrProvider>
      
        <Router>
          <App />
        </Router>
      
    </VpnUsrProvider>
    </HubProvider>
  </UsrProvider>
  </AlertProvider>
  </CookiesProvider>

  // </React.StrictMode>
);
