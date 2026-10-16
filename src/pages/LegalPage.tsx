import React from 'react';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'disclaimer';
  onNavigate: (route: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const getHeader = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
          subtitle: 'Last updated: October 2026',
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="w-5 h-5 text-purple-400" />,
          subtitle: 'Last updated: October 2026',
        };
      case 'disclaimer':
      default:
        return {
          title: 'Affiliate & AI Disclaimer',
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          subtitle: 'Last updated: October 2026',
        };
    }
  };

  const header = getHeader();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Navigation tabs between legal pages */}
      <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-4">
        {[
          { label: 'Privacy Policy', path: '/privacy', key: 'privacy' },
          { label: 'Terms of Service', path: '/terms', key: 'terms' },
          { label: 'Disclaimer', path: '/disclaimer', key: 'disclaimer' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.path)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
              type === item.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {header.icon}
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Legal Transparency
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
          {header.title}
        </h1>
        <p className="text-xs text-slate-400">{header.subtitle}</p>
      </div>

      {/* Content based on type */}
      <div className="prose prose-invert max-w-none text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
        {type === 'privacy' && (
          <>
            <p>
              At <strong>AINOVEX</strong> (accessible at ainovex.pages.dev), one of our main
              priorities is the privacy of our visitors. This Privacy Policy document contains
              types of information that is collected and recorded by AINOVEX and how we use it.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you submit an AI tool or contact form, we collect your name, email address, and
              inquiry details solely for communication and editorial vetting purposes. We never sell,
              rent, or distribute your email address to third-party data brokers.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              2. Cookies & Local Storage
            </h2>
            <p>
              AINOVEX uses local browser storage exclusively for persistent user preferences, such as
              your chosen theme mode (Dark or Light) and search filters. We do not employ intrusive
              cross-site tracking cookies.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              3. Cloudflare Pages & Analytics
            </h2>
            <p>
              Our website is hosted on Cloudflare Pages. Cloudflare may process non-personally
              identifiable web traffic information (such as IP address headers, browser user agent,
              and request timestamps) to protect the site from DDoS attacks and malicious bots.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <p>
              Welcome to <strong>AINOVEX</strong>. By accessing or using our directory at
              ainovex.pages.dev, you agree to be bound by these Terms of Service.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              1. Directory Information & Accuracy
            </h2>
            <p>
              The tools, prices, specifications, and descriptions listed on AINOVEX are provided for
              informational and research purposes only. While our editorial team makes rigorous
              efforts to verify details, AI software specifications and pricing models frequently
              change. Users must verify current terms directly with each tool provider.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              2. Intellectual Property
            </h2>
            <p>
              All trademarks, product logos, and brand names mentioned on AINOVEX (such as OpenAI,
              Midjourney, Canva, Runway, Leonardo AI, Anthropic) belong to their respective copyright
              holders. Their inclusion does not imply official endorsement or affiliation.
            </p>
          </>
        )}

        {type === 'disclaimer' && (
          <>
            <p>
              Transparency is a cornerstone of the <strong>AINOVEX</strong> philosophy. Please read
              our disclosure regarding external links and editorial independence.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              1. Editorial Independence
            </h2>
            <p>
              Inclusion in our verified directory is determined solely by our editorial team&rsquo;s
              standards of utility, technical quality, and user value. No software provider can pay to
              artificially inflate their rating score or bypass our testing methodology.
            </p>
            <h2 className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-6 mb-3">
              2. External Links Notice
            </h2>
            <p>
              Our website contains links to external websites that are not provided or maintained by or
              in any way affiliated with AINOVEX. Please note that AINOVEX does not guarantee the
              accuracy, relevance, timeliness, or completeness of any information on these external
              websites.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
