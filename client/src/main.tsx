import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

function loadDeferredFonts() {
  const fontStylesheet = document.getElementById("font-stylesheet") as HTMLLinkElement | null;
  if (fontStylesheet) fontStylesheet.rel = "stylesheet";
}

const scheduleFontLoad = window.requestIdleCallback
  ? () => window.requestIdleCallback(loadDeferredFonts, { timeout: 1800 })
  : () => window.setTimeout(loadDeferredFonts, 900);

const root = document.getElementById("root")!;
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

scheduleFontLoad();
