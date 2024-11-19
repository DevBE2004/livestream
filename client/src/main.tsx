import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StreamTheme } from "@stream-io/video-react-sdk";
import "./index.css";
import App from "./App.tsx";
import { store, persistor } from "./redux/redux.tsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StreamTheme style={{ fontFamily: "sans-serif" }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StreamTheme>
);
