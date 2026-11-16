import { copyQuoteToClipboard } from './clipboard';

/**
 * Share quote using Web Share API with clipboard fallback
 */
export async function shareQuote(quote, author) {
  if (!quote) {
    return { success: false, method: 'none', message: 'No quote to share' };
  }

  const shareData = {
    title: 'QUOTELY — A Thought to Keep',
    text: `"${quote}" — ${author || 'Unknown'}`,
    url: window.location.href,
  };

  // Check if Web Share API is available and can share
  if (navigator?.share) {
    try {
      await navigator.share(shareData);
      return {
        success: true,
        method: 'native',
        message: 'Shared successfully',
      };
    } catch (error) {
      // If user canceled the share dialog, do not treat as an error
      if (error.name === 'AbortError') {
        return {
          success: false,
          method: 'cancelled',
          message: 'Share dismissed',
        };
      }
      console.warn('[QUOTELY Share] Native share failed, falling back to clipboard:', error);
    }
  }

  // Fallback to copying quote
  const copyResult = await copyQuoteToClipboard(quote, author);
  return {
    success: copyResult.success,
    method: 'clipboard',
    message: copyResult.success
      ? 'Share link & quote copied to clipboard'
      : 'Failed to share or copy quote',
  };
}

