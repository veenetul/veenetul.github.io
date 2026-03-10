// src/js/utils/focusTrap.js

let lastFocusedBeforeTrap = null;
let currentRoot = null;
let keydownHandler = null;

export function trapFocus(root) {
  releaseFocus(); // clear any previous trap

  currentRoot = root;
  lastFocusedBeforeTrap = document.activeElement;

  keydownHandler = (e) => {
    if (e.key !== 'Tab') return;

    const focusables = getFocusable(root);
    if (focusables.length === 0) {
      e.preventDefault();
      root.focus();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (e.shiftKey) {
      // Shift+Tab: cycle backwards
      if (active === first || !root.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab: cycle forwards
      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  document.addEventListener('keydown', keydownHandler, true);
}

export function releaseFocus() {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler, true);
  }
  keydownHandler = null;

  // restore focus back to the element focused before trap
  if (lastFocusedBeforeTrap && typeof lastFocusedBeforeTrap.focus === 'function') {
    try { lastFocusedBeforeTrap.focus({ preventScroll: true }); } catch {}
  }

  lastFocusedBeforeTrap = null;
  currentRoot = null;
}

function getFocusable(root) {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  return Array.from(root.querySelectorAll(selectors)).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' &&
           style.visibility !== 'hidden' &&
           el.offsetParent !== null;
  });
}