import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';
import Favourites from './pages/Favourites';
import { ToastProvider } from './components/Toast';
import { useQuotes } from './hooks/useQuotes';

function QuotelyApp() {
  const [activeTab, setActiveTab] = useState('home');

  const {
    currentQuote,
    loading,
    error,
    history,
    favourites,
    fetchNewQuote,
    retryFetch,
    toggleFavourite,
    isFavourite,
    deleteHistoryItem,
    clearAllHistory,
    deleteFavouriteItem,
    selectQuote,
  } = useQuotes();

  return (
    <div className="min-h-screen nocturne-ambient text-editorial-light flex flex-col font-sans selection:bg-electric selection:text-white">
      {/* Navigation Header — only shown on desktop (md+) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        favouritesCount={favourites.length}
      />

      {/* Main View Area
          Desktop: comfortable editorial padding with max-width
          Mobile: edge-to-edge, padded for thumb reach, bottom-nav clearance */}
      <main className="flex-1 w-full max-w-6xl mx-auto
        px-4 sm:px-6 lg:px-8
        pt-5 sm:pt-10
        pb-28 md:pb-10">
        {activeTab === 'home' && (
          <Home
            currentQuote={currentQuote}
            loading={loading}
            error={error}
            history={history}
            favourites={favourites}
            onNewQuote={fetchNewQuote}
            onRetry={retryFetch}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
            onSelectQuote={selectQuote}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'history' && (
          <History
            history={history}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
            onDeleteHistoryItem={deleteHistoryItem}
            onClearAllHistory={clearAllHistory}
            onSelectQuote={selectQuote}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'favourites' && (
          <Favourites
            favourites={favourites}
            onRemoveFavourite={deleteFavouriteItem}
            onSelectQuote={selectQuote}
            setActiveTab={setActiveTab}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <QuotelyApp />
    </ToastProvider>
  );
}

