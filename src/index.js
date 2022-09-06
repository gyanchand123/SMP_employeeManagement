import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./Services/Authentication/AuthContext";
import store from "./store/Store";
import { Provider } from "react-redux";
import PopUpContextProvider from "./Services/PopUpContext/PopUpContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <PopUpContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PopUpContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
