import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="relative bg-velvet rounded-3xl p-6 sm:p-10 lg:p-12 border border-cloud-subtle shadow-nocturne-lg editorial-texture overflow-hidden">
      
      {/* Top Header Skeleton */}
      <div className="flex items-center justify-between pb-8 border-b border-cloud-subtle/80">
        <div className="h-6 w-36 rounded-full bg-velvet-light animate-pulse" />
        <div className="h-5 w-20 rounded-md bg-velvet-light animate-pulse" />
      </div>

      {/* Quote Lines Skeleton */}
      <div className="py-10 sm:py-14 space-y-4">
        <div className="h-8 sm:h-10 w-11/12 rounded-xl bg-velvet-light/80 animate-pulse" />
        <div className="h-8 sm:h-10 w-full rounded-xl bg-velvet-light/70 animate-pulse" />
        <div className="h-8 sm:h-10 w-3/4 rounded-xl bg-velvet-light/60 animate-pulse" />

        {/* Author Line Skeleton */}
        <div className="pt-6 flex items-center gap-3">
          <div className="h-1 w-8 rounded-full bg-marigold/30" />
          <div className="h-6 w-48 rounded-lg bg-velvet-light animate-pulse" />
        </div>
      </div>

      {/* Actions Skeleton */}
      <div className="pt-6 border-t border-cloud-subtle flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-24 rounded-xl bg-velvet-light animate-pulse" />
          <div className="h-10 w-24 rounded-xl bg-velvet-light animate-pulse" />
          <div className="h-10 w-24 rounded-xl bg-velvet-light animate-pulse" />
        </div>
        <div className="h-11 w-40 rounded-xl bg-ember/30 animate-pulse" />
      </div>

      {/* Subtle Central Indicator */}
      <div className="absolute inset-0 flex items-center justify-center bg-midnight/30 backdrop-blur-[2px] pointer-events-none">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-velvet-card border border-cloud-border shadow-nocturne text-xs font-mono text-lavender">
          <Loader2 className="w-4 h-4 text-ember animate-spin" />
          <span>Curating your quote...</span>
        </div>
      </div>

    </div>
  );
}

