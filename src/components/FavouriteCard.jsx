import React, { useState } from 'react';
import { Bookmark, Copy, Share2, ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { copyQuoteToClipboard } from '../utils/clipboard';
import { shareQuote } from '../utils/share';
import { useToast } from './Toast';

export default function FavouriteCard({
  item,
  onRemoveFavourite,
  onSelectQuote,
}) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Bookmarked';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Saved';
    }
  };

  const handleCopy = async (e) => {
    e.stopPropagation();
    const result = await copyQuoteToClipboard(item.quote, item.author);
    if (result.success) {
      setCopied(true);
      addToast('Quote copied to clipboard', 'copy');
      setTimeout(() => setCopied(false), 2000);
    } else {
      addToast(result.message, 'error');
    }
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (sharing) return;
    setSharing(true);
    try {
      const result = await shareQuote(item.quote, item.author);
      if (result.success) {
        addToast(result.message, 'share');
      } else if (result.method !== 'cancelled') {
        addToast(result.message, 'error');
      }
    } finally {
      setSharing(false);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemoveFavourite(item.id);
    addToast('Removed from favourites', 'unfavourite');
  };

  return (
    <article
      onClick={() => onSelectQuote(item)}
      className="group relative bg-velvet rounded-2xl p-6 border border-mint/20 hover:border-mint/50 transition-all duration-200 cursor-pointer shadow-nocturne hover:shadow-nocturne-lg"
    >
      {/* Top Meta Line */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-3 border-b border-cloud-subtle/60 text-xs font-mono text-editorial-subtle">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-mint font-medium">
            <Bookmark className="w-3 h-3 fill-mint" />
            <span>SAVED #{item.id}</span>
          </span>
          <span>•</span>
          <span>{formatDate(item.favouritedAt || item.savedAt)}</span>
        </div>

        <div className="flex items-center gap-1 text-lavender opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-sans">View on Hero</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Quote Body */}
      <blockquote className="font-serif italic text-lg sm:text-xl text-editorial-light leading-relaxed mb-5">
        “{item.quote}”
      </blockquote>

      {/* Author and Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        {/* Author */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-[2px] bg-marigold rounded-full" />
          <cite className="not-italic font-sans text-sm font-semibold text-editorial-light">
            {item.author}
          </cite>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl text-editorial-subtle hover:text-editorial-light hover:bg-velvet-hover transition-colors"
            title="Copy quote"
            aria-label={`Copy quote by ${item.author}`}
          >
            {copied ? <Check className="w-4 h-4 text-electric" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            disabled={sharing}
            className="p-2 rounded-xl text-editorial-subtle hover:text-editorial-light hover:bg-velvet-hover transition-colors"
            title="Share quote"
            aria-label={`Share quote by ${item.author}`}
          >
            {sharing ? <Loader2 className="w-4 h-4 text-lavender animate-spin" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Remove Bookmark Button */}
          <button
            onClick={handleRemove}
            className="p-2 rounded-xl text-mint hover:text-ember hover:bg-ember-subtle transition-colors"
            title="Remove from favourites"
            aria-label={`Remove quote by ${item.author} from favourites`}
          >
            <Bookmark className="w-4 h-4 fill-mint group-hover:fill-transparent" />
          </button>
        </div>
      </div>
    </article>
  );
}

