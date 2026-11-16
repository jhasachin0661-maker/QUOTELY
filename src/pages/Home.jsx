import React, { useMemo } from 'react';
import QuoteCard from '../components/QuoteCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { Sparkles, Bookmark, Compass, Library, ArrowRight, Quote } from 'lucide-react';

// Desktop stat card helper
function StatCard({ icon, iconBg, value, label }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-velvet border border-cloud-subtle/70">
      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="font-mono text-2xl font-bold text-editorial-light">{value}</p>
        <p className="font-sans text-xs text-editorial-muted uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

// Mobile stat pill helper
function MobileStat({ icon, value, label }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-velvet border border-cloud-subtle/70">
      {icon}
      <div>
        <p className="font-mono text-base font-bold text-editorial-light leading-none">{value}</p>
        <p className="font-sans text-[10px] text-editorial-muted uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export default function Home({
  currentQuote,
  loading,
  error,
  history,
  favourites,
  onNewQuote,
  onRetry,
  isFavourite,
  onToggleFavourite,
  onSelectQuote,
  setActiveTab,
}) {
  const stats = useMemo(() => ({
    totalDiscovered: history.length,
    totalFavourites: favourites.length,
    uniqueAuthors: new Set(history.map((item) => item.author)).size,
  }), [history, favourites]);

  const recentQuotes = useMemo(() => history.slice(0, 3), [history]);

  return (
    <div className="space-y-8 sm:space-y-14 pb-6 sm:pb-16">

      {/* ── Desktop eyebrow header ── */}
      <section className="hidden sm:block text-center max-w-2xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velvet-surface border border-cloud-subtle text-xs font-mono text-lavender tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-marigold" />
          <span>The Daily Margin • Discovery</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-editorial-light">
          A thought to discover. <br />
          <span className="italic font-normal text-lavender">A line to keep.</span>
        </h1>
        <p className="font-sans text-sm sm:text-base text-editorial-muted max-w-lg mx-auto">
          Explore thoughtful reflections from global literature and wisdom traditions, archived in your personal journal.
        </p>
      </section>

      {/* ── Mobile compact eyebrow ── */}
      <section className="sm:hidden pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-velvet-surface border border-cloud-subtle text-[11px] font-mono text-lavender tracking-wider uppercase mb-3">
          <Sparkles className="w-3 h-3 text-marigold" />
          <span>Daily Discovery</span>
        </div>
        <h1 className="font-serif text-2xl font-bold text-editorial-light leading-snug">
          A thought to discover.{' '}
          <span className="italic font-normal text-lavender">A line to keep.</span>
        </h1>
      </section>

      {/* Error Banner */}
      {error && (
        <div className="max-w-4xl mx-auto">
          <ErrorState error={error} onRetry={onRetry} isLoading={loading} />
        </div>
      )}

      {/* Hero Quote Card */}
      <section className="max-w-4xl mx-auto">
        {loading && !currentQuote ? (
          <LoadingState />
        ) : currentQuote ? (
          <QuoteCard
            quote={currentQuote}
            onNewQuote={onNewQuote}
            isLoading={loading}
            isFavourite={isFavourite(currentQuote.id)}
            onToggleFavourite={onToggleFavourite}
          />
        ) : (
          <LoadingState />
        )}
      </section>

      {/* Collection Statistics */}
      <section className="max-w-4xl mx-auto">
        {/* Desktop: 3 columns */}
        <div className="hidden sm:grid grid-cols-3 gap-4 p-6 rounded-3xl bg-velvet-surface border border-cloud-subtle shadow-nocturne">
          <StatCard icon={<Compass className="w-6 h-6" />} iconBg="bg-electric-subtle border-electric-border text-electric" value={stats.totalDiscovered} label="Quotes Discovered" />
          <StatCard icon={<Bookmark className="w-6 h-6" />} iconBg="bg-mint-subtle border-mint-border text-mint" value={stats.totalFavourites} label="Saved Favourites" />
          <StatCard icon={<Library className="w-6 h-6" />} iconBg="bg-marigold-subtle border-marigold/30 text-marigold" value={stats.uniqueAuthors} label="Authors Archived" />
        </div>

        {/* Mobile: horizontal scrollable pills */}
        <div className="sm:hidden flex gap-3 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
          <MobileStat icon={<Compass className="w-4 h-4 text-electric" />} value={stats.totalDiscovered} label="Discovered" />
          <MobileStat icon={<Bookmark className="w-4 h-4 text-mint" />} value={stats.totalFavourites} label="Favourites" />
          <MobileStat icon={<Library className="w-4 h-4 text-marigold" />} value={stats.uniqueAuthors} label="Authors" />
        </div>
      </section>

      {/* Recently Discovered Strip */}
      {recentQuotes.length > 0 && (
        <section className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric" />
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-editorial-light">
                Recent Discoveries
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('history')}
              className="group flex items-center gap-1.5 text-xs font-mono text-lavender hover:text-editorial-light transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Desktop: 3-col grid | Mobile: vertical stack of compact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {recentQuotes.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectQuote(item)}
                className="group p-4 sm:p-5 rounded-2xl bg-velvet border border-cloud-subtle hover:border-electric/50 active:scale-[0.98] transition-all cursor-pointer shadow-nocturne flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-editorial-subtle mb-2">
                    <span className="text-marigold font-medium">#{item.id}</span>
                    <Quote className="w-3.5 h-3.5 text-lavender/40 group-hover:text-lavender transition-colors" />
                  </div>
                  <p className="font-serif italic text-sm text-editorial-light line-clamp-3 mb-3 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
                <div className="pt-2 border-t border-cloud-subtle/50 flex items-center justify-between text-xs">
                  <span className="font-sans font-medium text-editorial-muted truncate">{item.author}</span>
                  <span className="text-[10px] font-mono text-lavender opacity-0 group-hover:opacity-100 transition-opacity">Read</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer — desktop only */}
      <footer className="hidden sm:flex max-w-4xl mx-auto pt-8 border-t border-cloud-subtle items-center justify-center gap-2 text-xs font-mono text-editorial-subtle">
        <span>Quotes provided by </span>
        <a href="https://dummyjson.com/docs/quotes" target="_blank" rel="noopener noreferrer" className="text-lavender hover:underline">
          DummyJSON Quotes API
        </a>
      </footer>

    </div>
  );
}
