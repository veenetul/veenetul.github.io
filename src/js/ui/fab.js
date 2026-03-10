// src/js/ui/fab.js
import { qs } from '../utils/dom.js';

export function initFab(overlayApi) {
  const fab = qs('#fab');
  if (!fab) return;

  fab.addEventListener('click', () => {
    overlayApi.toggle();
  });
}