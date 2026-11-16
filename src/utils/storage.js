/**
 * LocalStorage Persistence Layer for QUOTELY
 * Keys: quotely_history, quotely_favourites, quotely_preferences
 */

export const STORAGE_KEYS = {
  HISTORY: 'quotely_history',
  FAVOURITES: 'quotely_favourites',
  PREFERENCES: 'quotely_preferences',
};

export const MAX_HISTORY_ITEMS = 200;

/**
 * Safely parse JSON from localStorage with fallback
 */
function safeGetItem(key, fallback = []) {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return Array.isArray(fallback) ? (Array.isArray(parsed) ? parsed : fallback) : (typeof parsed === 'object' && parsed !== null ? parsed : fallback);
  } catch (error) {
    console.warn(`[QUOTELY Storage] Failed to read key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safely stringify and write to localStorage
 */
function safeSetItem(key, value) {
  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`[QUOTELY Storage] Failed to write key "${key}":`, error);
    // Handle QuotaExceededError or security restrictions gracefully
    return false;
  }
}

// ----------------- HISTORY UTILS -----------------

export function getStoredHistory() {
  return safeGetItem(STORAGE_KEYS.HISTORY, []);
}

export function saveStoredHistory(historyList) {
  return safeSetItem(STORAGE_KEYS.HISTORY, historyList);
}

/**
 * Adds quote to history, deduplicating by id and keeping newest first.
 * Caps at MAX_HISTORY_ITEMS (200).
 */
export function addToStoredHistory(quoteItem) {
  if (!quoteItem || typeof quoteItem.id === 'undefined') return getStoredHistory();

  const existingHistory = getStoredHistory();
  
  // Remove duplicate if already exists
  const filtered = existingHistory.filter((item) => item.id !== quoteItem.id);

  // Normalize structure
  const normalizedItem = {
    id: quoteItem.id,
    quote: quoteItem.quote.trim(),
    author: quoteItem.author.trim(),
    savedAt: quoteItem.savedAt || new Date().toISOString(),
  };

  const updatedHistory = [normalizedItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
  safeSetItem(STORAGE_KEYS.HISTORY, updatedHistory);
  return updatedHistory;
}

export function removeFromStoredHistory(quoteId) {
  const existingHistory = getStoredHistory();
  const updatedHistory = existingHistory.filter((item) => item.id !== quoteId);
  safeSetItem(STORAGE_KEYS.HISTORY, updatedHistory);
  return updatedHistory;
}

export function clearStoredHistory() {
  safeSetItem(STORAGE_KEYS.HISTORY, []);
  return [];
}

// ----------------- FAVOURITES UTILS -----------------

export function getStoredFavourites() {
  return safeGetItem(STORAGE_KEYS.FAVOURITES, []);
}

export function saveStoredFavourites(favouritesList) {
  return safeSetItem(STORAGE_KEYS.FAVOURITES, favouritesList);
}

/**
 * Toggles favourite state of a quote.
 * Returns { isFavourite: boolean, updatedFavourites: Array }
 */
export function toggleStoredFavourite(quoteItem) {
  if (!quoteItem || typeof quoteItem.id === 'undefined') {
    return { isFavourite: false, updatedFavourites: getStoredFavourites() };
  }

  const existingFavourites = getStoredFavourites();
  const exists = existingFavourites.some((item) => item.id === quoteItem.id);

  let updatedFavourites;
  let isFavourite;

  if (exists) {
    // Remove from favourites
    updatedFavourites = existingFavourites.filter((item) => item.id !== quoteItem.id);
    isFavourite = false;
  } else {
    // Add to favourites (newest first)
    const normalizedItem = {
      id: quoteItem.id,
      quote: quoteItem.quote.trim(),
      author: quoteItem.author.trim(),
      savedAt: quoteItem.savedAt || new Date().toISOString(),
      favouritedAt: new Date().toISOString(),
    };
    updatedFavourites = [normalizedItem, ...existingFavourites];
    isFavourite = true;
  }

  safeSetItem(STORAGE_KEYS.FAVOURITES, updatedFavourites);
  return { isFavourite, updatedFavourites };
}

export function removeFromStoredFavourites(quoteId) {
  const existingFavourites = getStoredFavourites();
  const updatedFavourites = existingFavourites.filter((item) => item.id !== quoteId);
  safeSetItem(STORAGE_KEYS.FAVOURITES, updatedFavourites);
  return updatedFavourites;
}

// ----------------- PREFERENCES UTILS -----------------

export function getStoredPreferences() {
  return safeGetItem(STORAGE_KEYS.PREFERENCES, {
    reduceMotion: false,
    fontSize: 'normal',
  });
}

export function saveStoredPreferences(preferences) {
  return safeSetItem(STORAGE_KEYS.PREFERENCES, preferences);
}

