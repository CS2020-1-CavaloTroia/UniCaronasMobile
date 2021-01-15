import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./App";
import "./config/ReactotronConfig";
import { store, persistor } from "~/store";

export default function Index() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
