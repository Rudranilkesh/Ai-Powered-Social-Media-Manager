// ============================================================
// components/common/PlatformTicker.jsx — Infinite Marquee Ticker
// Continuous smooth animated marquee showcasing integrated channels
// and capabilities. Pauses smoothly on hover.
// ============================================================

import React from "react";

const TICKER_ITEMS = [
  { icon: "✨", text: "Google Gemini 1.5 Content Studio" },
  { icon: "📸", text: "Instagram Carousel & Single Posts" },
  { icon: "💼", text: "LinkedIn Thought Leadership" },
  { icon: "🧵", text: "Twitter / X Punchy Threads" },
  { icon: "👥", text: "Facebook Page Automation" },
  { icon: "🖼️", text: "Cloudinary CDN Media Hosting" },
  { icon: "⏰", text: "Automated Cron Scheduling" },
  { icon: "📊", text: "Cross-Platform Analytics" },
];

export function PlatformTicker() {
  return (
    <div className="w-full overflow-hidden border-y border-line/70 bg-surface/60 backdrop-blur-xs py-2.5 relative select-none">
      {/* Left & Right Editorial Gradient Fade Masks */}
      <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-canvas via-canvas/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-canvas via-canvas/80 to-transparent z-10 pointer-events-none" />

      {/* Marquee Track (Two identical sub-tracks for seamless 100% loop) */}
      <div className="flex w-max animate-ticker-marquee">
        <div className="flex items-center shrink-0">
          {TICKER_ITEMS.map((item, index) => (
            <div
              key={`track-a-${index}`}
              className="flex items-center gap-2 mx-5 text-xs font-medium text-ink-muted group cursor-default"
            >
              <span className="text-sm group-hover:scale-125 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="group-hover:text-brand transition-colors whitespace-nowrap">
                {item.text}
              </span>
              <span className="text-line text-xs font-bold ml-3.5">•</span>
            </div>
          ))}
        </div>

        <div className="flex items-center shrink-0" aria-hidden="true">
          {TICKER_ITEMS.map((item, index) => (
            <div
              key={`track-b-${index}`}
              className="flex items-center gap-2 mx-5 text-xs font-medium text-ink-muted group cursor-default"
            >
              <span className="text-sm group-hover:scale-125 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="group-hover:text-brand transition-colors whitespace-nowrap">
                {item.text}
              </span>
              <span className="text-line text-xs font-bold ml-3.5">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlatformTicker;

