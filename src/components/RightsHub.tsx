import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { CHILD_RIGHTS_ARTICLES } from '../data/mockData';
import { BookOpen, ShieldCheck, HeartPulse, Mic, Sparkles, LifeBuoy, Volume2, Search, Info } from 'lucide-react';

export const RightsHub: React.FC = () => {
  const { language, t, speakText, isSpeaking, stopSpeaking } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(CHILD_RIGHTS_ARTICLES[0].id);

  const iconMap: Record<string, React.ElementType> = {
    BookOpen,
    ShieldCheck,
    HeartPulse,
    Mic,
    Sparkles,
    LifeBuoy
  };

  const filteredArticles = CHILD_RIGHTS_ARTICLES.filter(item => {
    const q = searchQuery.toLowerCase();
    const title = language === 'bn' ? item.titleBn : item.titleEn;
    const summary = language === 'bn' ? item.summaryBn : item.summaryEn;
    return title.toLowerCase().includes(q) || summary.toLowerCase().includes(q);
  });

  const handleSpeakArticle = (article: typeof CHILD_RIGHTS_ARTICLES[0]) => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const text = language === 'bn' 
      ? `${article.titleBn}। ${article.summaryBn}। আইনি ধারা: ${article.legalReferenceBn}। আপনার করণীয়: ${article.actionAdviceBn}`
      : `${article.titleEn}. ${article.summaryEn}. Legal rule: ${article.legalReferenceEn}. Action advice: ${article.actionAdviceEn}`;
    speakText(text, language);
  };

  return (
    <section id="rights-hub" className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex items-start gap-4">
            {/* Prominent circular icon container with light cyan background matching brand aesthetic */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200/90 flex items-center justify-center shrink-0 shadow-xs">
              <Info className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-1">
                <span>UNCRC & Bangladesh Child Act 2013</span>
                <span aria-hidden="true">·</span>
                <span>{language === 'bn' ? 'মৌলিক শিশু অধিকার' : 'Universal Inherent Rights'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {t('rights.title')}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {t('rights.subtitle')}
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72 self-start md:self-auto mt-2 md:mt-0">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'অধিকার বা বিষয় খুঁজুন...' : 'Search rights topics...'}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Rights Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => {
            const Icon = iconMap[article.iconName] || BookOpen;
            const isSelected = selectedArticleId === article.id;

            return (
              <div
                key={article.id}
                onClick={() => setSelectedArticleId(article.id)}
                className={`flex flex-col justify-between p-6 rounded-2xl bg-white border card-hover transition-all cursor-pointer shadow-2xs group ${
                  isSelected 
                    ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md' 
                    : 'border-slate-200/80 hover:border-emerald-300'
                }`}
              >
                <div>
                  {/* Card Top: Icon & Article Number Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100 transition-all shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      {article.articleNumber}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
                    {language === 'bn' ? article.titleBn : article.titleEn}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {language === 'bn' ? article.summaryBn : article.summaryEn}
                  </p>

                  {/* Structured Details: Law Reference & Action Advice with tags */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="text-slate-600 flex items-start gap-1.5">
                      <span className="font-bold text-slate-800 shrink-0">
                        {t('rights.legalReference')}
                      </span>
                      <span className="text-slate-500">
                        {language === 'bn' ? article.legalReferenceBn : article.legalReferenceEn}
                      </span>
                    </div>

                    <div className="text-emerald-950 bg-emerald-50/80 p-3 rounded-xl border border-emerald-100/80 mt-2 space-y-1">
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{t('rights.whatToDo')}</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 leading-relaxed">
                        {language === 'bn' ? article.actionAdviceBn : article.actionAdviceEn}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Buttons (Audio & Learn More) */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {language === 'bn' ? '১০৯৮ হেল্পলাইন' : 'Helpline 1098'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeakArticle(article);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 hover:bg-emerald-200 rounded-lg transition-all btn-interaction shadow-2xs"
                      title="Audio narration for children"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{t('rights.readAloud')}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Callout Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-cyan-50/50 via-white to-slate-50 border border-cyan-200/80 flex items-start gap-4 shadow-2xs">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200 flex items-center justify-center shrink-0 shadow-xs">
            <Info className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-900 block mb-1">
              {language === 'bn' ? 'শিশুর অধিকার কারো করুণা নয়, এটি আইনসিদ্ধ ও সাংবিধানিক:' : 'Child Rights Are Inherent, Non-Negotiable and Constitutionally Guaranteed:'}
            </span>
            {language === 'bn'
              ? 'জাতিসংঘের শিশু অধিকার সনদ ১৯৯০ সালে বাংলাদেশ প্রথম স্বাক্ষরকারী দেশগুলোর একটি। পরিবার, সমাজ ও রাষ্ট্রের দায়িত্ব প্রতিটি শিশুর নিরাপত্তা, শিক্ষা ও সুন্দর ভবিষ্যৎ নিশ্চিত করা।'
              : 'Bangladesh was one of the earliest signatories to ratify the UNCRC in 1990. Every community leader, teacher, and law enforcement officer is legally obliged to safeguard child welfare.'}
          </div>
        </div>

      </div>
    </section>
  );
};
