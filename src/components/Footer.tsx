import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setSubscribeStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setSubscribeStatus('success');
    setStatusMessage('Thank you! You are now subscribed for AINOVEX product updates.');
    setEmail('');
  };

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'AI Tools', path: '/tools' },
    { label: 'Blog', path: '/blog' },
    { label: 'Categories', path: '/categories' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const popularCategories = [
    { label: 'AI Writing', path: '/category/ai-writing' },
    { label: 'Image Generation', path: '/category/image-generation' },
    { label: 'Video & Audio', path: '/category/video-audio' },
    { label: 'Productivity', path: '/category/productivity' },
    { label: 'Design & Art', path: '/category/design-art' },
    { label: 'Code & Dev', path: '/category/code-dev' },
    { label: 'Business', path: '/category/business' },
    { label: 'Education', path: '/category/education' },
  ];

  return (
    <footer className="w-full bg-[#040814] text-slate-300 border-t border-slate-800/80 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <button
              onClick={() => onNavigate('/')}
              className="flex flex-col items-start group text-left cursor-pointer mb-4"
              aria-label="AINOVEX Home"
            >
              <div className="flex items-center text-2xl font-black tracking-tight">
                <span className="text-blue-500">AI</span>
                <span className="text-white group-hover:text-blue-400 transition-colors">
                  NOVEX
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-slate-400 font-medium -mt-1">
                AI Tools • News • Guides • More
              </span>
            </button>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              AINOVEX is your trusted source for the best AI tools, latest news, and helpful guides.
              Boost your productivity, creativity and work smarter with the power of AI.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.path)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Popular Categories
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-sm">
              {popularCategories.map((cat) => (
                <li key={cat.label}>
                  <button
                    onClick={() => onNavigate(cat.path)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer text-left truncate block w-full"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Stay Connected
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Newsletter sign-up will open when AINOVEX launches its email list.
            </p>

            <form onSubmit={handleSubscribe} className="relative mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (subscribeStatus !== 'idle') setSubscribeStatus('idle');
                }}
                placeholder="Enter your email address"
                className="w-full bg-[#0a1124] text-white text-xs sm:text-sm pl-4 pr-11 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-blue-500 transition placeholder:text-slate-500"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
                aria-label="Submit newsletter subscription"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {subscribeStatus === 'success' && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}
            {subscribeStatus === 'error' && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mb-3">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Social Icons row: Facebook, X, YouTube, LinkedIn, Pinterest, RSS */}
            <div className="flex items-center gap-2 pt-2">
              {['Facebook', 'X', 'YouTube', 'LinkedIn', 'Pinterest', 'RSS'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#0c142b] border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-semibold transition"
                  aria-label={`Follow AINOVEX on ${social}`}
                  title={social}
                >
                  {social === 'Facebook' && 'f'}
                  {social === 'X' && '𝕏'}
                  {social === 'YouTube' && '▶'}
                  {social === 'LinkedIn' && 'in'}
                  {social === 'Pinterest' && 'P'}
                  {social === 'RSS' && '☵'}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© 2026 AINOVEX. All rights reserved.</div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('/privacy')}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('/terms')}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate('/disclaimer')}
              className="hover:text-slate-300 transition cursor-pointer"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
