/**
 * External Quote Service - DummyJSON Quotes API
 * Endpoint: https://dummyjson.com/quotes/random
 */

export const API_URL = 'https://dummyjson.com/quotes/random';

/**
 * Fetches a random quote with schema validation and cancellation support
 * @param {AbortSignal} [signal] Optional abort signal for request cancellation
 * @returns {Promise<{id: number, quote: string, author: string, savedAt: string}>}
 */
export async function fetchRandomQuote(signal) {
  try {
    const response = await fetch(API_URL, {
      signal,
      headers: {
        'Accept': 'application/json',
      },
      // Ensure no stale browser caching of random quote responses
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Quote service returned status ${response.status} (${response.statusText || 'Error'})`);
    }

    const data = await response.json();

    // Defensive schema validation according to TRD specifications
    if (
      !data ||
      typeof data.id !== 'number' ||
      typeof data.quote !== 'string' ||
      typeof data.author !== 'string'
    ) {
      throw new Error('Received malformed quote structure from external API');
    }

    const trimmedQuote = data.quote.trim();
    const trimmedAuthor = data.author.trim();

    if (!trimmedQuote) {
      throw new Error('Received empty quote text from external API');
    }

    return {
      id: data.id,
      quote: trimmedQuote,
      author: trimmedAuthor || 'Anonymous',
      savedAt: new Date().toISOString(),
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      throw error; // Re-throw abort error for hook cancellation tracking
    }
    console.error('[QUOTELY Service] Quote fetch failed:', error);
    throw error;
  }
}

