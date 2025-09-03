import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

function mount() {
  const el = document.getElementById('react-root');
  if (!el) return;
  const root = createRoot(el);
  root.render(<App />);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
