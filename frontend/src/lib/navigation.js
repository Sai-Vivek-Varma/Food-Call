// src/lib/navigation.js
// Helper to allow navigation outside React components (for use in apiClient, etc.)

let navigateFunction = null;

export function setNavigate(fn) {
  navigateFunction = fn;
}

export function navigateTo(path, options) {
  if (navigateFunction) {
    navigateFunction(path, options);
  } else {
    // fallback: full reload if navigate not set
    window.location.href = path;
  }
}
