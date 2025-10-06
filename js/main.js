import { shortcuts } from "./data.js";
import { renderShortcuts } from "./render.js";
import { initUI } from "./ui.js";

// === App Entry Point ===
document.addEventListener("DOMContentLoaded", () => {
  renderShortcuts(shortcuts);
  initUI();
});
