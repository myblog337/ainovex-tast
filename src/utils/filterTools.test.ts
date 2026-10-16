import test from 'node:test';
import assert from 'node:assert/strict';
import { filterTools, countToolsByCategory } from './filterTools.ts';
import type { Tool } from '../types/index.ts';

const MOCK_TOOLS: Tool[] = [
  {
    id: 'tool-1',
    slug: 'tool-1',
    name: 'Alpha Writer',
    tagline: 'Write faster',
    description: 'AI copywriting tool',
    fullOverview: 'Overview',
    websiteUrl: 'https://alpha.example.com',
    category: 'ai-writing',
    tags: ['Writing', 'Productivity'],
    pricing: 'Free',
    pricingDetails: 'Completely free',
    rating: 4.8,
    reviewCount: 500,
    featured: false,
    trending: false,
    verified: true,
    logo: { type: 'icon', bg: 'bg-blue-500' },
    features: ['Feature 1'],
    pros: ['Pro 1'],
    cons: ['Con 1'],
    alternatives: [],
    releasedYear: 2023,
  },
  {
    id: 'tool-2',
    slug: 'tool-2',
    name: 'Beta Pixel',
    tagline: 'Stunning images',
    description: 'Text to image generation',
    fullOverview: 'Overview',
    websiteUrl: 'https://beta.example.com',
    category: 'image-generation',
    tags: ['Image Generation', 'Design'],
    pricing: 'Paid',
    pricingDetails: '$20/month',
    rating: 4.9,
    reviewCount: 1200,
    featured: true,
    trending: true,
    verified: true,
    logo: { type: 'icon', bg: 'bg-purple-500' },
    features: ['Feature 1'],
    pros: ['Pro 1'],
    cons: ['Con 1'],
    alternatives: [],
    releasedYear: 2024,
  },
  {
    id: 'tool-3',
    slug: 'tool-3',
    name: 'Gamma Code',
    tagline: 'Code generation assistant',
    description: 'AI code autocompletion',
    fullOverview: 'Overview',
    websiteUrl: 'https://gamma.example.com',
    category: 'code-dev',
    tags: ['Code & Dev', 'Productivity'],
    pricing: 'Freemium',
    pricingDetails: 'Free tier available',
    rating: 4.6,
    reviewCount: 300,
    featured: true,
    trending: false,
    verified: true,
    logo: { type: 'icon', bg: 'bg-green-500' },
    features: ['Feature 1'],
    pros: ['Pro 1'],
    cons: ['Con 1'],
    alternatives: [],
    releasedYear: 2023,
  },
];

test('filterTools returns all tools when no filters are applied', () => {
  const result = filterTools(MOCK_TOOLS, {});
  assert.equal(result.length, 3);
});

test('filterTools filters by category correctly', () => {
  const result = filterTools(MOCK_TOOLS, { category: 'image-generation' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'tool-2');
});

test('filterTools filters by search query matching name or tags', () => {
  const byName = filterTools(MOCK_TOOLS, { query: 'alpha' });
  assert.equal(byName.length, 1);
  assert.equal(byName[0].id, 'tool-1');

  const byTag = filterTools(MOCK_TOOLS, { query: 'design' });
  assert.equal(byTag.length, 1);
  assert.equal(byTag[0].id, 'tool-2');
});

test('filterTools filters by pricing correctly', () => {
  const freeTools = filterTools(MOCK_TOOLS, { pricing: 'Free' });
  assert.equal(freeTools.length, 1);
  assert.equal(freeTools[0].id, 'tool-1');

  const paidTools = filterTools(MOCK_TOOLS, { pricing: 'Paid' });
  assert.equal(paidTools.length, 1);
  assert.equal(paidTools[0].id, 'tool-2');
});

test('filterTools sorts by popular review count', () => {
  const sorted = filterTools(MOCK_TOOLS, { sortBy: 'popular' });
  assert.equal(sorted[0].id, 'tool-2'); // 1200 reviews
  assert.equal(sorted[1].id, 'tool-1'); // 500 reviews
  assert.equal(sorted[2].id, 'tool-3'); // 300 reviews
});

test('countToolsByCategory accurately counts items per category', () => {
  const counts = countToolsByCategory(MOCK_TOOLS);
  assert.equal(counts['ai-writing'], 1);
  assert.equal(counts['image-generation'], 1);
  assert.equal(counts['code-dev'], 1);
});
