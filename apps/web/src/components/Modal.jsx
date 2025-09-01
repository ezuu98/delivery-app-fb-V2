import React, { useEffect } from 'react';
import '../styles/modal.css';

export default function Modal({ open, title, onClose, children, footer }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal-sheet" onClick={(e)=>e.stopPropagation()}>
        <header className="modal-header"><h3 className="modal-title">{title}</h3><button className="modal-close" onClick={onClose} aria-label="Close">✕</button></header>
        <div className="modal-body">{children}</div>
        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>
  );
}
