import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { PhoneCall, ShieldAlert, Globe, Menu, X, WifiOff, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { language, toggleLanguage, t, lowBandwidthMode, setLowBandwidthMode, isSpeaking, stopSpeaking } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Emergency Helpline Ribbon */}
      <div className="bg-slate-900 text-white text-xs font-medium px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39EBFF] animate-pulse" />
            <ShieldAlert className="w-3.5 h-3.5 text-[#39EBFF] shrink-0" />
            <span className="truncate">
              {language === 'bn' 
                ? 'জাতীয় জরুরি শিশু সহায়তা (সারাদেশে): বিনামূল্যে ২৪/৭ ডায়াল করুন ১০৯৮ (চাইল্ড হেল্পলাইন) অথবা ৯৯৯' 
                : 'National Child Safety 24/7 Toll-Free: Dial 1098 (Child Helpline) or 999 Across Bangladesh'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="flex items-center gap-1 text-[#082f49] hover:bg-[#5cf0ff] text-xs px-2 py-0.5 rounded bg-[#39EBFF] font-bold transition-colors"
                title="Stop Audio"
              >
                <VolumeX className="w-3 h-3" />
                <span>{language === 'bn' ? 'অডিও বন্ধ' : 'Stop Audio'}</span>
              </button>
            )}

            <button
              onClick={() => setLowBandwidthMode((prev: boolean) => !prev)}
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded transition-colors ${
                lowBandwidthMode ? 'bg-[#39EBFF] text-[#082f49] font-bold' : 'text-slate-300 hover:text-white'
              }`}
              title="Toggle Low Bandwidth Mode for 2G/3G connections"
            >
              <WifiOff className="w-3 h-3" />
              <span className="hidden sm:inline">
                {lowBandwidthMode 
                  ? (language === 'bn' ? 'ডাটা সাশ্রয়ী সক্রিয়' : 'Data Saver ON') 
                  : (language === 'bn' ? 'ডাটা সাশ্রয়ী মোড' : 'Data Saver')}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav Links) — Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with vibrant child figure icon in #39EBFF */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group shrink-0 btn-interaction"
        >
          <div className="w-9 h-9 rounded-xl bg-[#39EBFF] text-[#082f49] flex items-center justify-center shadow-md shadow-[#39EBFF]/30 group-hover:scale-105 transition-all">
            {/* Child silhouette graphic */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#082f49]">
              <circle cx="12" cy="5" r="2.5" fill="currentColor" />
              <path d="M7 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5v4.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4.5z" fill="currentColor" fillOpacity="0.3" />
              <path d="M5 9l3 3.5" />
              <path d="M19 9l-3 3.5" />
              <path d="M9 19v3" />
              <path d="M15 19v3" />
            </svg>
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-cyan-800 transition-colors whitespace-nowrap block leading-tight">
              {language === 'bn' ? 'চাইল্ড ভয়েস' : 'Child Voice'}
            </span>
            <span className="text-[10px] text-cyan-800 font-bold tracking-wide uppercase block -mt-0.5">
              {language === 'bn' ? 'সারাদেশে শিশু অধিকার ও সুরক্ষা' : 'Bangladesh Child Rights Hub'}
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-all whitespace-nowrap hover:text-slate-900 relative py-1 ${
              activeTab === 'home' ? 'text-slate-900 font-bold' : 'hover:-translate-y-0.5'
            }`}
          >
            {t('nav.home')}
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#39EBFF] rounded-full shadow-xs shadow-[#39EBFF]" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('rights')}
            className={`transition-all whitespace-nowrap hover:text-slate-900 relative py-1 ${
              activeTab === 'rights' ? 'text-slate-900 font-bold' : 'hover:-translate-y-0.5'
            }`}
          >
            {t('nav.rightsHub')}
            {activeTab === 'rights' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#39EBFF] rounded-full shadow-xs shadow-[#39EBFF]" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('corner')}
            className={`transition-all whitespace-nowrap hover:text-slate-900 relative py-1 ${
              activeTab === 'corner' ? 'text-slate-900 font-bold' : 'hover:-translate-y-0.5'
            }`}
          >
            {t('nav.childCorner')}
            {activeTab === 'corner' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#39EBFF] rounded-full shadow-xs shadow-[#39EBFF]" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('miniapps')}
            className={`transition-all whitespace-nowrap hover:text-slate-900 relative py-1 ${
              activeTab === 'miniapps' ? 'text-slate-900 font-bold' : 'hover:-translate-y-0.5'
            }`}
          >
            {t('nav.miniApps')}
            {activeTab === 'miniapps' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#39EBFF] rounded-full shadow-xs shadow-[#39EBFF]" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('safebrowsing')}
            className={`transition-all whitespace-nowrap hover:text-slate-900 relative py-1 ${
              activeTab === 'safebrowsing' ? 'text-slate-900 font-bold' : 'hover:-translate-y-0.5'
            }`}
          >
            {t('nav.safeBrowsing')}
            {activeTab === 'safebrowsing' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#39EBFF] rounded-full shadow-xs shadow-[#39EBFF]" />
            )}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-all whitespace-nowrap hover:text-slate-900 relative py-1 ${
              activeTab === 'about' ? 'text-slate-900 font-bold' : 'hover:-translate-y-0.5'
            }`}
          >
            {t('nav.about')}
            {activeTab === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#39EBFF] rounded-full shadow-xs shadow-[#39EBFF]" />
            )}
          </button>
        </nav>

        {/* Zone 3: Primary Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-[#39EBFF] transition-all btn-interaction shadow-2xs whitespace-nowrap"
            title="Switch Language (বাংলা / English)"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Quick Direct Dial 1098 Button */}
          <a
            href="tel:1098"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 hover:bg-[#39EBFF]/40 rounded-lg transition-all btn-interaction border border-[#39EBFF]/60 shadow-2xs whitespace-nowrap"
            title="Direct call 1098 Child Helpline in Bangladesh"
          >
            <PhoneCall className="w-3.5 h-3.5 text-cyan-800" />
            <span>1098</span>
          </a>

          {/* Primary Action Button: Anonymous Report */}
          <button
            onClick={() => handleNavClick('report')}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-all btn-interaction shadow-xs hover:shadow-rose-200 hover:shadow-sm whitespace-nowrap"
          >
            {t('nav.reportIncident')}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-100"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.home')}
          </button>
          <button
            onClick={() => handleNavClick('rights')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.rightsHub')}
          </button>
          <button
            onClick={() => handleNavClick('corner')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.childCorner')}
          </button>
          <button
            onClick={() => handleNavClick('miniapps')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.miniApps')}
          </button>
          <button
            onClick={() => handleNavClick('safebrowsing')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.safeBrowsing')}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => handleNavClick('getinvolved')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-stone-100 text-stone-800"
          >
            {t('nav.getInvolved')}
          </button>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
            <a
              href="tel:1098"
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-100 rounded-md"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? '১০৯৮ শিশু হেল্পলাইন' : 'Dial 1098'}</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-xs font-semibold rounded-md border border-stone-300 text-stone-700"
            >
              {language === 'bn' ? 'English' : 'বাংলা'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
