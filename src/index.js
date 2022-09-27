import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/configStore";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import ReactPWAInstallProvider from "react-pwa-install";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactPWAInstallProvider enableLogging>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ReactPWAInstallProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceworker.js");
  });
}
