import React, { useState } from 'react';
import {
  Search,
  Flame,
  ArrowRight,
  BookOpen,
  Sparkles,
  Layers,
  Compass,
} from 'lucide-react';
import { Category, Tool } from '../types';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { HeroIllustration } from '../components/HeroIllustration';
import { CategoryCard } from '../components/CategoryCard';
import { ToolCard } from '../components/ToolCard';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onSelectTool: (tool: Tool) => void;
  onSearchQuery: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectTool,
  onSearchQuery,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const trendingTags = [
    { label: 'ChatGPT', query: 'ChatGPT' },
    { label: 'AI Image Generator', query: 'image' },
    { label: 'Video Editing', query: 'video' },
    { label: 'Productivity', query: 'productivity' },
    { label: 'SEO', query: 'SEO' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput.trim());
      onNavigate(`/tools?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      onNavigate('/tools');
    }
  };

  const handleTrendingClick = (query: string) => {
    onSearchQuery(query);
    onNavigate(`/tools?q=${encodeURIComponent(query)}`);
  };

  // 5 featured tools from the screenshot
  const featuredTools = TOOLS.filter((t) =>
    ['chatgpt', 'midjourney', 'canva', 'runway', 'leonardo-ai'].includes(t.id)
  );

  return (
    <div className="w-full space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Blue badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span>Your AI Journey Starts Here</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-3xl leading-[1.15] mb-5">
          Discover the Best{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-blue-600">
            AI Tools
          </span>{' '}
          & Resources
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
          AINOVEX brings you the latest AI tools, helpful guides, tech news and insights — all in one
          place. Boost your productivity, creativity and work smarter with the power of AI.
        </p>

        {/* Search Bar pill */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-xl relative flex items-center bg-white dark:bg-[#0b1328] border border-slate-300 dark:border-slate-700/80 rounded-full p-1.5 shadow-xl shadow-black/5 dark:shadow-black/20 focus-within:border-blue-500 transition-colors mb-4"
        >
          <Search className="w-5 h-5 text-slate-400 ml-3.5 flex-shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search AI tools, guides..."
            className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            aria-label="Search AI tools and guides"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md transition cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </form>

        {/* Trending tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 mb-8">
          <div className="flex items-center gap-1 font-semibold text-amber-500 dark:text-amber-400 mr-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
            <span>Trending:</span>
          </div>
          {trendingTags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => handleTrendingClick(tag.query)}
              className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-600/20 text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700/60 transition cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Hero Cybernetic Orb Graphic */}
        <HeroIllustration />
      </section>

      {/* Browse by Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Browse by Category
          </h2>
          <button
            onClick={() => onNavigate('/categories')}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 9 Category Grid matching screenshots */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={(slug) => onNavigate(`/category/${slug}`)}
            />
          ))}
        </div>
      </section>

      {/* Featured AI Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Featured AI Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Handpicked top AI tools to help you work faster, create better and achieve more.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition cursor-pointer self-start sm:self-auto"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Tools Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      </section>

      {/* Latest Blog & News Section matching screenshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Insights & Updates</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Latest Blog & News
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Stay updated with the latest AI news, tips, tutorials and industry trends.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition cursor-pointer self-start sm:self-auto"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Editorial Desk Card from screenshot */}
        <div className="w-full rounded-3xl p-8 sm:p-12 bg-white dark:bg-[#091226]/80 border border-slate-200 dark:border-slate-800/80 text-center flex flex-col items-center justify-center shadow-md dark:shadow-lg">
          {/* Badge: EDITORIAL DESK */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-5">
            <BookOpen className="w-4 h-4" />
            <span>EDITORIAL DESK</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            No articles published yet.
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed mb-8">
            Stay updated with upcoming AI news, tips, tutorials, and industry trends. Our editorial
            team is currently researching and vetting the first set of guides, comparisons, and
            workflows.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => onNavigate('/tools')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md transition cursor-pointer"
            >
              Explore AI Tools Directory
            </button>
            <button
              onClick={() => onNavigate('/blog')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-slate-100 dark:bg-[#0d162e] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700/60 text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              View Blog Archive
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
