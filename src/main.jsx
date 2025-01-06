import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LocationContextProvider } from "./context/StatesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocationContextProvider>
      <App />
    </LocationContextProvider>
  </StrictMode>
);
