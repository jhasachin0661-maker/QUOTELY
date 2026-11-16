import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, Bookmark, Copy, Share2, Trash2, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Render Container */}
      <div 
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl bg-velvet-card border border-cloud-subtle shadow-nocturne-lg text-sm text-editorial-light transition-all duration-300 animate-fade-in"
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'favourite' && <Bookmark className="w-4 h-4 text-mint fill-mint shrink-0" />}
              {toast.type === 'unfavourite' && <Bookmark className="w-4 h-4 text-editorial-muted shrink-0" />}
              {toast.type === 'copy' && <Copy className="w-4 h-4 text-electric shrink-0" />}
              {toast.type === 'share' && <Share2 className="w-4 h-4 text-lavender shrink-0" />}
              {toast.type === 'delete' && <Trash2 className="w-4 h-4 text-ember shrink-0" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-ember shrink-0" />}
              {toast.type === 'info' && <CheckCircle2 className="w-4 h-4 text-marigold shrink-0" />}

              <span className="font-sans font-medium">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md text-editorial-subtle hover:text-editorial-light hover:bg-velvet-hover transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

