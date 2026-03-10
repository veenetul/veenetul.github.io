// Static HTML pages load CSS via <link>. Keep JS-only imports here.
import { initOverlay } from './src/js/ui/overlay.js';
import { initFab } from './src/js/ui/fab.js';
import { loadSidePref, applySide } from './src/js/ui/sidePreference.js';

// 3. INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
  
  // A. Handle User Side Preference (Left/Right)
  const savedSide = loadSidePref();
  // Default to 'right' if nothing is saved in localStorage
  applySide(savedSide || 'right');

  // B. Initialize Overlay API
  const overlayApi = initOverlay({
    onOpen: () => {
      document.body.classList.add('overlay-open');
    },
    onClose: () => {
      document.body.classList.remove('overlay-open');
    },
    onSideSwitch: () => {},
  });

  // C. Connect the Floating Action Button to the Overlay
  if (typeof initFab === 'function') {
    initFab(overlayApi);
  } else {
    console.error("initFab is not a function. Check your export in fab.js");
  }
});
