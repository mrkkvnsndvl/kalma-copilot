import "@/styles/globals.css";

import { ThemeProvider } from "@/components/shared/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";

import Popup from "@/entrypoints/popup/popup";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Popup />
    </ThemeProvider>
  </React.StrictMode>
);
