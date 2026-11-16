import React from 'react';
import { History as HistoryIcon, Bookmark, Compass } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, historyCount = 0, favouritesCount = 0 }) {
  const navItems = [
    {
      id: 'home',
      label: 'Discover',
      icon: Compass,
      badge: null,
    },
    {
      id: 'history',
      label: 'History',
      icon: HistoryIcon,
      badge: historyCount > 0 ? historyCount : null,
    },
    {
      id: 'favourites',
      label: 'Favourites',
      icon: Bookmark,
      badge: favouritesCount > 0 ? favouritesCount : null,
      badgeColor: 'bg-mint/20 text-mint border-mint/30',
    },
  ];

  return (
    <>
      {/* ─── DESKTOP HEADER (md and above) ─────────────────────────────── */}
      <header className="hidden md:block sticky top-0 z-40 w-full backdrop-blur-md bg-midnight/90 border-b border-cloud-subtle">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between gap-8">

          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-electric rounded-lg shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-velvet flex items-center justify-center border border-cloud-border group-hover:border-electric transition-colors shadow-nocturne">
              <span className="font-serif text-xl font-bold text-ember">Q</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif tracking-widest text-xl font-bold text-editorial-light uppercase">
                  QUOTELY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-marigold animate-pulse-subtle" />
              </div>
              <p className="font-mono text-[10px] tracking-wider text-editorial-subtle uppercase">
                Digital Literary Lounge
              </p>
            </div>
          </button>

          {/* Centre pill navigation */}
          <nav className="flex items-center gap-1 bg-velvet-surface p-1.5 rounded-2xl border border-cloud-subtle shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric ${
                    isActive
                      ? 'bg-electric text-white shadow-glow-electric font-semibold'
                      : 'text-editorial-muted hover:text-editorial-light hover:bg-velvet-hover'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-lavender'}`} />
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span className={`font-mono text-[11px] px-2 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30'
                        : item.badgeColor || 'bg-velvet text-editorial-muted border-cloud-subtle'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right spacer — keeps logo+nav centred */}
          <div className="w-[180px] shrink-0" />
        </div>
      </header>

      {/* ─── MOBILE HEADER (below md) ───────────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 w-full backdrop-blur-md bg-midnight/90 border-b border-cloud-subtle">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Compact logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-velvet flex items-center justify-center border border-cloud-border">
              <span className="font-serif text-base font-bold text-ember">Q</span>
            </div>
            <span className="font-serif tracking-widest text-base font-bold text-editorial-light uppercase">
              QUOTELY
            </span>
          </button>

          {/* Live stats pill (mobile only) */}
          <div className="flex items-center gap-2">
            {historyCount > 0 && (
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-velvet border border-cloud-subtle text-editorial-muted">
                {historyCount} quotes
              </span>
            )}
            {favouritesCount > 0 && (
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-mint/15 border border-mint/30 text-mint font-semibold">
                ♥ {favouritesCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ─── MOBILE BOTTOM TAB BAR ─────────────────────────────────────── */}
      <nav
        aria-label="App navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch bg-velvet/95 backdrop-blur-xl border-t border-cloud-subtle shadow-nocturne-lg"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[11px] font-sans font-medium transition-all duration-150 focus:outline-none active:scale-95 ${
                isActive ? 'text-white' : 'text-editorial-muted'
              }`}
            >
              {/* Active indicator bar at top */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-b-full bg-electric" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'text-electric scale-110' : 'text-lavender'
                  }`}
                />
                {item.badge !== null && (
                  <span className={`absolute -top-2 -right-3 min-w-[16px] h-4 text-[10px] font-mono flex items-center justify-center rounded-full px-1 ${
                    item.id === 'favourites' ? 'bg-mint text-midnight font-bold' : 'bg-electric text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={isActive ? 'text-electric font-semibold' : ''}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

