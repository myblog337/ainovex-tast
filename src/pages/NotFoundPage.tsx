import React from 'react';
import { Home, Search, ArrowRight, Compass } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (route: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-blue-900/20 text-blue-500 border border-blue-800/40 flex items-center justify-center mx-auto text-3xl font-black">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
        Page Not Found
      </h1>

      <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
        The page or tool resource you are looking for may have been moved, renamed, or is
        temporarily unavailable in our directory.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => onNavigate('/tools')}
          className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Explore AI Directory</span>
        </button>
      </div>

      <div className="pt-8 border-t border-slate-800/80">
        <span className="text-xs text-slate-500 uppercase tracking-wider block mb-3">
          Popular Sections
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['AI Writing', 'Image Generation', 'Video & Audio', 'Productivity', 'Code & Dev'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() =>
                  onNavigate(
                    `/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`
                  )
                }
                className="text-xs px-3 py-1 rounded-full bg-slate-900/80 hover:bg-blue-900/40 text-slate-400 hover:text-blue-300 border border-slate-800 transition"
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
