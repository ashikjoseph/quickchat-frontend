import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContext from "./components/context/AuthContext";
import { SocketContextProvider } from "./components/context/Socket";
import { ConversationProvider } from "./components/context/ConversationContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <BrowserRouter>
        <ConversationProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ConversationProvider>
      </BrowserRouter>
    </AuthContext>
  </React.StrictMode>
);
