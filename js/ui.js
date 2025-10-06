import { renderShortcuts } from "./render.js";
import { shortcuts } from "./data.js";

// === UI interactions ===
export function initUI() {
  const search = document.getElementById("search");
  const printBtn = document.getElementById("printBtn");

  search.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = shortcuts.filter(s =>
      s.action.toLowerCase().includes(term) ||
      s.keys.join(" ").toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term)
    );
    renderShortcuts(filtered);
  });

  printBtn.addEventListener("click", () => window.print());
}
