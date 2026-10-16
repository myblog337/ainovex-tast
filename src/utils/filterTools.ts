import type { Tool, CategoryId, PricingModel } from '../types/index.ts';

export interface FilterOptions {
  query?: string;
  category?: CategoryId | 'all';
  pricing?: PricingModel | 'all';
  sortBy?: 'featured' | 'rating' | 'popular' | 'name-asc';
}

export function filterTools(tools: Tool[], options: FilterOptions): Tool[] {
  const { query = '', category = 'all', pricing = 'all', sortBy = 'featured' } = options;
  const cleanQuery = query.trim().toLowerCase();

  const filtered = tools.filter((tool) => {
    // 1. Category check
    if (category !== 'all' && tool.category !== category) {
      return false;
    }

    // 2. Pricing check
    if (pricing !== 'all' && tool.pricing !== pricing) {
      return false;
    }

    // 3. Search query check
    if (cleanQuery) {
      const matchName = tool.name.toLowerCase().includes(cleanQuery);
      const matchTagline = tool.tagline.toLowerCase().includes(cleanQuery);
      const matchDesc = tool.description.toLowerCase().includes(cleanQuery);
      const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));
      const matchCat = tool.category.toLowerCase().includes(cleanQuery);
      if (!matchName && !matchTagline && !matchDesc && !matchTags && !matchCat) {
        return false;
      }
    }

    return true;
  });

  // Sort
  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });
}

export function countToolsByCategory(tools: Tool[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const tool of tools) {
    counts[tool.category] = (counts[tool.category] || 0) + 1;
  }
  return counts;
}
