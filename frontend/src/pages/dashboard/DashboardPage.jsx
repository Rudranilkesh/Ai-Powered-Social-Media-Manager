// ============================================================
// pages/dashboard/DashboardPage.jsx — Elevated Creator Dashboard
// Implemented strictly per design.md with dynamic scroll animations:
// - Live parallax depth tracking (useParallax) on background ambient orbs
// - 3D cursor-following TiltCard micro-interactions
// - Infinite animated PlatformTicker marquee
// - Horizontal snap-scroll carousel with smooth manual controls
// - Staggered scroll-reveal animation delays on KPI grid
// ============================================================

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useParallax } from "../../hooks/useParallax.js";
import { TiltCard } from "../../components/common/TiltCard.jsx";
import { PlatformTicker } from "../../components/common/PlatformTicker.jsx";
import { AnimatedCounter } from "../../components/common/AnimatedCounter.jsx";
import { LivePostPreviewer } from "../../components/common/LivePostPreviewer.jsx";
import { ConfettiCanvas } from "../../components/common/ConfettiCanvas.jsx";

export function DashboardPage() {
  const { user } = useAuth();
  const { scrollY } = useParallax();
  const confettiRef = useRef(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [carouselDirection, setCarouselDirection] = useState("normal"); // "normal" (right-to-left) or "reverse" (left-to-right)

  // Interactive Checklist State with Confetti trigger
  const [completedSteps, setCompletedSteps] = useState({
    ai: true,
    channel: false,
    post: false,
  });

  const toggleStep = (stepKey, e) => {
    const isNowCompleted = !completedSteps[stepKey];
    setCompletedSteps((prev) => ({ ...prev, [stepKey]: isNowCompleted }));

    if (isNowCompleted && confettiRef.current) {
      const rect = e?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      confettiRef.current.burst(x, y, 70);
    }
  };

  // Dynamic greeting based on current local time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // KPI Metrics with dynamic animated rollups
  const metrics = [
    {
      label: "Total Posts",
      value: 12,
      description: "Drafts and live content",
      tag: "All channels",
      icon: (
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
    },
    {
      label: "Scheduled",
      value: 4,
      description: "Queued for automated publish",
      tag: "Next 7 days",
      icon: (
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: "Published",
      value: 8,
      description: "Live across social channels",
      tag: "All time",
      icon: (
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      label: "AI Generations",
      value: 36,
      description: "Gemini prompts executed",
      tag: "Studio",
      icon: (
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
  ];

  // Horizontal Inspiration Carousel Items
  const inspirationCards = [
    {
      platform: "Instagram",
      title: "Educational Carousel",
      description: "Multi-slide visual breakdowns that maximize saves and profile visits.",
      badge: "High Engagement",
      icon: "📸",
      action: "Draft Carousel",
      accent: "from-pink-500/10 to-transparent",
    },
    {
      platform: "LinkedIn",
      title: "Founder Authority Post",
      description: "Insightful story hook with a crisp professional business takeaway.",
      badge: "B2B Reach",
      icon: "💼",
      action: "Draft Story",
      accent: "from-blue-600/10 to-transparent",
    },
    {
      platform: "Twitter / X",
      title: "Viral Insight Thread",
      description: "Snappy 5-tweet sequence breaking down a complex topic for virality.",
      badge: "Viral Flow",
      icon: "🧵",
      action: "Draft Thread",
      accent: "from-slate-700/10 to-transparent",
    },
    {
      platform: "Facebook",
      title: "Community Value Drop",
      description: "Conversational update designed to spark comments and drive direct clicks.",
      badge: "Community",
      icon: "👥",
      action: "Draft Post",
      accent: "from-blue-500/10 to-transparent",
    },
    {
      platform: "Google Gemini",
      title: "AI Caption & Tone Polish",
      description: "Input a raw idea and let Gemini generate customized platform captions.",
      badge: "AI Studio",
      icon: "✨",
      action: "Try Prompt",
      accent: "from-brand/15 to-transparent",
    },
    {
      platform: "Omnichannel",
      title: "Cross-Platform Launch",
      description: "Coordinated feature release campaign synced simultaneously across networks.",
      badge: "Full Reach",
      icon: "🚀",
      action: "Launch Teaser",
      accent: "from-purple-600/10 to-transparent",
    },
  ];

  return (
    <div className="space-y-9 relative pb-10 overflow-x-clip max-w-full">
      {/* ── Dynamic Parallax Background Orbs (Move with scroll, safely clipped) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-20 w-[450px] h-[450px] bg-brand/5 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${scrollY * 0.14}px)` }}
        />
        <div
          className="absolute top-[480px] -right-24 w-[500px] h-[500px] bg-brand/6 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${-scrollY * 0.08}px)` }}
        />
      </div>

      {/* ── 1. First Viewport: Greeting & Micro-interactive Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slideUp">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-soft border border-line text-xs font-semibold text-brand mb-2 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span>AI Workspace Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink flex items-center gap-2">
            <span>{getGreeting()}, {user?.name ? user.name.split(" ")[0] : "Creator"}!</span>
            <span className="inline-block animate-float">👋</span>
          </h1>
          <p className="text-ink-muted text-sm mt-1">
            Welcome to your AI social media workspace. Plan, generate, and schedule posts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/ai"
            className="btn-secondary text-sm group"
          >
            <svg
              className="w-4 h-4 text-brand transition-transform duration-300 group-hover:rotate-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>AI Studio</span>
          </Link>

          <Link
            to="/posts"
            className="btn-primary text-sm shadow-sm hover:shadow-glow group"
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Post</span>
          </Link>
        </div>
      </div>

      {/* ── 2. KPI Cards Grid with 3D Parallax Tilt & Staggered Reveal ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {metrics.map((card, idx) => (
          <div
            key={card.label}
            className="animate-slideUp"
            style={{ animationDelay: `${(idx + 1) * 90}ms` }}
          >
            <TiltCard
              maxTilt={9}
              className="card-interactive group cursor-default h-full border border-line"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  {card.label}
                </span>
                <div className="w-8 h-8 rounded-xl bg-surface-soft text-brand flex items-center justify-center transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-sm">
                  {card.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-ink tracking-tight mb-1 group-hover:text-brand transition-colors duration-200">
                <AnimatedCounter target={card.value} />
              </div>
              <div className="flex items-center justify-between text-xs text-ink-muted">
                <span>{card.description}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-canvas border border-line text-ink-subtle">
                  {card.tag}
                </span>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* ── 3. Continuous Animated Platform Marquee Ticker ── */}
      <div className="animate-fadeIn" style={{ animationDelay: "350ms" }}>
        <PlatformTicker />
      </div>

      {/* ── 4. Horizontal Continuous Marquee: Quick Inspiration & Formats ── */}
      <div className="space-y-3 animate-slideUp" style={{ animationDelay: "450ms" }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-ink flex items-center gap-2">
              <span>⚡</span> Quick Inspiration & Formats
            </h2>
            <p className="text-xs text-ink-muted">
              Continuous right-to-left showcase • Hover over any card to pause and inspect
            </p>
          </div>

          {/* Marquee Navigation & Pause/Play Controls */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-soft border border-line text-[11px] font-semibold text-brand">
              <span className={`w-1.5 h-1.5 rounded-full ${isCarouselPaused ? "bg-ink-subtle" : "bg-brand animate-ping"}`} />
              <span>{isCarouselPaused ? "Paused" : carouselDirection === "reverse" ? "Flow: Left → Right" : "Live Auto-Scroll"}</span>
            </span>

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsCarouselPaused((prev) => !prev)}
              className="p-1.5 rounded-control border border-line bg-surface hover:bg-surface-soft text-ink-muted hover:text-brand active:scale-90 transition-all shadow-sm cursor-pointer"
              aria-label={isCarouselPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              title={isCarouselPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isCarouselPaused ? (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>

            {/* Left Direction (Reverse) */}
            <button
              type="button"
              onClick={() => {
                setCarouselDirection("reverse");
                setIsCarouselPaused(false);
              }}
              className={`p-1.5 rounded-control border border-line bg-surface hover:bg-surface-soft text-ink-muted hover:text-ink active:scale-90 transition-all shadow-sm cursor-pointer ${
                carouselDirection === "reverse" ? "border-brand text-brand bg-surface-soft" : ""
              }`}
              aria-label="Scroll left to right"
              title="Reverse flow: Left to Right"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Direction (Default Right to Left flow) */}
            <button
              type="button"
              onClick={() => {
                setCarouselDirection("normal");
                setIsCarouselPaused(false);
              }}
              className={`p-1.5 rounded-control border border-line bg-surface hover:bg-surface-soft text-ink-muted hover:text-ink active:scale-90 transition-all shadow-sm cursor-pointer ${
                carouselDirection === "normal" && !isCarouselPaused ? "border-brand text-brand bg-surface-soft" : ""
              }`}
              aria-label="Scroll right to left"
              title="Forward flow: Right to Left (Default)"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Top HR Divider framing the marquee */}
        <hr className="border-t border-line/70 my-2" />

        {/* Continuous Marquee Track Container with gradient fade edges */}
        <div className="relative overflow-hidden py-2 select-none">
          <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-canvas via-canvas/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-canvas via-canvas/80 to-transparent z-10 pointer-events-none" />

          <div
            className="flex w-max animate-cards-marquee"
            style={{
              animationPlayState: isCarouselPaused ? "paused" : "running",
              animationDirection: carouselDirection,
            }}
          >
            {/* Track 1 */}
            <div className="flex items-center gap-4 pr-4 shrink-0">
              {inspirationCards.map((item, idx) => (
                <div key={`card-a-${idx}`} className="w-[290px] sm:w-[320px]">
                  <TiltCard
                    maxTilt={7}
                    className="card-interactive flex flex-col justify-between group h-[220px] border border-line"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                          {item.icon}
                        </span>
                        <span className="badge bg-surface-soft text-brand text-[10px] font-semibold border border-line">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-brand mb-0.5">{item.platform}</p>
                      <h3 className="text-sm font-bold text-ink group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line">
                      <Link
                        to="/ai"
                        className="text-xs font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform"
                      >
                        <span>{item.action}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>

            {/* Track 2 (Identical duplicate for seamless infinite loop) */}
            <div className="flex items-center gap-4 pr-4 shrink-0" aria-hidden="true">
              {inspirationCards.map((item, idx) => (
                <div key={`card-b-${idx}`} className="w-[290px] sm:w-[320px]">
                  <TiltCard
                    maxTilt={7}
                    className="card-interactive flex flex-col justify-between group h-[220px] border border-line"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                          {item.icon}
                        </span>
                        <span className="badge bg-surface-soft text-brand text-[10px] font-semibold border border-line">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-brand mb-0.5">{item.platform}</p>
                      <h3 className="text-sm font-bold text-ink group-hover:text-brand transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-ink-muted mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line">
                      <Link
                        to="/ai"
                        className="text-xs font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1 group-hover:translate-x-1.5 transition-transform"
                      >
                        <span>{item.action}</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom HR Divider framing the marquee */}
        <hr className="border-t border-line/70 my-2" />
      </div>

      {/* ── 5. Middle Section: Upcoming Posts & Connected Channels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slideUp" style={{ animationDelay: "550ms" }}>
        {/* Upcoming Scheduled Posts (2 Cols) */}
        <div className="lg:col-span-2 card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-ink">Upcoming Scheduled Posts</h2>
              <span className="badge bg-surface-soft text-brand font-semibold">0 Queued</span>
            </div>
            <Link to="/calendar" className="text-xs text-brand hover:text-brand-hover font-semibold hover:underline">
              View Calendar →
            </Link>
          </div>

          {/* Empty State per design.md section 4.14 */}
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-surface-soft flex items-center justify-center text-brand mb-3 shadow-sm animate-pulseGlow">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-ink">No scheduled posts yet</h3>
            <p className="text-xs text-ink-muted max-w-sm mt-1 mb-4 leading-relaxed">
              Create a draft with AI or write your own, pick target platforms, and choose an automated publishing time.
            </p>
            <Link to="/posts" className="btn-secondary text-xs py-2 px-3.5">
              Draft your first post
            </Link>
          </div>
        </div>

        {/* Connected Social Channels (1 Col) */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line">
            <h2 className="text-base font-bold text-ink">Connected Accounts</h2>
            <Link to="/accounts" className="text-xs text-brand hover:text-brand-hover font-semibold hover:underline">
              Manage →
            </Link>
          </div>

          <p className="text-xs text-ink-muted">
            Connect your platforms to publish directly via Ayrshare API.
          </p>

          <div className="space-y-2.5">
            {[
              { name: "Instagram", status: "Coming soon", icon: "📸" },
              { name: "LinkedIn", status: "Coming soon", icon: "💼" },
              { name: "Facebook", status: "Coming soon", icon: "👥" },
              { name: "Twitter / X", status: "Coming soon", icon: "🐦" },
            ].map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-between p-2.5 rounded-control bg-canvas border border-line text-xs hover:border-brand/40 hover:bg-surface-soft/60 hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>{platform.icon}</span>
                  <span className="font-medium text-ink">{platform.name}</span>
                </div>
                <span className="text-[11px] text-ink-subtle font-medium">
                  {platform.status}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/accounts"
              className="w-full btn-secondary text-xs py-2 justify-center"
            >
              Connect an account
            </Link>
          </div>
        </div>
      </div>

      {/* ── 6. Live Interactive Platform Simulation Widget ── */}
      <div className="animate-slideUp" style={{ animationDelay: "620ms" }}>
        <LivePostPreviewer />
      </div>

      {/* ── 7. Interactive Onboarding Checklist with Confetti Burst ── */}
      <div className="card bg-gradient-to-r from-surface via-surface to-surface-soft border border-line relative overflow-hidden animate-slideUp" style={{ animationDelay: "680ms" }}>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm animate-pulseGlow">
              ✨
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-ink">
                  Launch Readiness Checklist
                </h2>
                <span className="badge bg-brand/10 text-brand text-[10px] font-bold">
                  {Object.values(completedSteps).filter(Boolean).length} / 3 Complete
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Click any step to toggle completion and trigger celebratory confetti rewards!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              if (confettiRef.current) {
                confettiRef.current.burst(e.clientX, e.clientY, 90);
              }
            }}
            className="btn-secondary text-xs py-1.5 px-3 self-start cursor-pointer hover:border-brand/40 shadow-xs"
          >
            <span>Celebrate</span> 🎉
          </button>
        </div>

        {/* Checklist Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-line">
          {[
            {
              key: "ai",
              title: "1. Test Gemini AI Studio",
              desc: "Draft punchy multi-platform captions",
              link: "/ai",
            },
            {
              key: "channel",
              title: "2. Connect Social Accounts",
              desc: "Link Instagram, LinkedIn or Twitter",
              link: "/accounts",
            },
            {
              key: "post",
              title: "3. Schedule First Post",
              desc: "Automate calendar publishing queue",
              link: "/posts",
            },
          ].map((step) => {
            const isDone = completedSteps[step.key];
            return (
              <div
                key={step.key}
                onClick={(e) => toggleStep(step.key, e)}
                className={`p-3 rounded-control border transition-all duration-200 cursor-pointer flex items-start gap-3 hover:scale-[1.02] ${
                  isDone
                    ? "bg-positive-soft/70 border-positive-border text-positive"
                    : "bg-surface hover:bg-surface-soft border-line hover:border-brand/30"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    isDone
                      ? "bg-positive text-white border-positive"
                      : "border-line-muted bg-canvas"
                  }`}
                >
                  {isDone && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className={`text-xs font-bold ${isDone ? "line-through text-positive/80" : "text-ink"}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Celebratory Canvas Confetti Engine */}
      <ConfettiCanvas ref={confettiRef} />
    </div>
  );
}

export default DashboardPage;
