// ============================================================
// components/common/LivePostPreviewer.jsx — Live Interactive Mobile Previewer
// High-fidelity smartphone mockup showcasing live social post rendering
// across Instagram, LinkedIn, Twitter/X, and Facebook.
// ============================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";

const PLATFORMS = [
  { id: "instagram", name: "Instagram", icon: "📸", handle: "@socialsync.ai", color: "#E1306C" },
  { id: "linkedin", name: "LinkedIn", icon: "💼", handle: "SocialSync AI", color: "#0A66C2" },
  { id: "twitter", name: "Twitter / X", icon: "🧵", handle: "@socialsync_ai", color: "#000000" },
  { id: "facebook", name: "Facebook", icon: "👥", handle: "SocialSync AI Page", color: "#1877F2" },
];

export function LivePostPreviewer() {
  const [activePlatform, setActivePlatform] = useState("instagram");
  const [likes, setLikes] = useState({
    instagram: 428,
    linkedin: 312,
    twitter: 1250,
    facebook: 189,
  });
  const [isLiked, setIsLiked] = useState({
    instagram: false,
    linkedin: false,
    twitter: false,
    facebook: false,
  });

  const toggleLike = (platform) => {
    setIsLiked((prev) => {
      const willBeLiked = !prev[platform];
      setLikes((currLikes) => ({
        ...currLikes,
        [platform]: willBeLiked ? currLikes[platform] + 1 : currLikes[platform] - 1,
      }));
      return { ...prev, [platform]: willBeLiked };
    });
  };

  return (
    <div className="card space-y-4 overflow-hidden">
      {/* Widget Header & Platform Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-line">
        <div>
          <h2 className="text-base font-bold text-ink flex items-center gap-2">
            <span>📱</span> Live Multi-Channel Post Preview
          </h2>
          <p className="text-xs text-ink-muted">
            Inspect real-time mobile feed rendering across connected networks
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-control bg-canvas border border-line overflow-x-auto no-scrollbar">
          {PLATFORMS.map((p) => {
            const isActive = activePlatform === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePlatform(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-surface text-brand shadow-xs border border-brand/20 scale-105"
                    : "text-ink-muted hover:text-ink hover:bg-surface/50"
                }`}
              >
                <span>{p.icon}</span>
                <span className="hidden sm:inline">{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Side: Editorial Details & Prompt Action */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-soft border border-line text-xs font-semibold text-brand">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
            <span>Interactive Device Simulation</span>
          </div>

          <h3 className="text-lg font-bold text-ink leading-snug">
            Pixel-Perfect Rendering Before You Schedule
          </h3>

          <p className="text-xs text-ink-muted leading-relaxed">
            Every platform renders captions, spacing, hashtags, and media ratios differently.
            SocialSync AI formats your Gemini output automatically for maximum reach.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-control bg-canvas border border-line">
              <span className="text-ink-muted">Optimal Media Ratio</span>
              <span className="font-semibold text-ink">
                {activePlatform === "instagram" ? "1:1 Square & 4:5 Portrait" : activePlatform === "linkedin" ? "1.91:1 Landscape" : "16:9 Wide"}
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-control bg-canvas border border-line">
              <span className="text-ink-muted">Recommended Caption Length</span>
              <span className="font-semibold text-ink">
                {activePlatform === "twitter" ? "Under 280 chars" : activePlatform === "linkedin" ? "800 - 1,200 chars" : "125 - 150 chars"}
              </span>
            </div>
          </div>

          <Link
            to="/ai"
            className="btn-primary w-full text-xs font-semibold shadow-sm hover:shadow-glow justify-center"
          >
            <span>Draft with Gemini AI</span>
            <span>✨</span>
          </Link>
        </div>

        {/* Right Side: Smartphone Mockup Frame */}
        <div className="md:col-span-7 flex justify-center">
          <div className="w-full max-w-[340px] rounded-[2.5rem] border-[5px] border-ink/80 bg-surface p-3.5 shadow-2xl relative select-none">
            {/* Dynamic Island / Speaker Notch */}
            <div className="w-24 h-4 bg-ink/90 rounded-full mx-auto mb-2 flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-ink-subtle/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
            </div>

            {/* Mobile Status Bar */}
            <div className="flex items-center justify-between px-2 text-[10px] text-ink-muted font-bold mb-2">
              <span>9:41</span>
              <div className="flex items-center gap-1 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Platform Mockup Screen */}
            <div className="rounded-2xl border border-line/70 bg-canvas/30 p-3 min-h-[360px] flex flex-col justify-between">
              {/* Profile Bar */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand text-white text-xs font-bold flex items-center justify-center shadow-xs">
                      SS
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-ink">
                          {PLATFORMS.find((p) => p.id === activePlatform)?.handle}
                        </span>
                        <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <span className="text-[10px] text-ink-subtle">Sponsored • Just now</span>
                    </div>
                  </div>

                  <span className="text-xs text-ink-subtle">•••</span>
                </div>

                {/* Post Content — Rendered per platform */}
                {activePlatform === "instagram" && (
                  <div className="space-y-2.5">
                    {/* Media Card */}
                    <div className="w-full h-44 rounded-xl bg-gradient-to-br from-brand/15 via-surface to-brand/5 border border-line flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-3xl mb-1 animate-bounce">✨</span>
                      <p className="text-xs font-bold text-ink">Next-Gen Social Automation</p>
                      <p className="text-[10px] text-brand font-semibold mt-0.5">Powered by Google Gemini 1.5</p>
                    </div>

                    {/* Interactive Action Bar */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleLike("instagram")}
                          className="hover:scale-125 active:scale-90 transition-transform cursor-pointer"
                        >
                          <span className={`text-base ${isLiked.instagram ? "text-negative" : "text-ink-muted"}`}>
                            {isLiked.instagram ? "❤️" : "🤍"}
                          </span>
                        </button>
                        <span className="text-base text-ink-muted cursor-pointer hover:scale-110 transition-transform">💬</span>
                        <span className="text-base text-ink-muted cursor-pointer hover:scale-110 transition-transform">🚀</span>
                      </div>
                      <span className="text-base text-ink-muted cursor-pointer hover:scale-110 transition-transform">🔖</span>
                    </div>

                    <div className="text-[11px] font-bold text-ink">
                      {likes.instagram.toLocaleString()} likes
                    </div>

                    <p className="text-[11px] text-ink leading-relaxed">
                      <span className="font-bold mr-1">socialsync.ai</span>
                      Supercharge your social reach without the burnout. Plan, generate, and publish across 4 networks in seconds.
                      <span className="text-brand font-semibold block mt-1">#AI #GrowthHacking #SocialSync</span>
                    </p>
                  </div>
                )}

                {activePlatform === "linkedin" && (
                  <div className="space-y-2.5">
                    <p className="text-[11px] text-ink leading-relaxed">
                      Most creator teams spend 18+ hours per week formatting copy for different social channels.
                      <br /><br />
                      With Google Gemini 1.5 + SocialSync AI, cadence is automated end-to-end. Focus on high-leverage strategy while AI handles the distribution.
                    </p>

                    <div className="w-full h-32 rounded-xl bg-surface border border-line p-3 flex flex-col justify-center">
                      <span className="text-xs font-bold text-ink">The 2026 AI Content Playbook 📘</span>
                      <span className="text-[10px] text-ink-muted mt-0.5">socialsync.ai • 3 min read</span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-2 border-t border-line text-xs text-ink-muted">
                      <button
                        type="button"
                        onClick={() => toggleLike("linkedin")}
                        className="flex items-center gap-1 hover:text-brand transition-colors cursor-pointer"
                      >
                        <span>{isLiked.linkedin ? "👏" : "👍"}</span>
                        <span>{likes.linkedin}</span>
                      </button>
                      <span>💬 Comment</span>
                      <span>🔄 Repost</span>
                    </div>
                  </div>
                )}

                {activePlatform === "twitter" && (
                  <div className="space-y-2.5">
                    <p className="text-xs text-ink leading-relaxed">
                      We just open-sourced our automated social media stack powered by Gemini 1.5 & MERN.
                      <br /><br />
                      Here are 3 ways it saves 15 hours every week: 🧵👇
                    </p>

                    <div className="text-[10px] text-ink-subtle pt-2 border-t border-line">
                      10:42 AM • Nov 1, 2026 • <span className="font-semibold text-ink">124.5K</span> Views
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-ink-muted">
                      <span>💬 48</span>
                      <span>🔄 128</span>
                      <button
                        type="button"
                        onClick={() => toggleLike("twitter")}
                        className="flex items-center gap-1 hover:text-negative transition-colors cursor-pointer"
                      >
                        <span>{isLiked.twitter ? "❤️" : "🤍"}</span>
                        <span>{likes.twitter}</span>
                      </button>
                      <span>📊</span>
                    </div>
                  </div>
                )}

                {activePlatform === "facebook" && (
                  <div className="space-y-2.5">
                    <p className="text-[11px] text-ink leading-relaxed">
                      Looking to scale your agency or brand across social platforms?
                      SocialSync AI handles multi-account publishing with automated analytics snapshots.
                    </p>

                    <div className="w-full h-36 rounded-xl bg-brand/10 border border-brand/20 p-3 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl mb-1">🚀</span>
                      <span className="text-xs font-bold text-brand">Automate Your Social Growth</span>
                      <span className="text-[10px] text-ink-muted">Free Workspace Trial</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-line text-xs text-ink-muted">
                      <button
                        type="button"
                        onClick={() => toggleLike("facebook")}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <span>{isLiked.facebook ? "💙" : "👍"}</span>
                        <span>Like ({likes.facebook})</span>
                      </button>
                      <span>💬 Comment</span>
                      <span>↗️ Share</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LivePostPreviewer;

