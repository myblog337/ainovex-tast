import React from 'react';
import { GitBranch, Zap, Sparkles } from 'lucide-react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-xl mx-auto h-[320px] sm:h-[380px] flex items-center justify-center select-none overflow-visible">
      {/* Ambient background glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full bg-blue-600/20 blur-3xl filter animate-pulse" />
        <div className="w-56 h-56 rounded-full bg-cyan-400/15 blur-2xl filter" />
      </div>

      {/* Top Left Floating Card: "Agent Workflows | Autonomous Sync" */}
      <div className="absolute top-4 left-4 sm:left-12 z-20 backdrop-blur-md bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white/90 border border-cyan-500/30 dark:border-cyan-500/30 light:border-cyan-600/20 shadow-lg shadow-cyan-950/40 rounded-xl px-3 py-2 flex items-center gap-2.5 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
        <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400">
          <GitBranch className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="text-left">
          <div className="text-[11px] font-bold text-white dark:text-white light:text-slate-900 leading-tight">
            Agent Workflows
          </div>
          <div className="text-[9px] font-medium text-cyan-400 tracking-wide">
            Autonomous Sync
          </div>
        </div>
      </div>

      {/* Top Right Floating Pill: "• ⚡ Smarter with AI" */}
      <div className="absolute top-8 right-4 sm:right-14 z-20 backdrop-blur-md bg-[#0f172a]/80 dark:bg-[#0f172a]/80 light:bg-white/90 border border-blue-500/30 dark:border-blue-500/30 light:border-blue-500/20 shadow-md shadow-blue-950/30 rounded-full px-3.5 py-1.5 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
        <span className="text-amber-400 text-xs">⚡</span>
        <span className="text-[11px] font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800">
          Smarter with AI
        </span>
      </div>

      {/* Main Glowing Cybernetic Sphere SVG */}
      <svg
        className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] relative z-10"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Radial gradient for the central sphere */}
          <radialGradient id="sphereGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#0284c7" />
            <stop offset="70%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c1b3a" />
          </radialGradient>

          {/* Cyan Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Core Star Glow Filter */}
          <filter id="intenseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Neon Stroke Gradients */}
          <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Outer Perspective Ring 1 */}
        <ellipse
          cx="200"
          cy="220"
          rx="170"
          ry="65"
          stroke="url(#ringGrad1)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          opacity="0.6"
        />

        {/* Outer Perspective Ring 2 */}
        <ellipse
          cx="200"
          cy="215"
          rx="145"
          ry="55"
          stroke="#0284c7"
          strokeWidth="1.2"
          opacity="0.75"
        />

        {/* Tilted Ring 3 */}
        <ellipse
          cx="200"
          cy="200"
          rx="135"
          ry="75"
          transform="rotate(-25 200 200)"
          stroke="url(#ringGrad2)"
          strokeWidth="1.75"
          filter="url(#glow)"
        />

        {/* Tilted Ring 4 */}
        <ellipse
          cx="200"
          cy="200"
          rx="135"
          ry="75"
          transform="rotate(25 200 200)"
          stroke="url(#ringGrad1)"
          strokeWidth="1.2"
          opacity="0.85"
        />

        {/* Polar Longitudinal Arcs */}
        <ellipse
          cx="200"
          cy="200"
          rx="60"
          ry="110"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.5"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="110"
          ry="60"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="2 6"
          opacity="0.5"
        />

        {/* Orbital Node Particles */}
        <circle cx="85" cy="180" r="3.5" fill="#38bdf8" filter="url(#glow)" />
        <circle cx="315" cy="220" r="3" fill="#a855f7" filter="url(#glow)" />
        <circle cx="200" cy="90" r="3" fill="#38bdf8" filter="url(#glow)" />
        <circle cx="260" cy="135" r="2.5" fill="#ffffff" />
        <circle cx="140" cy="265" r="2.5" fill="#38bdf8" />
        <circle cx="330" cy="165" r="2" fill="#60a5fa" />
        <circle cx="70" cy="235" r="2" fill="#c084fc" />

        {/* Central Glowing Planetary Orb */}
        <circle
          cx="200"
          cy="200"
          r="68"
          fill="url(#sphereGrad)"
          filter="url(#glow)"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />

        {/* Latitude/Longitude grid on sphere */}
        <ellipse
          cx="200"
          cy="200"
          rx="66"
          ry="25"
          stroke="#7dd3fc"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.6"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="25"
          ry="66"
          stroke="#7dd3fc"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        {/* Inner Core Halo */}
        <circle cx="200" cy="200" r="28" fill="#0369a1" opacity="0.8" />
        <circle cx="200" cy="200" r="18" fill="#0284c7" filter="url(#glow)" />

        {/* Sparkling Core Starburst */}
        <path
          d="M200 176 L204 196 L224 200 L204 204 L200 224 L196 204 L176 200 L196 196 Z"
          fill="#ffffff"
          filter="url(#intenseGlow)"
        />

        {/* Core center dot */}
        <circle cx="200" cy="200" r="3.5" fill="#ffffff" />

        {/* Perspective Ground Grid lines at the bottom */}
        <line x1="100" y1="280" x2="300" y2="280" stroke="#0284c7" strokeWidth="0.8" opacity="0.4" />
        <line x1="70" y1="295" x2="330" y2="295" stroke="#0284c7" strokeWidth="0.8" opacity="0.3" />
        <line x1="40" y1="310" x2="360" y2="310" stroke="#0284c7" strokeWidth="0.8" opacity="0.2" />

        <line x1="140" y1="270" x2="80" y2="320" stroke="#0284c7" strokeWidth="0.7" opacity="0.3" />
        <line x1="180" y1="270" x2="150" y2="320" stroke="#0284c7" strokeWidth="0.7" opacity="0.3" />
        <line x1="220" y1="270" x2="250" y2="320" stroke="#0284c7" strokeWidth="0.7" opacity="0.3" />
        <line x1="260" y1="270" x2="320" y2="320" stroke="#0284c7" strokeWidth="0.7" opacity="0.3" />
      </svg>
    </div>
  );
};
