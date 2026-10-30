// ============================================================
// App.jsx — Root application component
// Defines the top-level route structure.
// Routes will be populated as each page is implemented.
// Currently shows a temporary health-check screen to confirm
// the frontend and backend are connected.
// ============================================================

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// ── Page imports (uncomment as each page is built) ──
// import LoginPage        from "./pages/auth/LoginPage.jsx";
// import RegisterPage     from "./pages/auth/RegisterPage.jsx";
// import DashboardPage    from "./pages/dashboard/DashboardPage.jsx";
// import CreatePostPage   from "./pages/posts/CreatePostPage.jsx";
// import AIGeneratorPage  from "./pages/ai-generator/AIGeneratorPage.jsx";
// import CalendarPage     from "./pages/calendar/CalendarPage.jsx";
// import AnalyticsPage    from "./pages/analytics/AnalyticsPage.jsx";

// ── Temporary connection check screen shown until pages are built ──
function ConnectionCheck() {
  const [status, setStatus] = useState("Checking backend...");
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    // Use the Vite proxy — no need for full URL in development
    fetch("/api/v1/health")
      .then((res) => {
        if (!res.ok) throw new Error("API unavailable");
        return res.json();
      })
      .then((data) => {
        setStatus(data.message);
        setIsConnected(true);
      })
      .catch(() => {
        setStatus("Backend not reachable — is the server running?");
        setIsConnected(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-surface text-white flex flex-col items-center justify-center gap-8 p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-400 mb-2">
          SocialSync AI 🚀
        </h1>
        <p className="text-slate-400 text-lg">
          AI-Powered Social Media Automation Platform
        </p>
      </div>

      <div className="bg-surface-card rounded-2xl px-10 py-8 text-center shadow-xl border border-surface-border w-full max-w-sm">
        <p className="text-slate-400 text-sm mb-3 uppercase tracking-widest">
          Backend Status
        </p>
        {isConnected === null && (
          <p className="text-yellow-400 font-semibold animate-pulse">
            Connecting...
          </p>
        )}
        {isConnected === true && (
          <p className="text-green-400 font-semibold text-lg">✅ {status}</p>
        )}
        {isConnected === false && (
          <p className="text-red-400 font-semibold text-sm">{status}</p>
        )}
      </div>

      <p className="text-slate-600 text-xs">
        Boilerplate setup complete — pages load here once built.
      </p>
    </main>
  );
}

// ── Route definitions ──
// Replace ConnectionCheck with actual pages as they are built.
function App() {
  return (
    <Routes>
      {/* Temporary root route — replace with DashboardPage after auth is built */}
      <Route path="/" element={<ConnectionCheck />} />

      {/* Auth routes */}
      {/* <Route path="/login"    element={<LoginPage />} /> */}
      {/* <Route path="/register" element={<RegisterPage />} /> */}

      {/* Protected app routes */}
      {/* <Route path="/dashboard"    element={<DashboardPage />} /> */}
      {/* <Route path="/posts/create" element={<CreatePostPage />} /> */}
      {/* <Route path="/ai"           element={<AIGeneratorPage />} /> */}
      {/* <Route path="/calendar"     element={<CalendarPage />} /> */}
      {/* <Route path="/analytics"    element={<AnalyticsPage />} /> */}
    </Routes>
  );
}

export default App;
