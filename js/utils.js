// === Utility functions ===

// Group by category
export function groupByCategory(list) {
  return list.reduce((acc, cur) => {
    if (!acc[cur.category]) acc[cur.category] = [];
    acc[cur.category].push(cur);
    return acc;
  }, {});
}

// Create DOM element helper
export function el(tag, className, text = "") {
  const elem = document.createElement(tag);
  if (className) elem.className = className;
  if (text) elem.textContent = text;
  return elem;
}
