import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ClearHistoryModal({ isOpen, onClose, onConfirm, count = 0 }) {
  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-history-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm animate-fade-in"
    >
      <div 
        className="w-full max-w-md bg-velvet rounded-3xl border border-cloud-subtle shadow-nocturne-lg p-6 sm:p-8 editorial-texture relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-editorial-subtle hover:text-editorial-light hover:bg-velvet-hover transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="w-12 h-12 rounded-2xl bg-ember-subtle border border-ember/30 flex items-center justify-center text-ember mb-5">
          <AlertTriangle className="w-6 h-6" />
        </div>

        {/* Title & Description */}
        <h3 id="clear-history-title" className="font-serif text-2xl font-bold text-editorial-light mb-2">
          Clear Reading History?
        </h3>

        <p className="font-sans text-sm text-editorial-muted leading-relaxed mb-4">
          This will permanently delete all <strong className="text-editorial-light">{count}</strong> previously discovered quotes from your browser's local archive.
        </p>

        {/* Favourites safety reminder */}
        <div className="p-3 rounded-xl bg-velvet-surface border border-cloud-subtle mb-6 text-xs text-lavender flex items-center gap-2 font-sans">
          <span className="w-1.5 h-1.5 rounded-full bg-mint shrink-0" />
          <span>Your saved <strong>Favourites</strong> will remain completely safe and untouched.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-cloud-subtle font-sans text-sm font-medium text-editorial-muted hover:text-editorial-light hover:bg-velvet-hover transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-ember hover:bg-ember-hover text-white font-sans text-sm font-semibold transition-all shadow-glow-ember active:scale-95"
          >
            Clear Archive
          </button>
        </div>

      </div>
    </div>
  );
}

