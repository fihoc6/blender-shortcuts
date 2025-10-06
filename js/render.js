import { groupByCategory, el } from "./utils.js";

// === Renderer ===
export function renderShortcuts(list) {
  const container = document.getElementById("list");
  container.innerHTML = "";

  const grouped = groupByCategory(list);
  const symbols = ["OR", "|", "->"];

  for (const [category, items] of Object.entries(grouped)) {
    const catDiv = el("div", "category");
    const title = el("h2", null, category);
    catDiv.appendChild(title);

    items.forEach(item => {
      const div = el("div", "shortcut");
      const action = el("div", "action", item.action);
      const keys = el("div", "keys");

      item.keys.forEach((k, i) => {
        const isSymbol = symbols.includes(k);
        const mouseInput = k.includes("Mouse") ? k : null;
        if (isSymbol) return;

        // ICON
        if (item.icon && k === "ICON") {
          const icon = el("div", "icon");
          const img = el("img");
          img.src = item.icon;
          img.alt = "icon";
          icon.appendChild(img);
          keys.appendChild(icon);
        }

        // ICON GROUP
        else if (k === "ICON_GROUP") {
          const iconGroup = el("div", "icon-group");
          item.icons.forEach((src, idx) => {
            const icon = el("div", "icon");
            const img = el("img");
            img.src = src;
            img.alt = "icon";
            if (idx === item.selected) icon.style.backgroundColor = "#4772B3";
            icon.appendChild(img);
            iconGroup.appendChild(icon);
          });
          keys.appendChild(iconGroup);
        }

        // MOUSE
        else if (mouseInput) {
          const mouse = el("div", "mouse");

          if (mouseInput === "Left Mouse") {
            mouse.appendChild(el("div", "mouse-left active"));
            mouse.appendChild(el("div", "vertical-line"));
          } else if (mouseInput === "Right Mouse") {
            mouse.appendChild(el("div", "mouse-right active"));
            mouse.appendChild(el("div", "vertical-line"));
          } else if (mouseInput === "Middle Mouse") {
            mouse.appendChild(el("div", "mouse-middle active"));
          }

          keys.appendChild(mouse);
          const label = el("span", "mouse-text", item.mouseAction || "CLICK");
          keys.appendChild(label);
        }

        // NORMAL KEY
        else {
          keys.appendChild(el("div", "key", k));
        }

        // SYMBOLS (+, →, /)
        if (i < item.keys.length - 1) {
          const next = item.keys[i + 1];
          const isNextSymbol = symbols.includes(next);
          const symbol = el("div", "plus");

          if (isNextSymbol) {
            symbol.textContent = next === "->" ? "→" : next === "OR" ? "/" : next;
          } else {
            symbol.textContent = "+";
          }
          keys.appendChild(symbol);
        }
      });

      div.appendChild(action);
      div.appendChild(keys);
      catDiv.appendChild(div);
    });

    container.appendChild(catDiv);
  }
}
