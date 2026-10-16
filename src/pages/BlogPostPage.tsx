import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Check,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import { BlogPost } from '../types';
import { ARTICLES } from '../data/articles';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (route: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-400" aria-label="Breadcrumb">
        <button onClick={() => onNavigate('/')} className="hover:text-white transition">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('/blog')} className="hover:text-white transition">
          Blog
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-200 dark:text-slate-200 light:text-slate-900 truncate max-w-xs font-medium">
          {article.title}
        </span>
      </nav>

      {/* Back button */}
      <div>
        <button
          onClick={() => onNavigate('/blog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all articles</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-950/60 text-blue-400 border border-blue-900/40">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white dark:text-white light:text-slate-900 leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author row & Share */}
        <div className="pt-4 border-t border-b border-slate-800/80 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
              width="40"
              height="40"
            />
            <div>
              <div className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                {article.author.name}
              </div>
              <div className="text-xs text-slate-400">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {article.publishedAt}</span>
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="Copy link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Article Markdown/HTML style Content */}
      <article className="prose prose-invert max-w-none text-slate-300 dark:text-slate-300 light:text-slate-800 leading-relaxed space-y-6 text-sm sm:text-base">
        {article.content.split('\n\n').map((paragraph, index) => {
          const trimmed = paragraph.trim();
          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={index}
                className="text-2xl font-bold text-white dark:text-white light:text-slate-900 mt-8 mb-4 border-b border-slate-800/80 pb-2"
              >
                {trimmed.replace('## ', '')}
              </h2>
            );
          }
          if (trimmed.startsWith('### ')) {
            return (
              <h3
                key={index}
                className="text-lg font-bold text-blue-400 dark:text-blue-400 light:text-blue-600 mt-6 mb-2"
              >
                {trimmed.replace('### ', '')}
              </h3>
            );
          }
          if (trimmed.startsWith('- ')) {
            const items = trimmed.split('\n- ');
            return (
              <ul key={index} className="list-disc pl-5 space-y-2 my-4">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          return <p key={index}>{trimmed}</p>;
        })}
      </article>

      {/* Tags */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Articles */}
      <div className="pt-10 border-t border-slate-800/80 space-y-4">
        <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">
          Related AI Insights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => onNavigate(`/blog/${rel.slug}`)}
              className="p-5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition group"
            >
              <span className="text-xs text-blue-400 font-semibold">{rel.category}</span>
              <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors mt-1 mb-2">
                {rel.title}
              </h4>
              <span className="text-xs text-slate-400">{rel.readTime}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
