import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StreamTheme } from "@stream-io/video-react-sdk";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StreamTheme>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StreamTheme>
);
