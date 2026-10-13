import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { SAFE_WEB_RESOURCES, BLOCKED_KEYWORDS } from '../data/mockData';
import { SafeWebResource } from '../types';
import { Search, ShieldCheck, ShieldAlert, ExternalLink, Filter, CheckCircle2, AlertTriangle, BookOpen, Lock, Compass } from 'lucide-react';

export const SafeBrowsingEngine: React.FC = () => {
  const { language, t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Safety Simulator State
  const [testInput, setTestInput] = useState('');
  const [testResult, setTestResult] = useState<{
    status: 'SAFE' | 'BLOCKED' | 'CAUTION';
    reason: string;
    reasonBn: string;
    matchedKeywords: string[];
  } | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Portals', labelBn: 'সকল পোর্টাল' },
    { id: 'education', labelEn: 'General Education', labelBn: 'সাধারণ শিক্ষা' },
    { id: 'science', labelEn: 'Science & Nature', labelBn: 'বিজ্ঞান ও প্রকৃতি' },
    { id: 'art', labelEn: 'Creative Coding & Art', labelBn: 'কোডিং ও শিল্প' },
    { id: 'bangla_books', labelEn: 'Bangla Literature', labelBn: 'বাংলা সাহিত্য' },
    { id: 'safety', labelEn: 'Safety & UNICEF', labelBn: 'সুরক্ষা ও অধিকার' }
  ];

  const filteredResources = SAFE_WEB_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const title = (language === 'bn' ? res.titleBn : res.title).toLowerCase();
    const desc = (language === 'bn' ? res.descriptionBn : res.descriptionEn).toLowerCase();
    const matchesQuery = !searchQuery || title.includes(query) || desc.includes(query);
    return matchesCat && matchesQuery;
  });

  const handleRunSafetyAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    const lower = testInput.toLowerCase();
    const detected: string[] = [];

    BLOCKED_KEYWORDS.forEach(kw => {
      if (lower.includes(kw)) {
        detected.push(kw);
      }
    });

    // Check if whitelisted domain
    const isWhitelisted = SAFE_WEB_RESOURCES.some(r => lower.includes(new URL(r.url).hostname.replace('www.', '')));

    if (detected.length > 0) {
      setTestResult({
        status: 'BLOCKED',
        reason: `Explicit content or hazardous keyword detected: [${detected.join(', ')}]. Access is blocked for child protection.`,
        reasonBn: `নিষিদ্ধ বা শিশুদের জন্য অনুপযুক্ত শব্দ সনাক্ত হয়েছে: [${detected.join(', ')}]। শিশুদের সুরক্ষায় এই বিষয়বস্তু স্বয়ংক্রিয়ভাবে ব্লক করা হয়েছে।`,
        matchedKeywords: detected
      });
    } else if (isWhitelisted || lower.includes('edu') || lower.includes('gov') || lower.includes('school') || lower.includes('science') || lower.includes('math')) {
      setTestResult({
        status: 'SAFE',
        reason: 'Verified child-safe educational domain. Content is clean, age-appropriate, and non-exploitative.',
        reasonBn: 'যাচাইকৃত শিশুবান্ধব শিক্ষামূলক উৎস। বিষয়বস্তু নিরাপদ, পরিচ্ছন্ন এবং বিজ্ঞাপনী ঝুঁকিবিহীন।',
        matchedKeywords: []
      });
    } else {
      setTestResult({
        status: 'CAUTION',
        reason: 'Unverified external portal. Ensure guardian supervision before visiting unknown internet forums.',
        reasonBn: 'অযাচাইকৃত বাহ্যিক ঠিকানা। অজানা ওয়েবসাইটে প্রবেশের পূর্বে শিক্ষক বা অভিভাবকের মতামত নিন।',
        matchedKeywords: []
      });
    }
  };

  return (
    <section id="safe-browsing" className="py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#39EBFF] shadow-xs shadow-[#39EBFF]" />
              <span>COPPA & Child Safe Browsing Engine</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'bn' ? 'সুরক্ষিত সার্চ ও ফিল্টারিং' : 'Curated Safe Search'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {t('safeBrowsing.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {t('safeBrowsing.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 px-3.5 py-2 rounded-xl border border-[#39EBFF]/60 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-cyan-900 shrink-0" />
            <span>{language === 'bn' ? 'হোয়াইটলিস্টেড ও বিজ্ঞাপনমুক্ত' : 'Whitelisted & Ad-Free Only'}</span>
          </div>
        </div>

        {/* Live Filter / Safety Tester Simulator Banner */}
        <div className="mb-10 p-7 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              <Compass className="w-4 h-4 text-cyan-900" />
              <span>{t('safeBrowsing.filterSimulatorTitle')}</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'bn'
                ? 'শিক্ষার্থী বা অভিভাবকরা এখানে যেকোনো শব্দ বা ওয়েবসাইটের ঠিকানা লিখে পরীক্ষা করতে পারেন কেন এটি নিরাপদ বা ব্লক করা হয়েছে।'
                : 'Test any search phrase or website link in real time to simulate our student web filtering engine across Bangladesh.'}
            </p>

            <form onSubmit={handleRunSafetyAnalysis} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder={t('safeBrowsing.testerInputPlaceholder')}
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#39EBFF] focus:border-[#39EBFF] focus:bg-white focus:outline-none transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-[#082f49] bg-[#39EBFF] hover:bg-[#5cf0ff] rounded-xl transition-all btn-interaction whitespace-nowrap shadow-md shadow-[#39EBFF]/30"
              >
                {t('safeBrowsing.testBtn')}
              </button>
            </form>

            {testResult && (
              <div
                className={`mt-4 p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 shadow-2xs ${
                  testResult.status === 'SAFE'
                    ? 'bg-cyan-50/70 border-cyan-200 text-[#082f49]'
                    : testResult.status === 'BLOCKED'
                    ? 'bg-rose-50 border-rose-200 text-rose-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                {testResult.status === 'SAFE' && <CheckCircle2 className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />}
                {testResult.status === 'BLOCKED' && <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                {testResult.status === 'CAUTION' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                
                <div>
                  <div className="font-bold mb-0.5">
                    {testResult.status === 'SAFE' && (language === 'bn' ? '✅ নিরাপদ কনটেন্ট (SAFE)' : '✅ Verified Child-Safe')}
                    {testResult.status === 'BLOCKED' && (language === 'bn' ? '⛔ ঝুঁকিপূর্ণ বিষয়বস্তু - প্রবেশাধিকার নিষিদ্ধ (BLOCKED)' : '⛔ Blocked: Adult / Inappropriate Content')}
                    {testResult.status === 'CAUTION' && (language === 'bn' ? '⚠️ সতর্কতা প্রয়োজন (CAUTION)' : '⚠️ Caution: Unverified Portal')}
                  </div>
                  <div>
                    {language === 'bn' ? testResult.reasonBn : testResult.reason}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Curated Whitelist Directory Controls */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900">
              {t('safeBrowsing.whitelistedSitesTitle')}
            </h3>

            {/* In-directory search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('safeBrowsing.searchPlaceholder')}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#39EBFF] focus:border-[#39EBFF] focus:outline-none shadow-2xs"
              />
            </div>
          </div>

          {/* Category Tabs (Buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/60 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#39EBFF] text-[#082f49] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'bn' ? cat.labelBn : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Whitelisted Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-[#39EBFF] card-hover flex flex-col justify-between transition-all shadow-2xs group"
            >
              <div>
                {/* Header Tags & Score */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-[#082f49] text-[11px] bg-[#39EBFF]/20 px-2.5 py-1 rounded-full border border-[#39EBFF]/60 uppercase tracking-wide">
                    {res.badge}
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-800" />
                    <span>{res.safetyScore}/100</span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 group-hover:text-cyan-950 transition-colors">
                  {language === 'bn' ? res.titleBn : res.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {language === 'bn' ? res.descriptionBn : res.descriptionEn}
                </p>

                {/* Detail Bullet Points / Meta */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1 mb-4">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-700">{language === 'bn' ? 'উপযুক্ত বয়সসীমা:' : 'Target Age:'}</span>
                    <span className="font-bold text-slate-800">{res.minAge} – {res.maxAge} {language === 'bn' ? 'বছর' : 'years'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="font-semibold text-slate-700">{language === 'bn' ? 'নিরাপত্তা স্থিতি:' : 'Safety Status:'}</span>
                    <span className="text-cyan-950 font-bold">{language === 'bn' ? 'বিজ্ঞাপন ও ঝুঁকিমুক্ত' : 'Ad-free & Child Safe'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setTestInput(res.url);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="text-[11px] font-semibold text-slate-500 hover:text-cyan-800 transition-colors py-1 px-2 rounded-lg hover:bg-slate-50"
                  title="Test in safety analyzer"
                >
                  {language === 'bn' ? 'ফিল্টারে পরীক্ষা' : 'Test Safety'}
                </button>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#082f49] bg-[#39EBFF] hover:bg-[#5cf0ff] rounded-xl transition-all btn-interaction shadow-xs"
                >
                  <span>{language === 'bn' ? 'নিরাপদে প্রবেশ' : 'Visit Site'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#082f49]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Safe Internet Usage Guide for Children & Parents */}
        <div className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70 mb-2">
            <Lock className="w-3.5 h-3.5 text-cyan-900" />
            <span>{t('safeBrowsing.safetyGuideTitle')}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            {language === 'bn' ? 'অনলাইন নিরাপত্তা ও সাইবার সচেতনতার ৩টি সোনালী নিয়ম' : '3 Golden Rules of Online Safety for Children in Bangladesh'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? '১. ব্যক্তিগত তথ্যের সুরক্ষা' : '1. Protect Personal Privacy'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('safeBrowsing.rule1')}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? '২. অস্বস্তিকর মুহূর্তে বড়দের জানানো' : '2. Tell a Trusted Adult'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('safeBrowsing.rule2')}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="font-bold text-slate-900 text-xs">
                {language === 'bn' ? '৩. বিশ্বস্ত ওয়েবসাইট নির্বাচন' : '3. Stick to Verified Websites'}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t('safeBrowsing.rule3')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
