import React, { useState } from 'react';
import { Bookmark, Copy, Trash2, ArrowUpRight, Check } from 'lucide-react';
import { copyQuoteToClipboard } from '../utils/clipboard';
import { useToast } from './Toast';

export default function HistoryCard({
  item,
  isFavourite,
  onToggleFavourite,
  onDelete,
  onSelectQuote,
}) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Format the savedAt timestamp
  const formatDate = (dateString) => {
    if (!dateString) return 'Discovered recently';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return 'Recently';
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

  const handleFavourite = (e) => {
    e.stopPropagation();
    const { isFavourite: updatedState } = onToggleFavourite(item);
    if (updatedState) {
      addToast('Saved to personal collection', 'favourite');
    } else {
      addToast('Removed from favourites', 'unfavourite');
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(item.id);
    addToast('Quote removed from history', 'delete');
  };

  return (
    <article
      onClick={() => onSelectQuote(item)}
      className="group relative bg-velvet rounded-2xl p-6 border border-cloud-subtle hover:border-electric/50 transition-all duration-200 cursor-pointer shadow-nocturne hover:shadow-nocturne-lg"
    >
      {/* Top Meta Line: Timestamp & Index & View Prompt */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-3 border-b border-cloud-subtle/60 text-xs font-mono text-editorial-subtle">
        <div className="flex items-center gap-2">
          <span className="text-marigold font-medium">#{item.id}</span>
          <span>•</span>
          <span>{formatDate(item.savedAt)}</span>
        </div>

        <div className="flex items-center gap-1 text-lavender opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-sans">View on Hero</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Quote Body */}
      <blockquote className="font-serif italic text-base sm:text-lg text-editorial-light leading-relaxed mb-4">
        “{item.quote}”
      </blockquote>

      {/* Author and Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
        {/* Author */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-[2px] bg-marigold rounded-full" />
          <cite className="not-italic font-sans text-sm font-medium text-editorial-light">
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

          {/* Bookmark Button */}
          <button
            onClick={handleFavourite}
            className={`p-2 rounded-xl transition-colors ${
              isFavourite
                ? 'text-mint bg-mint-subtle hover:bg-mint/20'
                : 'text-editorial-subtle hover:text-editorial-light hover:bg-velvet-hover'
            }`}
            title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Bookmark className={`w-4 h-4 ${isFavourite ? 'fill-mint' : ''}`} />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-xl text-editorial-subtle hover:text-ember hover:bg-ember-subtle transition-colors"
            title="Delete from history"
            aria-label={`Delete quote by ${item.author} from history`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

