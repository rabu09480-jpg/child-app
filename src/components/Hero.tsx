import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { ASSET_IMAGES } from '../data/mockData';
import { Volume2, ShieldCheck, ArrowRight, HeartHandshake, PhoneCall, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreRights: () => void;
  onVolunteer: () => void;
  onReport: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreRights, onVolunteer, onReport }) => {
  const { language, t, speakText, lowBandwidthMode } = useI18n();
  const [activePreviewTab, setActivePreviewTab] = useState<'education' | 'protection' | 'creativity'>('education');

  const handleAudioIntro = () => {
    const textToSpeak = language === 'bn'
      ? 'চাইল্ড ভয়েসে স্বাগতম। সমগ্র বাংলাদেশে প্রতিটি শিশুর কণ্ঠস্বর আমাদের অগ্রাধিকার। ৬৪ জেলার শিশুদের অধিকার শিক্ষা, নিরাপদ ইন্টারনেট এবং সুরক্ষার জাতীয় প্ল্যাটফর্ম।'
      : "Welcome to Child Voice Bangladesh. Every child's voice matters across the nation. A unified platform for child rights education, safe browsing, and community defense covering all 64 districts.";
    speakText(textToSpeak, language);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/70 border-b border-slate-200/80">
      {/* Background Soft Glow using Strict Brand Primary Accent #39EBFF */}
      <div 
        aria-hidden="true" 
        className="absolute top-10 right-1/4 w-[28rem] h-[28rem] bg-[#39EBFF]/20 rounded-full blur-3xl pointer-events-none -z-0"
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 left-5 w-80 h-80 bg-[#39EBFF]/15 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: High-Impact Editorial & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Dynamic Bilingual Badges with #39EBFF Accent */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/25 border border-[#39EBFF]/80 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#39EBFF] shadow-xs shadow-[#39EBFF]" />
                <span>{language === 'bn' ? '৬৪ জেলায় দেশব্যাপী কার্যক্রম' : 'Nationwide Across 64 Districts'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-700" />
                <span>UNCRC & Bangladesh Child Act 2013</span>
              </span>
            </div>

            {/* Display Headline with Balanced Hierarchy and #39EBFF Focal Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              {language === 'bn' ? (
                <>
                  সমগ্র বাংলাদেশে প্রতিটি শিশুর কণ্ঠস্বর{' '}
                  <span className="relative inline-block text-slate-950">
                    <span className="relative z-10">আমাদের অগ্রাধিকার</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#39EBFF]/45 -rotate-1 rounded-xs -z-0" />
                  </span>
                  ।
                </>
              ) : (
                <>
                  Every Child's Voice{' '}
                  <span className="relative inline-block text-slate-950">
                    <span className="relative z-10">Matters Across Bangladesh</span>
                    <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#39EBFF]/45 -rotate-1 rounded-xs -z-0" />
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {t('hero.subtitle')}
            </p>

            {/* Prominent CTA Buttons with #39EBFF Brand Primary */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreRights}
                className="px-6 py-3 text-sm rounded-xl btn-brand-primary flex items-center gap-2 shadow-md shadow-[#39EBFF]/30"
              >
                <span>{t('hero.exploreRightsBtn')}</span>
                <ArrowRight className="w-4 h-4 text-[#082f49]" />
              </button>

              <button
                onClick={onVolunteer}
                className="px-5 py-3 text-sm font-bold text-slate-800 bg-white border border-slate-300 hover:border-[#39EBFF] hover:bg-slate-50 rounded-xl transition-all shadow-2xs hover:-translate-y-0.5 flex items-center gap-2 btn-interaction"
              >
                <HeartHandshake className="w-4 h-4 text-cyan-600" />
                <span>{t('hero.volunteerBtn')}</span>
              </button>

              <button
                onClick={handleAudioIntro}
                className="px-4 py-3 text-sm font-semibold text-slate-800 bg-cyan-50/70 hover:bg-cyan-100/70 border border-cyan-200/80 rounded-xl transition-all flex items-center gap-2 btn-interaction"
                title="Listen to audio reading of the page introduction"
              >
                <Volume2 className="w-4 h-4 text-cyan-800" />
                <span>{t('hero.listenIntroduction')}</span>
              </button>
            </div>

            {/* Emergency Hotline Ribbon Bar */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 flex items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#39EBFF] text-[#082f49] flex items-center justify-center shrink-0 font-bold shadow-md shadow-[#39EBFF]/30">
                  <PhoneCall className="w-5 h-5 text-[#082f49]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{language === 'bn' ? 'জাতীয় সার্বক্ষণিক জরুরি শিশু সুরক্ষা হেল্পলাইন' : 'National 24/7 Child Safety Helpline'}</span>
                    <span className="text-[10px] bg-[#39EBFF] text-[#082f49] px-2 py-0.5 rounded font-extrabold uppercase">
                      1098 Free
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {t('hero.callingCard')}
                  </div>
                </div>
              </div>
              <a
                href="tel:1098"
                className="shrink-0 px-4 py-2 bg-[#39EBFF] hover:bg-[#5cf0ff] text-[#082f49] font-extrabold text-xs rounded-xl shadow-xs transition-all btn-interaction"
              >
                {language === 'bn' ? 'ডায়াল ১০৯৮' : 'Call 1098'}
              </a>
            </div>

            {/* Clean Key Protection Points */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>{language === 'bn' ? 'দেশব্যাপী গোপনীয়তা সুরক্ষা (Zero-PII)' : 'Zero-PII Privacy Protection'}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>{language === 'bn' ? '১০৯৮ জাতীয় হেল্পলাইন সংযুক্ত' : '1098 Rescue Integration'}</span>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>{language === 'bn' ? '৮ বিভাগে ফিল্ড সমন্বয়' : '8 Divisions Field Units'}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Card Stack with #39EBFF Glow Effects */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Theme Switcher Tabs for Hero Visual with #39EBFF Accent */}
            <div className="mb-3 flex items-center justify-between bg-white/90 backdrop-blur-xs p-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
              <span className="text-xs font-bold text-slate-500 pl-2">
                {language === 'bn' ? 'দেশব্যাপী মুহূর্ত:' : 'National Focus:'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActivePreviewTab('education')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activePreviewTab === 'education'
                      ? 'bg-[#39EBFF] text-[#082f49] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'bn' ? 'শিক্ষা' : 'Education'}
                </button>
                <button
                  onClick={() => setActivePreviewTab('protection')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activePreviewTab === 'protection'
                      ? 'bg-[#39EBFF] text-[#082f49] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'bn' ? 'সুরক্ষা' : 'Protection'}
                </button>
                <button
                  onClick={() => setActivePreviewTab('creativity')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    activePreviewTab === 'creativity'
                      ? 'bg-[#39EBFF] text-[#082f49] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {language === 'bn' ? 'সৃজনশীলতা' : 'Art Corner'}
                </button>
              </div>
            </div>

            {/* Main Interactive Visual Frame with #39EBFF Highlight Border */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200 hover:border-[#39EBFF] transition-all bg-white shadow-xl shadow-slate-200/50 group">
              
              {lowBandwidthMode ? (
                <div className="p-8 text-center bg-cyan-50/70 text-slate-900 flex flex-col items-center justify-center min-h-[380px]">
                  <div className="w-14 h-14 rounded-2xl bg-[#39EBFF]/40 text-[#082f49] flex items-center justify-center mb-3 shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-lg mb-1">
                    {language === 'bn' ? 'বাংলাদেশ শিশু সুরক্ষা নেটওয়ার্ক' : 'Bangladesh Child Protection Network'}
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mb-4">
                    {language === 'bn' 
                      ? 'ডাটা সাশ্রয়ী মোড সক্রিয় থাকায় সারাদেশে কম ব্যান্ডউইথে দ্রুত ব্রাউজিং নিশ্চিত করা হচ্ছে।' 
                      : 'Data Saver mode active to ensure ultra-fast nationwide browsing on 2G/3G.'}
                  </p>
                  <span className="text-xs font-bold text-[#082f49] bg-[#39EBFF] px-4 py-1.5 rounded-lg shadow-2xs">
                    {language === 'bn' ? '২৪/৭ সার্বক্ষণিক হেল্পলাইন: ১০৯৮' : '24/7 National Helpline: 1098'}
                  </span>
                </div>
              ) : (
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[430px] w-full overflow-hidden">
                  <img
                    src={
                      activePreviewTab === 'education'
                        ? ASSET_IMAGES.heroChildren
                        : activePreviewTab === 'protection'
                        ? ASSET_IMAGES.volunteerWorker
                        : ASSET_IMAGES.childrenArt
                    }
                    alt="Children of Bangladesh learning and thriving with protection and rights"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />

                  {/* Scrim with contextual information */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="text-xs font-bold tracking-wider uppercase text-[#39EBFF] mb-1">
                      {activePreviewTab === 'education' && (language === 'bn' ? 'সমগ্র বাংলাদেশ · ৬৪ জেলা' : 'Across All 64 Districts')}
                      {activePreviewTab === 'protection' && (language === 'bn' ? 'দেশব্যাপী যুব স্বেচ্ছাসেবক নেটওয়ার্ক' : 'Nationwide Volunteer Defense Network')}
                      {activePreviewTab === 'creativity' && (language === 'bn' ? 'বাংলাদেশের শিশুদের সৃজনশীল বিকাশ' : 'Creative Expression for Every Child')}
                    </div>
                    <div className="text-sm font-semibold text-slate-100 leading-snug">
                      {activePreviewTab === 'education' && (language === 'bn' ? 'বই ও আনন্দময় শৈশব প্রতিটি শিশুর সাংবিধানিক অধিকার' : 'Quality free schooling is every child’s non-negotiable right')}
                      {activePreviewTab === 'protection' && (language === 'bn' ? 'বাল্যবিয়ে ও শিশুশ্রম প্রতিরোধে প্রস্তুত ৫,০০০+ যুব স্বেচ্ছাসেবক' : '5,000+ Youth volunteers defending child rights across Bangladesh')}
                      {activePreviewTab === 'creativity' && (language === 'bn' ? 'দেশের প্রতিটি প্রান্তের শিশুদের রঙিন স্বপ্ন ও কণ্ঠস্বর সবার সামনে' : 'Amplifying children’s dreams, drawings, and stories from 8 divisions')}
                    </div>
                  </div>
                </div>
              )}

              {/* Top Floating Glass Badge with #39EBFF Live Pulse */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/90 shadow-md flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39EBFF] animate-pulse shadow-xs shadow-[#39EBFF]" />
                <span className="text-xs font-bold text-slate-900">
                  {language === 'bn' ? '১০৯৮ জাতীয় হেল্পলাইন সক্রিয়' : '1098 National Live Helpline'}
                </span>
              </div>

              {/* Bottom Floating Stats Pill with #39EBFF Accent */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 shadow-lg flex items-center gap-3 max-w-[250px]">
                <div className="w-9 h-9 rounded-xl bg-[#39EBFF] text-[#082f49] flex items-center justify-center shrink-0 font-extrabold text-sm shadow-md shadow-[#39EBFF]/30">
                  <MapPin className="w-4 h-4 text-[#082f49]" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-900 tabular-nums">
                    380,000+ {language === 'bn' ? 'শিশু উপকৃত' : 'Children Reached'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {language === 'bn' ? 'বাংলাদেশের ৬৪ জেলায় কার্যকর' : 'Active in All 64 Districts'}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
