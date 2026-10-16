import React from 'react';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';

interface CategoriesPageProps {
  onNavigate: (route: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Curated Taxonomies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
          Browse AI Tools by Category
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Navigate our structured directory across specialized domains including content writing,
          image synthesis, automated programming, and agentic workflows.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onNavigate(`/category/${cat.slug}`)}
            className="group p-6 rounded-2xl bg-[#0a1226]/85 dark:bg-[#0a1226]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-blue-500/50 hover:bg-[#0e1938] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${cat.badgeBg}`}>
                  {cat.toolCount}+ Tools
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 transition-colors mb-2">
                {cat.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
                {cat.description}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 flex items-center justify-between text-xs text-blue-400 font-semibold">
              <span>Explore {cat.name}</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
