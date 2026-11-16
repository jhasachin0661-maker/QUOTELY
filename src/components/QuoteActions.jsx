import React, { useState } from 'react';
import { Sparkles, Bookmark, Copy, Share2, Loader2, Check } from 'lucide-react';
import { copyQuoteToClipboard } from '../utils/clipboard';
import { shareQuote } from '../utils/share';
import { useToast } from './Toast';

export default function QuoteActions({
  quote,
  onNewQuote,
  isLoading,
  isFavourite,
  onToggleFavourite,
}) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  // Handle Copy Quote
  const handleCopy = async () => {
    if (!quote) return;
    const result = await copyQuoteToClipboard(quote.quote, quote.author);
    if (result.success) {
      setCopied(true);
      addToast('Quote copied to clipboard', 'copy');
      setTimeout(() => setCopied(false), 2000);
    } else {
      addToast(result.message, 'error');
    }
  };

  // Handle Bookmark / Favourite
  const handleFavourite = () => {
    if (!quote) return;
    const { isFavourite: updatedState } = onToggleFavourite(quote);
    if (updatedState) {
      addToast('Saved to personal collection', 'favourite');
    } else {
      addToast('Removed from favourites', 'unfavourite');
    }
  };

  // Handle Share Quote
  const handleShare = async () => {
    if (!quote || sharing) return;
    setSharing(true);
    try {
      const result = await shareQuote(quote.quote, quote.author);
      if (result.success) {
        addToast(result.message, 'share');
      } else if (result.method !== 'cancelled') {
        addToast(result.message, 'error');
      }
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="pt-5 sm:pt-6 border-t border-cloud-subtle space-y-4">

      {/* Mobile: big full-width CTA first (thumb-friendly) */}
      <button
        onClick={onNewQuote}
        disabled={isLoading}
        className={`w-full sm:hidden flex items-center justify-center gap-2.5 py-4 rounded-2xl font-sans text-sm font-semibold text-white shadow-glow-ember transition-all duration-200 focus:outline-none active:scale-95 ${
          isLoading ? 'bg-ember/70 cursor-not-allowed opacity-80' : 'bg-ember hover:bg-ember-hover'
        }`}
        aria-label="Discover another random quote"
      >
        {isLoading ? (
          <><Loader2 className="w-4 h-4 animate-spin text-white" /><span>Discovering...</span></>
        ) : (
          <><Sparkles className="w-4 h-4 text-white" /><span>Discover another</span></>
        )}
      </button>

      {/* Secondary actions row — full width on mobile, inline on desktop */}
      <div className="flex items-center justify-between gap-3">

        {/* Copy, Favourite, Share */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1">

          {/* Copy */}
          <button
            onClick={handleCopy}
            disabled={!quote}
            className={`group flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-sans font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric ${
              copied
                ? 'bg-electric/20 text-electric border-electric/40'
                : 'bg-velvet border-cloud-subtle text-editorial-muted hover:text-editorial-light hover:bg-velvet-hover hover:border-cloud-border'
            }`}
            title="Copy quote with author attribution"
            aria-label="Copy quote to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-electric" /> : <Copy className="w-4 h-4 text-lavender group-hover:scale-110 transition-transform" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Favourite */}
          <button
            onClick={handleFavourite}
            disabled={!quote}
            className={`group flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl border text-xs sm:text-sm font-sans font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
              isFavourite
                ? 'bg-mint/15 text-mint border-mint/40 shadow-glow-mint'
                : 'bg-velvet border-cloud-subtle text-editorial-muted hover:text-editorial-light hover:bg-velvet-hover hover:border-cloud-border'
            }`}
            title={isFavourite ? 'Remove from favourites' : 'Favourite this quote'}
            aria-label={isFavourite ? 'Remove quote from favourites' : 'Save quote to favourites'}
            aria-pressed={isFavourite}
          >
            <Bookmark className={`w-4 h-4 transition-all ${isFavourite ? 'fill-mint text-mint scale-105' : 'text-lavender group-hover:scale-110 group-hover:text-mint'}`} />
            <span className="hidden sm:inline">{isFavourite ? 'Favourited' : 'Favourite'}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            disabled={!quote || sharing}
            className="group flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl bg-velvet border border-cloud-subtle text-xs sm:text-sm font-sans font-medium text-editorial-muted hover:text-editorial-light hover:bg-velvet-hover hover:border-cloud-border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender"
            title="Share quote"
            aria-label="Share quote"
          >
            {sharing ? <Loader2 className="w-4 h-4 text-lavender animate-spin" /> : <Share2 className="w-4 h-4 text-lavender group-hover:scale-110 transition-transform" />}
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Desktop-only CTA: Discover Another */}
        <button
          onClick={onNewQuote}
          disabled={isLoading}
          className={`hidden sm:flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-sans text-sm font-semibold text-white shadow-glow-ember transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ember active:scale-95 ${
            isLoading ? 'bg-ember/70 cursor-not-allowed opacity-80' : 'bg-ember hover:bg-ember-hover hover:shadow-lg'
          }`}
          aria-label="Discover another random quote"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin text-white" /><span>Discovering...</span></>
          ) : (
            <><Sparkles className="w-4 h-4 text-white" /><span>Discover another</span></>
          )}
        </button>

      </div>
    </div>
  );
}

