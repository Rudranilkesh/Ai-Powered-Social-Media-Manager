// ============================================================
// components/common/CommandPalette.jsx — Spotlight Command Palette (Ctrl+K)
// Apple & Linear style modal with keyboard-first navigation:
// - Ctrl + K / Cmd + K to open from anywhere
// - Arrow Up / Arrow Down to navigate items
// - Enter to trigger route or action
// - Escape to close
// ============================================================

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const COMMANDS = [
  // ⚡ Quick Actions
  {
    id: "create-post",
    category: "Quick Actions",
    title: "Create New Post",
    subtitle: "Draft and schedule across multiple platforms",
    icon: "✍️",
    badge: "Action",
    shortcut: "C",
    action: (navigate) => navigate("/posts"),
  },
  {
    id: "ai-studio",
    category: "Quick Actions",
    title: "Open Gemini AI Studio",
    subtitle: "Generate captions, hooks, and ideas with Gemini 1.5",
    icon: "✨",
    badge: "AI",
    shortcut: "A",
    action: (navigate) => navigate("/ai"),
  },
  {
    id: "calendar-view",
    category: "Quick Actions",
    title: "View Content Calendar",
    subtitle: "Inspect upcoming scheduled queue and timeline",
    icon: "📅",
    badge: "Queue",
    action: (navigate) => navigate("/calendar"),
  },
  {
    id: "connect-channel",
    category: "Quick Actions",
    title: "Connect Social Channel",
    subtitle: "Integrate Instagram, LinkedIn, Twitter/X, or Facebook",
    icon: "🔗",
    badge: "Setup",
    action: (navigate) => navigate("/settings"),
  },

  // 🧭 Navigation
  {
    id: "nav-dashboard",
    category: "Navigation",
    title: "Dashboard Overview",
    subtitle: "Return to the main command center",
    icon: "📊",
    action: (navigate) => navigate("/dashboard"),
  },
  {
    id: "nav-posts",
    category: "Navigation",
    title: "Posts & Content Library",
    subtitle: "Browse drafts, scheduled, and published posts",
    icon: "📝",
    action: (navigate) => navigate("/posts"),
  },
  {
    id: "nav-analytics",
    category: "Navigation",
    title: "Analytics & Snapshots",
    subtitle: "Audience growth, engagement, and reach metrics",
    icon: "📈",
    action: (navigate) => navigate("/analytics"),
  },
  {
    id: "nav-settings",
    category: "Navigation",
    title: "Workspace Settings",
    subtitle: "Manage connected accounts, API keys, and profile",
    icon: "⚙️",
    action: (navigate) => navigate("/settings"),
  },

  // 🎨 Creative Templates
  {
    id: "tpl-carousel",
    category: "Templates",
    title: "Draft Instagram Carousel",
    subtitle: "High-engagement multi-slide educational breakdown",
    icon: "📸",
    badge: "Template",
    action: (navigate) => navigate("/posts?type=carousel"),
  },
  {
    id: "tpl-linkedin",
    category: "Templates",
    title: "Draft LinkedIn Authority Post",
    subtitle: "Founder story hook with professional business takeaway",
    icon: "💼",
    badge: "Template",
    action: (navigate) => navigate("/posts?type=story"),
  },
  {
    id: "tpl-twitter",
    category: "Templates",
    title: "Draft Twitter / X Thread",
    subtitle: "Snappy 5-tweet viral sequence",
    icon: "🧵",
    badge: "Template",
    action: (navigate) => navigate("/posts?type=thread"),
  },
];

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Filter commands by search term
  const filteredCommands = COMMANDS.filter((cmd) => {
    const searchString = `${cmd.title} ${cmd.subtitle} ${cmd.category}`.toLowerCase();
    return searchString.includes(query.toLowerCase().trim());
  });

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K / Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose ? onClose(!isOpen) : null;
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Arrow up/down & Enter navigation inside open palette
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      const targetCmd = filteredCommands[selectedIndex];
      targetCmd.action(navigate);
      onClose(false);
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.children[selectedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-200 animate-fadeIn"
        onClick={() => onClose(false)}
        aria-hidden="true"
      />

      {/* Palette Modal Box */}
      <div className="relative w-full max-w-xl bg-surface border border-brand/30 rounded-panel shadow-2xl overflow-hidden z-10 animate-slideUp">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line bg-surface-soft/40">
          <svg className="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search commands, actions, or tools... (e.g. 'Create', 'AI')"
            className="flex-1 bg-transparent border-none text-ink text-sm sm:text-base placeholder-ink-subtle focus:outline-none focus:ring-0"
          />

          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-mono text-ink-subtle bg-surface border border-line rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="max-h-[340px] overflow-y-auto p-2 space-y-1 no-scrollbar">
          {filteredCommands.length === 0 ? (
            <div className="py-10 text-center text-sm text-ink-muted">
              <span className="text-2xl block mb-1">🔍</span>
              No matching commands found for <span className="font-semibold text-brand">"{query}"</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action(navigate);
                    onClose(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-control cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-surface-soft text-ink border border-brand/30 scale-[1.01] shadow-xs"
                      : "text-ink-muted hover:bg-surface-muted border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg shrink-0">{cmd.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isSelected ? "text-brand" : "text-ink"}`}>
                          {cmd.title}
                        </span>
                        {cmd.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-line text-ink-muted font-medium">
                            {cmd.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-muted truncate">{cmd.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-ink-subtle">{cmd.category}</span>
                    {isSelected && (
                      <kbd className="text-[11px] font-mono bg-brand text-white px-1.5 py-0.5 rounded shadow-xs">
                        ↵
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2 border-t border-line bg-canvas flex items-center justify-between text-[11px] text-ink-muted">
          <div className="flex items-center gap-3">
            <span><kbd className="font-mono bg-surface px-1 rounded border border-line">↑</kbd> <kbd className="font-mono bg-surface px-1 rounded border border-line">↓</kbd> Navigate</span>
            <span><kbd className="font-mono bg-surface px-1 rounded border border-line">↵</kbd> Select</span>
          </div>
          <span>SocialSync AI Command Center</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;

