import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User, Sparkles } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { BlogPost } from '../types';

interface BlogPageProps {
  onNavigate: (route: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags = ['all', 'Agents', 'Workflows', 'Video', 'Runway', 'Prompting', 'Engineering'];

  const filteredArticles =
    selectedTag === 'all'
      ? ARTICLES
      : ARTICLES.filter((art) => art.tags.includes(selectedTag));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>AINOVEX Editorial & Insights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
          AI Articles, Benchmarks & Guides
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          In-depth technical analysis, tool benchmarks, workflow architectures, and practical
          tutorials from the AINOVEX research desk.
        </p>
      </div>

      {/* Tag filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition cursor-pointer ${
              selectedTag === tag
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700/60'
            }`}
          >
            {tag === 'all' ? 'All Guides' : tag}
          </button>
        ))}
      </div>

      {/* Featured / Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onNavigate(`/blog/${article.slug}`)}
            className="group rounded-2xl bg-[#0a1226]/85 dark:bg-[#0a1226]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 hover:border-blue-500/50 hover:bg-[#0e1938] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-blue-400 font-semibold mb-3">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-950/50 border border-blue-900/30">
                  {article.category}
                </span>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-blue-400 transition-colors mb-3 leading-snug">
                {article.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed line-clamp-3 mb-6">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  loading="lazy"
                  width="28"
                  height="28"
                />
                <span className="text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-700">
                  {article.author.name}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
