import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ToolDetailModal } from './components/ToolDetailModal';
import { HomePage } from './pages/HomePage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Tool } from './types';
import { TOOLS } from './data/tools';
import { CATEGORIES } from './data/categories';
import { ARTICLES } from './data/articles';
import { updateSeo } from './utils/seo';
import { SITE_CONFIG } from './config/site';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [searchQueryParam, setSearchQueryParam] = useState<string>('');

  // 1. Initialize theme
  useEffect(() => {
    const saved = localStorage.getItem('ainovex-theme') as 'dark' | 'light' | null;
    const initialTheme = saved || 'dark';
    setTheme(initialTheme);
    applyThemeClass(initialTheme);
  }, []);

  const applyThemeClass = (t: 'dark' | 'light') => {
    const root = document.documentElement;
    if (t === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  };

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('ainovex-theme', next);
    applyThemeClass(next);
  };

  // 2. Navigation Handler (SPA routing with History API)
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    const parsedPath = path.split('?')[0];
    setCurrentPath(parsedPath);

    // Parse search params if present
    const urlParams = new URLSearchParams(path.includes('?') ? path.split('?')[1] : '');
    const q = urlParams.get('q') || '';
    setSearchQueryParam(q);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to popstate (back/forward browser buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      const urlParams = new URLSearchParams(window.location.search);
      setSearchQueryParam(urlParams.get('q') || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if current path is a direct tool URL: /tool/:slug
  useEffect(() => {
    if (currentPath.startsWith('/tool/')) {
      const slug = currentPath.replace('/tool/', '');
      const tool = TOOLS.find((t) => t.slug === slug);
      if (tool) {
        setSelectedTool(tool);
      }
    }
  }, [currentPath]);

  // 3. Dynamic SEO synchronization
  useEffect(() => {
    if (currentPath === '/') {
      updateSeo({
        title: 'AINOVEX – Discover the Best AI Tools & Resources',
        description:
          'AINOVEX brings you the latest AI tools, helpful guides, tech news and insights — all in one place. Boost your productivity, creativity and work smarter with AI.',
        path: '/',
        schema: {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_CONFIG.name,
          url: `${SITE_CONFIG.url}/`,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_CONFIG.url}/tools?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
      });
    } else if (currentPath === '/tools') {
      updateSeo({
        title: 'Explore All AI Tools & Workflows Directory',
        description:
          'Search, filter, and compare the best verified artificial intelligence tools and workflows across coding, copywriting, design, and video.',
        path: '/tools',
      });
    } else if (currentPath === '/categories') {
      updateSeo({
        title: 'Browse AI Tools by Category Taxonomy',
        description:
          'Explore structured AI categories including AI Writing, Image Generation, Video & Audio, Productivity, Design, and Code Development.',
        path: '/categories',
      });
    } else if (currentPath.startsWith('/category/')) {
      const catSlug = currentPath.replace('/category/', '');
      const cat = CATEGORIES.find((c) => c.slug === catSlug);
      const catName = cat ? cat.name : 'Category';
      updateSeo({
        title: `Best ${catName} Tools & Software 2026`,
        description:
          cat?.description ||
          `Browse the top-rated ${catName} software tools vetted by AINOVEX.`,
        path: currentPath,
      });
    } else if (currentPath === '/blog') {
      updateSeo({
        title: 'AI Articles, Benchmarks, News & Guides',
        description:
          'Read in-depth analysis on autonomous agent architectures, model benchmarks, prompt engineering guides, and AI industry trends.',
        path: '/blog',
      });
    } else if (currentPath.startsWith('/blog/')) {
      const artSlug = currentPath.replace('/blog/', '');
      const article = ARTICLES.find((a) => a.slug === artSlug);
      if (article) {
        updateSeo({
          title: article.title,
          description: article.excerpt,
          path: currentPath,
          ogType: 'article',
          schema: {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: article.title,
            description: article.excerpt,
            author: {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
            },
            datePublished: article.publishedAt,
            publisher: {
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              url: `${SITE_CONFIG.url}/`,
            },
          },
        });
      }
    } else if (currentPath === '/about') {
      updateSeo({
        title: 'About AINOVEX – Our Mission & Vetting Methodology',
        description:
          'Learn about AINOVEX, our editorial standards, verification criteria for AI tools, and our mission to champion authentic AI innovation.',
        path: '/about',
      });
    } else if (currentPath === '/contact') {
      updateSeo({
        title: 'Contact & Submit New AI Tools',
        description:
          'Get in touch with the AINOVEX editorial desk to submit AI software for review, report directory updates, or partner with us.',
        path: '/contact',
      });
    } else if (['/privacy', '/terms', '/disclaimer'].includes(currentPath)) {
      updateSeo({
        title: `${currentPath.replace('/', '').toUpperCase()} – Legal & Transparency`,
        description: 'Read the legal documentation, terms of service, and privacy standards for AINOVEX.',
        path: currentPath,
      });
    } else {
      updateSeo({
        title: '404 Page Not Found',
        description: 'The requested resource could not be found on AINOVEX.',
        path: currentPath,
      });
    }
  }, [currentPath]);

  // Route Dispatcher
  const renderCurrentView = () => {
    if (currentPath === '/') {
      return (
        <HomePage
          onNavigate={navigate}
          onSelectTool={(tool) => setSelectedTool(tool)}
          onSearchQuery={(q) => {
            setSearchQueryParam(q);
          }}
        />
      );
    }

    if (currentPath === '/tools') {
      return (
        <ToolsDirectoryPage
          initialQuery={searchQueryParam}
          initialCategory="all"
          onSelectTool={(tool) => setSelectedTool(tool)}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/categories') {
      return <CategoriesPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/category/')) {
      const catSlug = currentPath.replace('/category/', '');
      return (
        <ToolsDirectoryPage
          initialCategory={catSlug}
          onSelectTool={(tool) => setSelectedTool(tool)}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/blog') {
      return <BlogPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/blog/')) {
      const artSlug = currentPath.replace('/blog/', '');
      return <BlogPostPage slug={artSlug} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/tool/')) {
      const toolSlug = currentPath.replace('/tool/', '');
      const tool = TOOLS.find((t) => t.slug === toolSlug);
      return (
        <ToolsDirectoryPage
          initialQuery={tool ? tool.name : ''}
          onSelectTool={(t) => setSelectedTool(t)}
          onNavigate={navigate}
        />
      );
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }

    if (currentPath === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }

    if (currentPath === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }

    if (currentPath === '/disclaimer') {
      return <LegalPage type="disclaimer" onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 dark:bg-[#060b18] dark:text-slate-100 transition-colors duration-200">
      {/* Universal Header */}
      <Header
        currentRoute={currentPath}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full" id="main-content">
        {renderCurrentView()}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Quick Search Dialog */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectTool={(tool) => {
          setSelectedTool(tool);
          navigate(`/tool/${tool.slug}`);
        }}
        onNavigate={navigate}
      />

      {/* Tool Detail Dialog */}
      <ToolDetailModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
        onSelectAlternative={(altSlug) => {
          const match = TOOLS.find(
            (t) => t.slug === altSlug || t.name.toLowerCase() === altSlug.toLowerCase()
          );
          if (match) {
            setSelectedTool(match);
            navigate(`/tool/${match.slug}`);
          }
        }}
      />
    </div>
  );
}
