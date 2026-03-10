// src/js/ui/fab.js
import { qs } from '../utils/dom.js';

export function initFab(overlayApi) {
  const fab = qs('#fab');
  if (!fab) {
    console.error('fab not found');
    return;
  }

  fab.addEventListener('click', () => {
    console.log('fab clicked');
    overlayApi.toggle();
  });
}