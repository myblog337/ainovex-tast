import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  ArrowUpDown,
  Grid3X3,
  List,
} from 'lucide-react';
import { Tool, CategoryId, PricingModel } from '../types';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { filterTools } from '../utils/filterTools';
import { ToolCard } from '../components/ToolCard';

interface ToolsDirectoryPageProps {
  initialCategory?: string;
  initialQuery?: string;
  onSelectTool: (tool: Tool) => void;
  onNavigate: (route: string) => void;
}

export const ToolsDirectoryPage: React.FC<ToolsDirectoryPageProps> = ({
  initialCategory = 'all',
  initialQuery = '',
  onSelectTool,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'popular' | 'name-asc'>('featured');

  const filteredTools = useMemo(() => {
    return filterTools(TOOLS, {
      query: searchQuery,
      category: selectedCategory as CategoryId | 'all',
      pricing: selectedPricing as PricingModel | 'all',
      sortBy,
    });
  }, [searchQuery, selectedCategory, selectedPricing, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPricing('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || selectedPricing !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Verified AI Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
          Explore All AI Tools & Workflows
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Discover verified artificial intelligence software curated for developers, designers,
          marketers, and businesses.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 bg-[#0a1228]/80 dark:bg-[#0a1228]/80 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 p-5 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, capability, keyword (e.g. video, canvas, reasoning)..."
              className="w-full bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-white dark:text-white light:text-slate-900 placeholder-slate-500 pl-10 pr-10 py-2.5 rounded-xl border border-slate-700/70 focus:outline-none focus:border-blue-500 text-sm transition"
              aria-label="Filter tools by query"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Pricing dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="w-full md:w-auto bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-slate-200 dark:text-slate-200 light:text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-700/70 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              aria-label="Filter by pricing model"
            >
              <option value="all">All Pricing Models</option>
              <option value="Free">Completely Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid Only</option>
            </select>

            {/* Sort dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full md:w-auto bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-slate-200 dark:text-slate-200 light:text-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-700/70 text-sm focus:outline-none focus:border-blue-500 cursor-pointer"
              aria-label="Sort tools"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills horizontal scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-700/60'
            }`}
          >
            All Categories ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-slate-700/60'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Filters & Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
          <div>
            Showing <strong className="text-white dark:text-white light:text-slate-900">{filteredTools.length}</strong> of{' '}
            {TOOLS.length} verified AI tools
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onSelect={onSelectTool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 p-8 rounded-3xl bg-[#091124] border border-slate-800">
          <div className="w-12 h-12 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No matching AI tools found</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
            We couldn&rsquo;t find any tools matching your criteria. Try adjusting your search query
            or clearing your filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition cursor-pointer"
          >
            Clear Filters & Show All
          </button>
        </div>
      )}
    </div>
  );
};
