import React from 'react';
import { ShieldCheck, Target, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About AINOVEX</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white dark:text-white light:text-slate-900 tracking-tight">
          Empowering Creators & Builders with Curated AI
        </h1>
        <p className="text-base text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed">
          AINOVEX was founded to cut through the noise of thousands of ephemeral AI wrappers and
          spotlight the genuine frontier tools that meaningfully accelerate productivity and
          creativity.
        </p>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2">
            Rigorous Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Every tool listed on AINOVEX is tested against real-world benchmarks for reliability,
            privacy practices, API stability, and genuine functional merit.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-900/30 text-purple-400 flex items-center justify-center mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2">
            No Sponsored Bias
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Rankings and editorial reviews reflect authentic software performance rather than pay-to-play
            sponsorships. We maintain strict independence.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-900/30 text-emerald-400 flex items-center justify-center mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white dark:text-white light:text-slate-900 mb-2">
            Workflow-First Thinking
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            We review tools within context: how they integrate into actual design sprints, codebases,
            video pipelines, and business workflows.
          </p>
        </div>
      </div>

      {/* Editorial Standards List */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#080f21] border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white dark:text-white light:text-slate-900">
          Our Vetting & Curation Methodology
        </h2>
        <div className="space-y-4">
          {[
            {
              title: '1. Model Architecture & Origin',
              desc: 'We verify whether a product brings unique model capabilities, fine-tuning, or robust cognitive architecture rather than a superficial wrapper.',
            },
            {
              title: '2. Data Privacy & Model Training Boundaries',
              desc: 'We inspect whether customer inputs are opted-out of foundational training data and adhere to modern enterprise security baselines.',
            },
            {
              title: '3. Real-World Speed & Uptime Reliability',
              desc: 'We benchmark token throughput, inference latency, rendering speeds, and customer support responsiveness.',
            },
            {
              title: '4. Transparent Pricing & Tier Clarity',
              desc: 'We penalize hidden subscription hooks and celebrate tools offering generous free tiers or straightforward seat licenses.',
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('/tools')}
          className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 transition cursor-pointer"
        >
          Explore Curated AI Directory
        </button>
      </div>
    </div>
  );
};
