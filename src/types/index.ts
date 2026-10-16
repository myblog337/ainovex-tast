export type CategoryId =
  | 'ai-writing'
  | 'image-generation'
  | 'video-audio'
  | 'productivity'
  | 'design-art'
  | 'code-dev'
  | 'business'
  | 'education'
  | 'others';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  icon: string;
  colorClass: string;
  badgeBg: string;
  description: string;
  toolCount: number;
}

export type PricingModel = 'Free' | 'Freemium' | 'Paid' | 'Free Trial';

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  fullOverview: string;
  websiteUrl: string;
  category: CategoryId;
  tags: string[];
  pricing: PricingModel;
  pricingDetails: string;
  rating: number; // e.g. 4.9
  reviewCount: number;
  featured: boolean;
  trending: boolean;
  verified: boolean;
  logo: {
    type: 'icon' | 'badge' | 'custom';
    bg: string;
    text?: string;
    iconName?: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
  alternatives: string[];
  releasedYear: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string; // ISO date e.g. 2026-10-10
  readTime: string;
  featured: boolean;
  tags: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string; // 'all' or CategoryId
  pricing: string; // 'all' | PricingModel
  sortBy: 'featured' | 'rating' | 'popular' | 'name-asc';
}
