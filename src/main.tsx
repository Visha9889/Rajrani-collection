// Global window.fetch patch for browser iframe compatibility
(function() {
  try {
    var nativeFetch = window.fetch;
    if (typeof nativeFetch === 'function') {
      var currentFetch = nativeFetch;
      Object.defineProperty(window, 'fetch', {
        get: function() { return currentFetch; },
        set: function(val) { currentFetch = val; },
        configurable: true,
        enumerable: true
      });
    }
  } catch (e) {
    // ignore
  }
})();

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
