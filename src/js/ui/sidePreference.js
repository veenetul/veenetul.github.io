// src/js/ui/sidePreference.js

const KEY = 'overlaySide';

export function loadSidePref() {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function saveSidePref(side) {
  try {
    localStorage.setItem(KEY, side);
  } catch {}
}

export function applySide(side) {
  const isLeft = side === 'left';
  document.body.classList.toggle('overlay-left', isLeft);
  document.body.classList.toggle('overlay-right', !isLeft);
}

export function getCurrentSide() {
  return document.body.classList.contains('overlay-left') ? 'left' : 'right';
}
``