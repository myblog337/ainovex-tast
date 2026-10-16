import React from 'react';
import {
  Feather,
  Image,
  Play,
  Zap,
  Palette,
  Code2,
  BarChart3,
  GraduationCap,
  LayoutGrid,
} from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (slug: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const getIcon = () => {
    switch (category.id) {
      case 'ai-writing':
        return <Feather className="w-5 h-5 text-blue-400" />;
      case 'image-generation':
        return <Image className="w-5 h-5 text-purple-400" />;
      case 'video-audio':
        return <Play className="w-5 h-5 text-pink-400 fill-pink-400/20" />;
      case 'productivity':
        return <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />;
      case 'design-art':
        return <Palette className="w-5 h-5 text-amber-400" />;
      case 'code-dev':
        return <Code2 className="w-5 h-5 text-sky-400" />;
      case 'business':
        return <BarChart3 className="w-5 h-5 text-teal-400" />;
      case 'education':
        return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'others':
      default:
        return <LayoutGrid className="w-5 h-5 text-slate-400" />;
    }
  };

  const getContainerBg = () => {
    switch (category.id) {
      case 'ai-writing':
        return 'bg-blue-900/30 text-blue-400';
      case 'image-generation':
        return 'bg-purple-900/30 text-purple-400';
      case 'video-audio':
        return 'bg-pink-900/30 text-pink-400';
      case 'productivity':
        return 'bg-emerald-900/30 text-emerald-400';
      case 'design-art':
        return 'bg-amber-900/30 text-amber-400';
      case 'code-dev':
        return 'bg-sky-900/30 text-sky-400';
      case 'business':
        return 'bg-teal-900/30 text-teal-400';
      case 'education':
        return 'bg-indigo-900/30 text-indigo-400';
      case 'others':
      default:
        return 'bg-slate-800/40 text-slate-400';
    }
  };

  return (
    <button
      onClick={() => onClick(category.slug)}
      className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0a1226]/80 dark:bg-[#0a1226]/80 light:bg-white border border-slate-800/70 dark:border-slate-800/70 light:border-slate-200/90 hover:border-blue-500/40 dark:hover:border-blue-500/40 light:hover:border-blue-500/40 hover:bg-[#0e1938] dark:hover:bg-[#0e1938] light:hover:bg-slate-50 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center w-full"
      aria-label={`Browse ${category.name}`}
    >
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5 sm:mb-3 transition-transform group-hover:scale-110 ${getContainerBg()}`}
      >
        {getIcon()}
      </div>
      <span className="text-xs sm:text-sm font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 group-hover:text-blue-400 dark:group-hover:text-blue-400 light:group-hover:text-blue-600 transition-colors">
        {category.name}
      </span>
    </button>
  );
};
