import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import DataContextProvider from "./context/DataContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </StrictMode>
);
