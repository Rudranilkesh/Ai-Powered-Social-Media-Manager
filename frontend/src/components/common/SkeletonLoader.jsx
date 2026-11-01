// ============================================================
// components/common/SkeletonLoader.jsx — Reusable Shimmer Skeletons
// Provides graceful content placeholders with wave shimmer animation.
// ============================================================

import React from "react";

export function SkeletonBox({ className = "h-6 w-full" }) {
  return <div className={`skeleton ${className}`} />;
}

export function SkeletonKPICard() {
  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonBox className="h-4 w-24" />
        <SkeletonBox className="h-8 w-8 rounded-xl" />
      </div>
      <SkeletonBox className="h-8 w-16" />
      <SkeletonBox className="h-3 w-36" />
    </div>
  );
}

export function SkeletonPostRow() {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-control border border-line bg-surface space-x-4">
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <SkeletonBox className="w-10 h-10 rounded-xl flex-shrink-0" />
        <div className="space-y-1.5 flex-1 min-w-0">
          <SkeletonBox className="h-4 w-3/4" />
          <SkeletonBox className="h-3 w-1/2" />
        </div>
      </div>
      <SkeletonBox className="h-6 w-20 rounded-full flex-shrink-0" />
    </div>
  );
}

export default {
  SkeletonBox,
  SkeletonKPICard,
  SkeletonPostRow,
};

