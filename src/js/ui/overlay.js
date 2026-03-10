// src/js/ui/overlay.js
import { qs, qsa } from '../utils/dom.js';
import { trapFocus, releaseFocus } from '../utils/focusTrap.js';
import { applySide, getCurrentSide, saveSidePref } from './sidePreference.js';

export function initOverlay({ onOpen, onClose, onSideSwitch } = {}) {
  const overlay = qs('#overlay');
  const overlayDead = qs('#overlayDead');
  const overlaySurface = qs('.overlay-surface');
  const fab = qs('#fab');
  const switchSideBtn = qs('#switchSideBtn');

  if (!overlay || !overlayDead || !overlaySurface || !fab) {
    console.warn('[overlay] Required elements not found.');
    return {
      open: () => {},
      close: () => {},
      toggle: () => {},
    };
  }

  function isOpen() {
    return overlay.classList.contains('open');
  }

  function open() {
    if (isOpen()) return;
    overlay.classList.add('open');
    fab.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overlay-open');
    onOpen && onOpen();

    // Focus the first focusable inside the panel
    const focusables = getFocusable(overlaySurface);
    (focusables[0] || switchSideBtn || overlaySurface).focus({ preventScroll: true });

    // Start focus trap
    trapFocus(overlaySurface);
  }

  function close() {
    if (!isOpen()) return;
    overlay.classList.remove('open');
    fab.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overlay-open');
    onClose && onClose();

    // Release focus and return to FAB
    releaseFocus();
    fab.focus({ preventScroll: true });
  }

  function toggle() {
    isOpen() ? close() : open();
  }

  // Clicking the 10% dead-space closes
  overlayDead.addEventListener('click', close);

  // ESC to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });

  // Inside-overlay: switch side (left/right)
  if (switchSideBtn) {
    switchSideBtn.addEventListener('click', () => {
      const current = getCurrentSide();
      const next = current === 'right' ? 'left' : 'right';
      applySide(next);
      saveSidePref(next);
      onSideSwitch && onSideSwitch(next);
      // Keep focus on the button after reflow
      switchSideBtn.focus({ preventScroll: true });
    });
  }

  return { open, close, toggle };
}

/** Return focusable elements within a container */
function getFocusable(root) {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  return qsa(selectors, root).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}