import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'submit-tool',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide a message with at least 15 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate submission
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', topic: 'submit-tool', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
          Contact AINOVEX & Submit Tools
        </h1>
        <p className="text-sm text-slate-400">
          Have an AI tool you want reviewed? Spotted outdated documentation? Or want to propose a
          collaboration? Let us know below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 mb-2">
              Tool Submissions
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              We review new artificial intelligence software weekly. Please include tool website,
              pricing model, and primary differentiator.
            </p>
            <div className="text-xs text-blue-400 font-semibold">
              editorial@ainovex.pages.dev
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200">
            <h3 className="text-sm font-bold text-white dark:text-white light:text-slate-900 mb-2">
              Response Time
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our editorial and verification team typically responds within 24 to 48 business hours.
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-[#080f21] border border-emerald-900/40 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-900/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for contacting AINOVEX. Our team will review your inquiry and follow up at{' '}
                <strong className="text-white">{formData.email}</strong> shortly.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-3xl bg-[#0a1228]/85 dark:bg-[#0a1228]/85 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 space-y-5 shadow-lg"
              noValidate
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-white dark:text-white light:text-slate-900 px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    errors.name ? 'border-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2"
                >
                  Your Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className={`w-full bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-white dark:text-white light:text-slate-900 px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition ${
                    errors.email ? 'border-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor="contact-topic"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2"
                >
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-white dark:text-white light:text-slate-900 px-4 py-2.5 rounded-xl border border-slate-700/80 focus:border-blue-500 text-sm focus:outline-none transition cursor-pointer"
                >
                  <option value="submit-tool">Submit a New AI Tool for Review</option>
                  <option value="update-listing">Request Tool Info Update</option>
                  <option value="partnership">Editorial & Research Collaboration</option>
                  <option value="feedback">Website Feedback or Bug Report</option>
                  <option value="other">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the tool, query, or feedback in detail..."
                  className={`w-full bg-[#060c1d] dark:bg-[#060c1d] light:bg-slate-50 text-white dark:text-white light:text-slate-900 p-4 rounded-xl border text-sm focus:outline-none transition ${
                    errors.message ? 'border-rose-500' : 'border-slate-700/80 focus:border-blue-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
