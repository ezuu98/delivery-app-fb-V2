import React from 'react';

export default function ImageModal({ order, onClose }){
  const imageSrc = order?.image || null;
  
  return (
    <div className="image-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="image-modal" onClick={(e) => e.stopPropagation()}>
        <header className="image-modal-header">
          <h3 className="image-modal-title">Order Image</h3>
          <button className="image-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="image-modal-body">
          {imageSrc ? (
            <img src={imageSrc} alt="Order delivery proof" className="image-modal-img" />
          ) : (
            <div className="section-note">No image available</div>
          )}
        </div>
      </div>
    </div>
  );
}
