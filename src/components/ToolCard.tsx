import React from 'react';
import { ArrowRight, Star, ExternalLink, ShieldCheck } from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
  onVisitExternal?: (url: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, onVisitExternal }) => {
  const renderLogo = () => {
    switch (tool.id) {
      case 'chatgpt':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#10a37f] flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A1.5 1.5 0 0 0 6 14.5 1.5 1.5 0 0 0 7.5 16 1.5 1.5 0 0 0 9 14.5 1.5 1.5 0 0 0 7.5 13m9 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5" />
            </svg>
          </div>
        );
      case 'midjourney':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a] border border-slate-700/60 flex items-center justify-center text-white shadow-md">
            {/* Midjourney Sailboat icon */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19c4 1 12 1 16 0" />
              <path d="M6 17l6-13 6 13" />
              <path d="M12 4v13" />
            </svg>
          </div>
        );
      case 'canva':
        return (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center text-white font-black italic text-lg tracking-tighter shadow-md">
            <span>Canva</span>
          </div>
        );
      case 'runway':
        return (
          <div className="w-14 h-14 rounded-2xl bg-black border border-slate-800 flex items-center justify-center text-[#00ff88] font-black text-2xl tracking-tighter shadow-md">
            <span>R</span>
          </div>
        );
      case 'leonardo-ai':
        return (
          <div className="w-14 h-14 rounded-2xl bg-[#130924] border border-purple-800/50 flex items-center justify-center shadow-md">
            {/* Glowing isometric cube */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="#c084fc" strokeWidth="2" />
              <path d="M12 22V12M12 12L21 7M12 12L3 7" stroke="#38bdf8" strokeWidth="2" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 font-bold text-lg shadow-md">
            {tool.name.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  const handleVisit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onVisitExternal) {
      onVisitExternal(tool.websiteUrl);
    } else {
      window.open(tool.websiteUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onClick={() => onSelect(tool)}
      className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-[#0a1226]/85 dark:bg-[#0a1226]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 light:hover:border-blue-500/40 hover:bg-[#0d1836] dark:hover:bg-[#0d1836] light:hover:bg-slate-50/80 transition-all duration-200 shadow-sm hover:shadow-xl cursor-pointer"
    >
      {/* Top Logo */}
      <div className="mb-4 transform group-hover:scale-105 transition-transform duration-200">
        {renderLogo()}
      </div>

      {/* Title */}
      <div className="flex items-center gap-1.5 mb-2">
        <h3 className="text-lg font-bold text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 dark:group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">
          {tool.name}
        </h3>
        {tool.verified && (
          <span title="Verified AI Tool" className="inline-flex items-center">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {tool.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mb-5 w-full">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Visit Tool Button */}
      <button
        onClick={handleVisit}
        className="w-full mt-auto py-2.5 px-4 rounded-xl bg-[#0f172a] dark:bg-[#0f172a] light:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 light:hover:bg-blue-600 text-slate-200 dark:text-slate-200 light:text-white hover:text-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm group/btn"
        aria-label={`Visit ${tool.name} website`}
      >
        <span>Visit Tool</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
