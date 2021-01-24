import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as registerServiceWorker from "./serviceWorkerRegistration.js";

import "./index.css";
import App from "./App";

import { store, persistor } from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker.register();
