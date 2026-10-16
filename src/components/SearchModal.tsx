import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Zap, BookOpen, Layers } from 'lucide-react';
import { Tool, Category, BlogPost } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: Tool) => void;
  onNavigate: (route: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate('/tools');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const query = searchTerm.trim().toLowerCase();

  const matchedTools = query
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      ).slice(0, 5)
    : TOOLS.slice(0, 4);

  const matchedCategories = query
    ? CATEGORIES.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      ).slice(0, 3)
    : CATEGORIES.slice(0, 3);

  const matchedArticles = query
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.excerpt.toLowerCase().includes(query)
      ).slice(0, 2)
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#091124] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search dialog"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#060c1c]">
          <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AI tools, categories, guides..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-base focus:outline-none"
            aria-label="Search query"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-white transition"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-3 px-2 py-1 text-xs text-slate-400 hover:text-white border border-slate-700 rounded-md transition"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-6">
          {/* Tools Section */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>AI Tools ({matchedTools.length})</span>
            </div>
            <div className="space-y-1.5">
              {matchedTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => {
                    onSelectTool(tool);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 cursor-pointer group transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-400 border border-slate-700">
                      {tool.name.slice(0, 2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {tool.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {tool.pricing}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          {matchedCategories.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Categories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {matchedCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onNavigate(`/category/${cat.slug}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-left transition flex items-center justify-between"
                  >
                    <span className="text-xs font-medium text-slate-200">
                      {cat.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Articles Section */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                <span>Articles & Guides</span>
              </div>
              <div className="space-y-1.5">
                {matchedArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onNavigate(`/blog/${art.slug}`);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-800/60 cursor-pointer group transition"
                  >
                    <div className="text-xs font-medium text-blue-400 mb-0.5">
                      {art.category}
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {art.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query &&
            matchedTools.length === 0 &&
            matchedCategories.length === 0 &&
            matchedArticles.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                No matching tools or guides found for &ldquo;{searchTerm}&rdquo;. Try another keyword.
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-[#060c1c] text-[11px] text-slate-500 flex items-center justify-between">
          <span>Tip: Press ESC to exit search</span>
          <span>AINOVEX Intelligence Search</span>
        </div>
      </div>
    </div>
  );
};
