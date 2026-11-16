import React from 'react';
import { Compass, Bookmark, History as HistoryIcon, SearchX } from 'lucide-react';

export default function EmptyState({
  type = 'history',
  title,
  description,
  actionText,
  onAction,
}) {
  const getDefaultContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: SearchX,
          defaultTitle: 'No Matching Quotes Found',
          defaultDesc: 'Try adjusting your search terms or author spelling to discover saved quotes.',
          defaultAction: 'Clear Search',
        };
      case 'favourites':
        return {
          icon: Bookmark,
          defaultTitle: 'Your Collection is Quiet',
          defaultDesc: 'No quotes have been bookmarked yet. When you encounter a thought worth keeping, click the bookmark icon to save it here.',
          defaultAction: 'Explore Quotes',
        };
      case 'history':
      default:
        return {
          icon: HistoryIcon,
          defaultTitle: 'No Reading History Yet',
          defaultDesc: 'Your archive will record every thought you discover. Start your discovery journey on the home page.',
          defaultAction: 'Discover First Quote',
        };
    }
  };

  const defaults = getDefaultContent();
  const Icon = defaults.icon;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-14 rounded-3xl bg-velvet/60 border border-cloud-subtle max-w-lg mx-auto editorial-texture my-8 shadow-nocturne">
      
      {/* Icon Circle */}
      <div className="w-16 h-16 rounded-2xl bg-velvet-surface border border-cloud-subtle flex items-center justify-center text-lavender mb-5 shadow-inner">
        <Icon className="w-8 h-8 text-electric" />
      </div>

      <h3 className="font-serif text-2xl font-bold text-editorial-light mb-2">
        {title || defaults.defaultTitle}
      </h3>

      <p className="font-sans text-sm text-editorial-muted max-w-sm mb-6 leading-relaxed">
        {description || defaults.defaultDesc}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric text-white text-sm font-sans font-medium hover:bg-electric-hover active:scale-95 transition-all shadow-glow-electric"
        >
          <Compass className="w-4 h-4" />
          <span>{actionText || defaults.defaultAction}</span>
        </button>
      )}

    </div>
  );
}

