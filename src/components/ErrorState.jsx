import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorState({ error, onRetry, isLoading }) {
  if (!error) return null;

  return (
    <div
      role="alert"
      className="p-5 sm:p-6 rounded-2xl bg-ember-subtle border border-ember/30 text-editorial-light mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in shadow-nocturne"
    >
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="p-2 rounded-xl bg-ember/20 text-ember shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-sans font-semibold text-sm text-editorial-light">
            Quote Discovery Interrupted
          </h4>
          <p className="font-sans text-xs text-editorial-muted mt-0.5">
            {error || 'Unable to reach the external quote archive. Please try again.'}
          </p>
        </div>
      </div>

      <button
        onClick={onRetry}
        disabled={isLoading}
        className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-ember text-white text-xs font-sans font-semibold hover:bg-ember-hover active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        aria-label="Retry fetching quote"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        <span>{isLoading ? 'Retrying...' : 'Try Again'}</span>
      </button>
    </div>
  );
}

