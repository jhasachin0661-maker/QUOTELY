import React, { useState, useMemo } from 'react';
import HistoryCard from '../components/HistoryCard';
import EmptyState from '../components/EmptyState';
import ClearHistoryModal from '../components/ClearHistoryModal';
import { Search, Trash2, X, History as HistoryIcon } from 'lucide-react';
import { useToast } from '../components/Toast';

export default function History({
  history,
  isFavourite,
  onToggleFavourite,
  onDeleteHistoryItem,
  onClearAllHistory,
  onSelectQuote,
  setActiveTab,
}) {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter history by search query (checks both quote text and author name)
  const filteredHistory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return history;

    return history.filter((item) => {
      const matchQuote = item.quote?.toLowerCase().includes(query);
      const matchAuthor = item.author?.toLowerCase().includes(query);
      return matchQuote || matchAuthor;
    });
  }, [history, searchQuery]);

  const handleClearConfirm = () => {
    onClearAllHistory();
    addToast('Reading history has been cleared', 'info');
  };

  const handleSelectQuote = (quote) => {
    onSelectQuote(quote);
    setActiveTab('home');
  };

  return (
    <div className="space-y-6 pb-6 sm:pb-16 max-w-4xl mx-auto">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-cloud-subtle">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-lavender tracking-wider uppercase mb-1">
            <HistoryIcon className="w-3.5 h-3.5 text-electric" />
            <span>Reading Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-editorial-light">
            Quote History
          </h1>
          <p className="font-sans text-xs sm:text-sm text-editorial-muted mt-1">
            {history.length} {history.length === 1 ? 'quote' : 'quotes'} discovered in this browser
          </p>
        </div>

        {/* Clear All History Button */}
        {history.length > 0 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-ember/30 bg-ember-subtle text-ember hover:bg-ember hover:text-white transition-all text-xs font-sans font-medium active:scale-95 shadow-sm"
            aria-label="Clear all quote history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Input Filter */}
      {history.length > 0 && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-editorial-subtle">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by quote keywords or author name..."
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-velvet-surface border border-cloud-subtle text-editorial-light placeholder:text-editorial-subtle text-sm font-sans focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric transition-colors"
            aria-label="Search history"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-editorial-subtle hover:text-editorial-light"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Search Summary Counter */}
      {searchQuery && history.length > 0 && (
        <div className="text-xs font-mono text-editorial-muted">
          Showing {filteredHistory.length} result{filteredHistory.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
        </div>
      )}

      {/* Content Rendering */}
      {history.length === 0 ? (
        <EmptyState
          type="history"
          title="Your Archive is Empty"
          description="You haven't discovered any quotes yet. Head over to the Discover tab to begin exploring thoughtful lines."
          actionText="Discover Quotes"
          onAction={() => setActiveTab('home')}
        />
      ) : filteredHistory.length === 0 ? (
        <EmptyState
          type="search"
          title="No Quotes Matched Your Search"
          description={`We couldn't find any quotes matching "${searchQuery}". Check the spelling or try searching for another author or keyword.`}
          actionText="Clear Search Filter"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              isFavourite={isFavourite(item.id)}
              onToggleFavourite={onToggleFavourite}
              onDelete={onDeleteHistoryItem}
              onSelectQuote={handleSelectQuote}
            />
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ClearHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleClearConfirm}
        count={history.length}
      />

    </div>
  );
}

