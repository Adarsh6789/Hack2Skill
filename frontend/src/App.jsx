import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Cpu, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  ShieldAlert, 
  ArrowRight, 
  Flame, 
  Smartphone, 
  Gamepad2, 
  Coffee, 
  Tv, 
  Smile, 
  Sparkles 
} from 'lucide-react';

function App() {
  const [backendStatus, setBackendStatus] = useState('idle'); // idle, checking, success, error
  const [geminiStatus, setGeminiStatus] = useState('idle'); // idle, checking, success, error
  const [backendError, setBackendError] = useState('');
  const [geminiError, setGeminiError] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const runDiagnostics = async () => {
    // Check Backend
    setBackendStatus('checking');
    setBackendError('');
    try {
      const backendRes = await fetch(`${API_URL}/api/health`);
      if (backendRes.ok) {
        const data = await backendRes.json();
        setBackendStatus('success');
      } else {
        throw new Error(`HTTP Error: ${backendRes.status}`);
      }
    } catch (err) {
      setBackendStatus('error');
      setBackendError(err.message || 'Could not connect to FastAPI server.');
    }

    // Check Gemini API
    setGeminiStatus('checking');
    setGeminiError('');
    setGeminiResponse('');
    try {
      const geminiRes = await fetch(`${API_URL}/api/test-gemini`);
      const data = await geminiRes.json();
      if (geminiRes.ok && data.success) {
        setGeminiStatus('success');
        setGeminiResponse(data.response);
      } else {
        throw new Error(data.error || 'Gemini check failed.');
      }
    } catch (err) {
      setGeminiStatus('error');
      setGeminiError(err.message || 'Could not verify Gemini connectivity.');
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const triggerGetStarted = () => {
    setNotificationMsg("Awesome! Phase 1 Project Setup is fully operational. Onboarding and Coaching features will be integrated in Phase 2.");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 6000);
  };

  const habits = [
    { name: 'Doomscrolling', icon: <Smartphone className="text-violet-400 w-6 h-6" />, desc: 'Endless social feed scrolling' },
    { name: 'Gaming Addiction', icon: <Gamepad2 className="text-indigo-400 w-6 h-6" />, desc: 'Neglecting daily responsibilities' },
    { name: 'Excessive Screen Time', icon: <Tv className="text-blue-400 w-6 h-6" />, desc: 'Over-consumption of digital media' },
    { name: 'Sugar & Junk Food', icon: <Coffee className="text-pink-400 w-6 h-6" />, desc: 'Emotional eating patterns' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-brand-500 selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] glow-purple -z-10 rounded-full opacity-40"></div>
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] glow-blue -z-10 rounded-full opacity-30"></div>

      {/* Header */}
      <header className="border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                MindShift <span className="text-brand-400 font-medium">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-bold">Recovery Companion</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold glass-panel border-emerald-500/20 text-emerald-400 flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Phase 1 Scaffold
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Product Intro */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span>AI-Driven Habit Reframing</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Break bad habits. <br />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Shift your mind.
              </span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              MindShift AI is not a generic tracker. It is an intelligent companion that understands your behavioral triggers, provides adaptive coaching, and supports you in moments of high urge.
            </p>
          </div>

          {/* Habit Targets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
            {habits.map((habit, idx) => (
              <div key={idx} className="glass-panel-interactive p-4 rounded-xl flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-slate-800/60 mt-0.5">
                  {habit.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">{habit.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{habit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={triggerGetStarted}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-brand-600/30 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <a 
              href="#diagnostics"
              className="px-8 py-4 rounded-xl glass-panel text-slate-300 hover:text-white font-semibold transition-colors duration-200 text-center"
            >
              Verify Connectivity
            </a>
          </div>

          {/* Feedback Banner */}
          {showNotification && (
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm flex items-start space-x-3 animate-fade-in">
              <Smile className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-400" />
              <span>{notificationMsg}</span>
            </div>
          )}
        </div>

        {/* Right Side: Connectivity Dashboard */}
        <div id="diagnostics" className="lg:col-span-5 w-full">
          <div className="glass-panel p-8 rounded-2xl border-slate-800/80 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 blur-2xl rounded-full -z-10"></div>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-400" />
                  System Diagnostics
                </h3>
                <p className="text-xs text-slate-400 mt-1">End-to-End Connectivity Dashboard</p>
              </div>
              <button 
                onClick={runDiagnostics}
                disabled={backendStatus === 'checking' || geminiStatus === 'checking'}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
                title="Run Diagnostics"
              >
                <RefreshCw className={`w-4 h-4 ${backendStatus === 'checking' ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Check 1: Backend Connection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Server className="w-4 h-4 text-slate-400" />
                    FastAPI Server
                  </span>
                  
                  {backendStatus === 'checking' && (
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping"></span>
                      Pinging...
                    </span>
                  )}
                  {backendStatus === 'success' && (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Connected
                    </span>
                  )}
                  {backendStatus === 'error' && (
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Offline
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
                  <p className="text-slate-400 font-mono">GET {API_URL}/api/health</p>
                  {backendStatus === 'error' && (
                    <p className="text-rose-400 mt-1 font-sans">{backendError}. Make sure the FastAPI backend is running via Uvicorn.</p>
                  )}
                  {backendStatus === 'success' && (
                    <p className="text-emerald-500/80 mt-1 font-sans">Backend is healthy. Ready to receive client requests.</p>
                  )}
                  {backendStatus === 'idle' && (
                    <p className="text-slate-500 mt-1">Pending diagnostics run.</p>
                  )}
                </div>
              </div>

              {/* Check 2: Gemini Connection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-slate-400" />
                    Gemini API Configuration
                  </span>
                  
                  {geminiStatus === 'checking' && (
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping"></span>
                      Verifying...
                    </span>
                  )}
                  {geminiStatus === 'success' && (
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Operational
                    </span>
                  )}
                  {geminiStatus === 'error' && (
                    <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Error
                    </span>
                  )}
                </div>

                <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs">
                  <p className="text-slate-400 font-mono">GET {API_URL}/api/test-gemini</p>
                  
                  {geminiStatus === 'error' && (
                    <div className="text-rose-400 mt-1.5 font-sans space-y-1">
                      <p className="font-semibold">Verification failed:</p>
                      <p className="font-mono bg-rose-500/10 p-1.5 rounded border border-rose-500/20 break-words">{geminiError}</p>
                      <p className="text-slate-400 text-[11px] mt-2">
                        Ensure you have created a <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">.env</code> file in <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">backend/</code> and added your <code className="bg-slate-800 px-1 py-0.5 rounded text-slate-200">GEMINI_API_KEY</code>.
                      </p>
                    </div>
                  )}
                  
                  {geminiStatus === 'success' && (
                    <div className="text-slate-300 mt-1.5 space-y-1">
                      <p className="text-emerald-500/80 font-sans">Gemini API is active and responded successfully!</p>
                      <div className="mt-2 bg-emerald-500/5 p-2.5 rounded border border-emerald-500/15">
                        <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider mb-1">Gemini Quick-Response:</p>
                        <p className="font-mono text-slate-300 italic text-[11px]">"{geminiResponse}"</p>
                      </div>
                    </div>
                  )}

                  {geminiStatus === 'idle' && (
                    <p className="text-slate-500 mt-1">Pending diagnostics run.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Need help setting up?</span>
              <a 
                href="https://aistudio.google.com/" 
                target="_blank" 
                rel="noreferrer"
                className="text-brand-400 hover:text-brand-300 transition-colors font-semibold"
              >
                Get Gemini Key
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/50 py-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MindShift AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Built with React + Tailwind + FastAPI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
