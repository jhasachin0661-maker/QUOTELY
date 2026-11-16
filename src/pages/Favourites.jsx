import React, { useState, useMemo } from 'react';
import FavouriteCard from '../components/FavouriteCard';
import EmptyState from '../components/EmptyState';
import { Search, Bookmark, X } from 'lucide-react';

export default function Favourites({
  favourites,
  onRemoveFavourite,
  onSelectQuote,
  setActiveTab,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter favourites by search query
  const filteredFavourites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return favourites;

    return favourites.filter((item) => {
      const matchQuote = item.quote?.toLowerCase().includes(query);
      const matchAuthor = item.author?.toLowerCase().includes(query);
      return matchQuote || matchAuthor;
    });
  }, [favourites, searchQuery]);

  const handleSelectQuote = (quote) => {
    onSelectQuote(quote);
    setActiveTab('home');
  };

  return (
    <div className="space-y-6 pb-6 sm:pb-16 max-w-4xl mx-auto">
      
      {/* Header and Summary */}
      <div className="pb-6 border-b border-cloud-subtle">
        <div className="flex items-center gap-2 font-mono text-xs text-mint tracking-wider uppercase mb-1">
          <Bookmark className="w-3.5 h-3.5 fill-mint" />
          <span>Curated Anthology</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-editorial-light">
          Favourite Quotes
        </h1>
        <p className="font-sans text-xs sm:text-sm text-editorial-muted mt-1">
          {favourites.length} {favourites.length === 1 ? 'thought' : 'thoughts'} saved in your personal collection
        </p>
      </div>

      {/* Search Input Filter */}
      {favourites.length > 0 && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-editorial-subtle">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your favourites by keyword or author..."
            className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-velvet-surface border border-cloud-subtle text-editorial-light placeholder:text-editorial-subtle text-sm font-sans focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint transition-colors"
            aria-label="Search favourites"
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

      {/* Search Result Counter */}
      {searchQuery && favourites.length > 0 && (
        <div className="text-xs font-mono text-editorial-muted">
          Showing {filteredFavourites.length} saved thought{filteredFavourites.length === 1 ? '' : 's'} matching &ldquo;{searchQuery}&rdquo;
        </div>
      )}

      {/* Content Rendering */}
      {favourites.length === 0 ? (
        <EmptyState
          type="favourites"
          title="Your Collection Awaits"
          description="You haven't bookmarked any quotes yet. Whenever a line touches your mind, bookmark it on the Discover screen to save it here permanently."
          actionText="Find Quotes to Save"
          onAction={() => setActiveTab('home')}
        />
      ) : filteredFavourites.length === 0 ? (
        <EmptyState
          type="search"
          title="No Favourites Found"
          description={`None of your saved quotes match "${searchQuery}". Try a different keyword or author.`}
          actionText="Clear Search Filter"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div className="space-y-4">
          {filteredFavourites.map((item) => (
            <FavouriteCard
              key={item.id}
              item={item}
              onRemoveFavourite={onRemoveFavourite}
              onSelectQuote={handleSelectQuote}
            />
          ))}
        </div>
      )}

    </div>
  );
}

