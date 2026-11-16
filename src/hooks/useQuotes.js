import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchRandomQuote } from '../services/quoteService';
import {
  getStoredHistory,
  addToStoredHistory,
  removeFromStoredHistory,
  clearStoredHistory,
  getStoredFavourites,
  toggleStoredFavourite,
  removeFromStoredFavourites,
} from '../utils/storage';

export function useQuotes() {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // In-flight request controller reference
  const abortControllerRef = useRef(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const initialHistory = getStoredHistory();
    const initialFavourites = getStoredFavourites();

    setHistory(initialHistory);
    setFavourites(initialFavourites);

    if (initialHistory.length > 0) {
      // Restore latest discovered quote as initial hero
      setCurrentQuote(initialHistory[0]);
      setInitialized(true);
    } else {
      // First-ever visit: fetch an initial quote from API
      setInitialized(true);
      fetchNewQuoteInternal();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  /**
   * Internal quote fetcher
   */
  const fetchNewQuoteInternal = useCallback(async () => {
    // Cancel any existing in-flight fetch
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const newQuote = await fetchRandomQuote(controller.signal);

      // Update current quote
      setCurrentQuote(newQuote);

      // Persist to history (deduplicated by id, capped at 200, newest first)
      const updatedHistory = addToStoredHistory(newQuote);
      setHistory(updatedHistory);
      setError(null);
    } catch (err) {
      if (err.name !== 'AbortError') {
        const errorMsg = err.message || 'Unable to connect to quote service. Please check your network connection.';
        setError(errorMsg);
        // Requirement: Preserve currentQuote if fetch fails, do not wipe it
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  /**
   * Triggered by "New Quote" button
   */
  const fetchNewQuote = useCallback(() => {
    if (loading) return;
    return fetchNewQuoteInternal();
  }, [loading, fetchNewQuoteInternal]);

  /**
   * Toggle favourite state for a quote
   */
  const toggleFavourite = useCallback((quoteToToggle) => {
    if (!quoteToToggle) return { isFavourite: false, quote: null };
    const { isFavourite, updatedFavourites } = toggleStoredFavourite(quoteToToggle);
    setFavourites(updatedFavourites);
    return { isFavourite, quote: quoteToToggle };
  }, []);

  /**
   * Check if a specific quote ID is currently favourited
   */
  const isFavourite = useCallback((quoteId) => {
    if (!quoteId) return false;
    return favourites.some((item) => item.id === quoteId);
  }, [favourites]);

  /**
   * Remove a single item from history
   */
  const deleteHistoryItem = useCallback((quoteId) => {
    const updated = removeFromStoredHistory(quoteId);
    setHistory(updated);
  }, []);

  /**
   * Clear all history (does not affect favourites)
   */
  const clearAllHistory = useCallback(() => {
    const emptyHistory = clearStoredHistory();
    setHistory(emptyHistory);
  }, []);

  /**
   * Remove an item from favourites
   */
  const deleteFavouriteItem = useCallback((quoteId) => {
    const updated = removeFromStoredFavourites(quoteId);
    setFavourites(updated);
  }, []);

  /**
   * Select a past quote to view in the Home hero card
   */
  const selectQuote = useCallback((quote) => {
    if (quote) {
      setCurrentQuote(quote);
      setError(null);
    }
  }, []);

  return {
    currentQuote,
    loading,
    error,
    history,
    favourites,
    initialized,
    fetchNewQuote,
    retryFetch: fetchNewQuoteInternal,
    toggleFavourite,
    isFavourite,
    deleteHistoryItem,
    clearAllHistory,
    deleteFavouriteItem,
    selectQuote,
  };
}

