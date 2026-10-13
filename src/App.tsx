/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { I18nProvider, useI18n } from './i18n/i18nContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactStats } from './components/ImpactStats';
import { RightsHub } from './components/RightsHub';
import { ChildCorner } from './components/ChildCorner';
import { QuizApp } from './components/QuizApp';
import { EmergencyReportForm } from './components/EmergencyReportForm';
import { StorybookReader } from './components/StorybookReader';
import { SafeBrowsingEngine } from './components/SafeBrowsingEngine';
import { AboutSection } from './components/AboutSection';
import { GetInvolved } from './components/GetInvolved';
import { Footer } from './components/Footer';
import { BookOpen, ShieldAlert, Award, Sparkles, Compass, HeartHandshake } from 'lucide-react';

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const { language, t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-[#39EBFF]/30 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onExploreRights={() => setActiveTab('rights')}
              onVolunteer={() => setActiveTab('getinvolved')}
              onReport={() => setActiveTab('report')}
            />

            {/* Impact Metrics Strip */}
            <ImpactStats />

            {/* Rights Overview Section */}
            <RightsHub />

            {/* Featured Mini-Apps Showcase Strip */}
            <section className="py-14 bg-white border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#39EBFF] shadow-xs shadow-[#39EBFF]" />
                    <span>{language === 'bn' ? 'ডিজিটাল সেবা ও মিনি অ্যাপস' : 'Digital Services & Tools'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {language === 'bn' ? 'শিশুদের জন্য উদ্ভাবনী প্রযুক্তি' : 'Child-Centered Digital Innovations'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {language === 'bn'
                      ? 'গেমিফাইড অধিকার শিক্ষা, সম্পূর্ণ গোপনীয় অভিযোগ এবং নিরাপদ ইন্টারনেট ব্রাউজিং'
                      : 'Interactive quiz certificates, confidential incident reporting, and verified safe web filter'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Quiz */}
                  <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 hover:border-[#39EBFF] card-hover shadow-2xs flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#39EBFF]/20 text-[#082f49] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#39EBFF] transition-all shadow-inner">
                          <Award className="w-6 h-6 text-cyan-900" />
                        </div>
                        <span className="text-[10px] font-bold text-[#082f49] bg-[#39EBFF]/25 px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#39EBFF]/60">
                          {language === 'bn' ? 'ই-সনদপত্র' : 'e-Certificate'}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-cyan-950 transition-colors">
                        {language === 'bn' ? 'শিশু অধিকার চ্যাম্পিয়ন কুইজ' : 'Rights Defender Quiz Game'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {language === 'bn'
                          ? 'মজার খেলার ছলে অধিকার ও সুরক্ষা শিখো এবং নিজের নামে অফিসিয়াল সার্টিফিকেট ডাউনলোড করো।'
                          : 'Test your safety knowledge, score points with our dolphin mascot, and earn a verified e-Certificate.'}
                      </p>
                      <div className="text-[11px] text-slate-500 space-y-1 mb-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#39EBFF]" />
                          <span>{language === 'bn' ? '৫টি সচেতনতামূলক প্রশ্ন' : '5 Awareness questions'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#39EBFF]" />
                          <span>{language === 'bn' ? 'প্রিন্টযোগ্য অফিসিয়াল সনদ' : 'Printable PDF/PNG Certificate'}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('miniapps')}
                      className="w-full py-2.5 px-4 text-xs font-bold text-[#082f49] bg-[#39EBFF] hover:bg-[#5cf0ff] rounded-xl transition-all btn-interaction shadow-md shadow-[#39EBFF]/30 text-center"
                    >
                      {language === 'bn' ? 'কুইজ খেলুন ও সনদ নিন' : 'Start Quiz & Get Certificate'}
                    </button>
                  </div>

                  {/* Card 2: Anonymous Report */}
                  <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 hover:border-rose-300 card-hover shadow-2xs flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-rose-100 transition-all shadow-inner">
                          <ShieldAlert className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-rose-200/60">
                          {language === 'bn' ? '১০০% গোপনীয়' : '100% Anonymous'}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-rose-700 transition-colors">
                        {language === 'bn' ? 'গোপন শিশু নির্যাতন ও বাল্যবিয়ে রিপোর্ট' : 'Anonymous Safety Reporting'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {language === 'bn'
                          ? 'কোনো লগইন ছাড়া গোপনীয়ভাবে বাল্যবিয়ে ও শিশুশ্রম রিপোর্ট করুন। জিপিএস মুছে নিরাপত্তা নিশ্চিত করা হয়।'
                          : 'Zero-login confidential incident reporting with client-side EXIF wiping and tracking code.'}
                      </p>
                      <div className="text-[11px] text-slate-500 space-y-1 mb-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span>{language === 'bn' ? 'স্বয়ংক্রিয় মেটাডাটা ও চেহারা ব্লার' : 'Auto EXIF strip & face blur'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                          <span>{language === 'bn' ? '১০৯৮ হেল্পলাইনে সরাসরি প্রেরণ' : 'Direct linkage to 1098'}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('report')}
                      className="w-full py-2.5 px-4 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all btn-interaction shadow-2xs text-center"
                    >
                      {language === 'bn' ? 'গোপন রিপোর্ট জমা দিন' : 'Submit Confidential Report'}
                    </button>
                  </div>

                  {/* Card 3: Safe Browsing */}
                  <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 hover:border-[#39EBFF] card-hover shadow-2xs flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#39EBFF]/20 text-[#082f49] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#39EBFF] transition-all shadow-inner">
                          <Compass className="w-6 h-6 text-cyan-900" />
                        </div>
                        <span className="text-[10px] font-bold text-[#082f49] bg-[#39EBFF]/25 px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#39EBFF]/60">
                          {language === 'bn' ? 'হোয়াইটলিস্ট' : 'Whitelisted'}
                        </span>
                      </div>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-cyan-950 transition-colors">
                        {language === 'bn' ? 'শিশুদের নিরাপদ ব্রাউজিং ইঞ্জিন' : 'Kid-Safe Web Filter'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {language === 'bn'
                          ? 'অনলাইন ক্ষতিকর কনটেন্ট ফিল্টার এবং খান একাডেমি ও মুক্তপাঠের মতো নিরাপদ শিক্ষামূলক লিংক।'
                          : 'Interactive safety tester simulator and curated educational whitelist protecting kids online.'}
                      </p>
                      <div className="text-[11px] text-slate-500 space-y-1 mb-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#39EBFF]" />
                          <span>{language === 'bn' ? 'লাইভ ফিল্টারিং অ্যানালাইজার' : 'Live Filter Analysis Simulator'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#39EBFF]" />
                          <span>{language === 'bn' ? 'বিজ্ঞাপন ও ঝুঁকিমুক্ত পাঠশালা' : 'Curated Ad-Free Portals'}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('safebrowsing')}
                      className="w-full py-2.5 px-4 text-xs font-bold text-[#082f49] bg-white border border-slate-300 hover:border-[#39EBFF] hover:bg-slate-50 rounded-xl transition-all btn-interaction shadow-2xs text-center"
                    >
                      {language === 'bn' ? 'সেফ ব্রাউজিং ব্যবহার করুন' : 'Explore Safe Web Portal'}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Children's Creative Corner */}
            <ChildCorner />

            {/* Nationwide Child Safety Comics & Storybook */}
            <section className="py-14 bg-slate-50 border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#39EBFF] shadow-xs shadow-[#39EBFF]" />
                    <span>{language === 'bn' ? 'সচিত্র কমিকস ও ডিজিটাল গল্প' : 'Awareness Comics & Reader'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {language === 'bn' ? 'আনন্দময় শিক্ষার গল্পমালা' : 'Interactive Child Safety Stories'}
                  </h2>
                </div>
                <StorybookReader />
              </div>
            </section>

            {/* About Us & Nationwide Operations */}
            <AboutSection />

            {/* Get Involved Section */}
            <GetInvolved />
          </div>
        )}

        {activeTab === 'rights' && (
          <div className="py-6">
            <RightsHub />
          </div>
        )}

        {activeTab === 'corner' && (
          <div className="py-6">
            <ChildCorner />
          </div>
        )}

        {activeTab === 'miniapps' && (
          <div className="py-10 bg-stone-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wide mb-1">
                  <span>Child Voice Digital Suite</span>
                  <span aria-hidden="true">·</span>
                  <span>{language === 'bn' ? 'মিনি অ্যাপস' : 'Interactive Services'}</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900">
                  {language === 'bn' ? 'ডিজিটাল সেবা ও ইন্টার‍্যাক্টিভ টুলস' : 'Digital Services & Child Tools'}
                </h1>
                <p className="text-sm text-stone-600 mt-1">
                  {language === 'bn'
                    ? 'কুইজ খেলে সনদপত্র নেওয়া, ডিজিটাল কমিকস পাঠ এবং গোপনীয় নিরাপত্তা রিপোর্ট করার সমন্বিত প্ল্যাটফর্ম।'
                    : 'Gamified child rights education, digital storybooks, and anonymous reporting in one place.'}
                </p>
              </div>

              {/* 1. Quiz Game */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                    ১
                  </span>
                  <h3 className="font-bold text-lg text-stone-900">
                    {language === 'bn' ? 'শিশু অধিকার চ্যাম্পিয়ন কুইজ গেম' : 'Child Rights Quiz Game'}
                  </h3>
                </div>
                <QuizApp />
              </div>

              {/* 2. Interactive Comics Flipbook */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center">
                    ২
                  </span>
                  <h3 className="font-bold text-lg text-stone-900">
                    {language === 'bn' ? 'ডিজিটাল স্টোরিবুক ও সেফটি কমিকস রিডার' : 'Safety Comics & Storybook Reader'}
                  </h3>
                </div>
                <StorybookReader />
              </div>

              {/* 3. Anonymous Reporting Form */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center">
                    ৩
                  </span>
                  <h3 className="font-bold text-lg text-stone-900">
                    {language === 'bn' ? 'গোপনীয় শিশু সুরক্ষা ও নির্যাতন রিপোর্ট' : 'Anonymous Safety & Violation Report'}
                  </h3>
                </div>
                <EmergencyReportForm />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'safebrowsing' && (
          <div className="py-6">
            <SafeBrowsingEngine />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="py-6">
            <AboutSection />
          </div>
        )}

        {activeTab === 'getinvolved' && (
          <div className="py-6">
            <GetInvolved />
          </div>
        )}

        {activeTab === 'report' && (
          <div className="py-10 bg-stone-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <EmergencyReportForm />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <MainContent />
    </I18nProvider>
  );
}
