/**
 * Clipboard utility with graceful fallback
 */

export async function copyQuoteToClipboard(quote, author) {
  if (!quote) {
    return { success: false, message: 'No quote text to copy' };
  }

  const formattedText = `"${quote}" — ${author || 'Unknown'}`;

  // 1. Modern Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(formattedText);
      return { success: true, message: 'Quote copied to clipboard' };
    } catch (err) {
      console.warn('[QUOTELY Clipboard] Async clipboard write failed, attempting fallback:', err);
    }
  }

  // 2. Fallback using temporary textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = formattedText;
    
    // Prevent scrolling to bottom of page
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (successful) {
      return { success: true, message: 'Quote copied to clipboard' };
    } else {
      return { success: false, message: 'Unable to copy text automatically' };
    }
  } catch (err) {
    console.error('[QUOTELY Clipboard] Fallback copy failed:', err);
    return { success: false, message: 'Copying is not supported on this device' };
  }
}

