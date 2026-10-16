import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Check,
  Star,
  Copy,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Share2,
} from 'lucide-react';
import { Tool } from '../types';

interface ToolDetailModalProps {
  tool: Tool | null;
  onClose: () => void;
  onSelectAlternative: (toolSlug: string) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  onClose,
  onSelectAlternative,
}) => {
  const [copied, setCopied] = useState(false);

  if (!tool) return null;

  const handleCopyLink = () => {
    const url = `${window.location.origin}/tool/${tool.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#091124] dark:bg-[#091124] light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${tool.name} details`}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40">
              {tool.category.toUpperCase()}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {tool.pricing}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/60 transition cursor-pointer"
              title="Copy share link"
              aria-label="Copy share link"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-800/60 transition cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Main Info Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white light:text-slate-900">
                  {tool.name}
                </h2>
                {tool.verified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base mt-1">
                {tool.tagline}
              </p>
            </div>

            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer flex-shrink-0"
            >
              <span>Visit Official Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Rating
              </span>
              <div className="flex items-center gap-1 text-base font-bold text-amber-400 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{tool.rating} / 5.0</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Community Reviews
              </span>
              <span className="text-base font-bold text-white dark:text-white light:text-slate-900 mt-0.5 block">
                {tool.reviewCount.toLocaleString()}+
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Pricing Tier
              </span>
              <span className="text-base font-bold text-white dark:text-white light:text-slate-900 mt-0.5 block">
                {tool.pricing}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Released
              </span>
              <span className="text-base font-bold text-white dark:text-white light:text-slate-900 mt-0.5 block">
                {tool.releasedYear}
              </span>
            </div>
          </div>

          {/* Overview text */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-800 mb-2">
              Overview & Capabilities
            </h3>
            <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
              {tool.fullOverview}
            </p>
          </div>

          {/* Pricing Details */}
          <div className="p-4 rounded-2xl bg-blue-950/20 dark:bg-blue-950/20 light:bg-blue-50/60 border border-blue-900/30 dark:border-blue-900/30 light:border-blue-200">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
              Pricing Details
            </span>
            <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700">
              {tool.pricingDetails}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-800 mb-3">
              Key Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tool.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#081524] dark:bg-[#081524] light:bg-emerald-50/40 border border-emerald-900/30 dark:border-emerald-900/30 light:border-emerald-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5">
                Advantages (Pros)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                {tool.pros.map((p) => (
                  <li key={p} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">+</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-[#1a0f18] dark:bg-[#1a0f18] light:bg-rose-50/40 border border-rose-900/30 dark:border-rose-900/30 light:border-rose-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2.5">
                Considerations (Cons)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                {tool.cons.map((c) => (
                  <li key={c} className="flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold">-</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Alternatives */}
          {tool.alternatives.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Popular Alternatives
              </h3>
              <div className="flex flex-wrap gap-2">
                {tool.alternatives.map((alt) => (
                  <button
                    key={alt}
                    onClick={() => onSelectAlternative(alt.toLowerCase().replace(/\s+/g, '-'))}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 text-xs font-medium text-slate-300 hover:text-white transition cursor-pointer"
                  >
                    {alt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
