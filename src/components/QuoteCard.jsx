import React from 'react';
import QuoteActions from './QuoteActions';
import { Bookmark, Sparkles } from 'lucide-react';

export default function QuoteCard({
  quote,
  onNewQuote,
  isLoading,
  isFavourite,
  onToggleFavourite,
}) {
  if (!quote) return null;

  return (
    <article className="relative bg-velvet rounded-3xl p-5 sm:p-10 lg:p-12 border border-cloud-subtle shadow-nocturne-lg editorial-texture overflow-hidden transition-all duration-300">
      
      {/* Decorative Oversized Watermark Quotation Mark */}
      <span
        aria-hidden="true"
        className="absolute -top-6 -left-2 sm:left-4 font-serif text-[120px] sm:text-[180px] font-bold text-electric/10 select-none pointer-events-none leading-none -z-0"
      >
        “
      </span>

      {/* Decorative Top Metadata Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-8 border-b border-cloud-subtle/80">
        
        {/* Editorial Eyebrow & Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-subtle border border-electric-border">
            <span className="w-1.5 h-1.5 rounded-full bg-electric" />
            <span className="font-mono text-[11px] font-medium tracking-widest text-lavender uppercase">
              A Thought to Keep
            </span>
          </div>

          {isFavourite && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint-subtle border border-mint-border text-mint">
              <Bookmark className="w-3 h-3 fill-mint" />
              <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                Saved
              </span>
            </div>
          )}
        </div>

        {/* Folio / Catalog Index */}
        <div className="flex items-center gap-2 font-mono text-xs text-editorial-subtle">
          <span className="text-marigold font-medium">INDEX</span>
          <span className="text-editorial-muted">#{quote.id}</span>
        </div>

      </div>

      {/* Hero Quote Body */}
      <div className="relative z-10 py-8 sm:py-12">
        <blockquote className="quote-hero-text font-serif italic text-editorial-light tracking-tight leading-relaxed selection:bg-electric">
          “{quote.quote}”
        </blockquote>

        {/* Author Attribution */}
        <div className="mt-8 flex items-center gap-4">
          <span className="h-[2px] w-8 bg-marigold rounded-full" />
          <div>
            <cite className="not-italic font-sans text-lg sm:text-xl font-medium text-editorial-light tracking-wide">
              {quote.author}
            </cite>
            <p className="font-mono text-xs text-editorial-subtle mt-0.5 uppercase tracking-wider">
              Author & Voice
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Actions Suite */}
      <div className="relative z-10">
        <QuoteActions
          quote={quote}
          onNewQuote={onNewQuote}
          isLoading={isLoading}
          isFavourite={isFavourite}
          onToggleFavourite={onToggleFavourite}
        />
      </div>

    </article>
  );
}

