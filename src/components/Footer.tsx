import React from 'react';
import { useI18n } from '../i18n/i18nContext';
import { ShieldCheck, PhoneCall, Heart, Globe } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { language, t } = useI18n();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs">
      {/* Emergency quick bar */}
      <div className="bg-[#39EBFF] text-[#082f49] py-3.5 px-4 sm:px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-[#082f49] shrink-0" />
            <span className="font-extrabold text-xs sm:text-sm">
              {t('footer.emergencyNotice')}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-extrabold shrink-0">
            <a href="tel:1098" className="bg-[#082f49] text-[#39EBFF] px-3.5 py-1.5 rounded-xl hover:bg-slate-900 transition-colors shadow-xs">
              ১০৯৮ / 1098 Toll-Free
            </a>
            <a href="tel:999" className="bg-white text-slate-950 px-3.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors shadow-xs">
              ৯৯৯ / 999 Police
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-[#39EBFF] text-[#082f49] flex items-center justify-center font-bold text-xs shadow-md shadow-[#39EBFF]/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#082f49]">
                  <circle cx="12" cy="5" r="2.5" fill="currentColor" />
                  <path d="M7 13.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5v4.5a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4.5z" fill="currentColor" fillOpacity="0.3" />
                  <path d="M5 9l3 3.5" />
                  <path d="M19 9l-3 3.5" />
                </svg>
              </div>
              <span className="text-lg font-extrabold">{language === 'bn' ? 'চাইল্ড ভয়েস' : 'Child Voice'}</span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              {t('brand.tagline')}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#39EBFF] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#39EBFF]" />
              <span>{t('footer.compliance')}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              {language === 'bn' ? 'গুরুত্বপূর্ণ সেবা' : 'Core Services'}
            </span>
            <ul className="space-y-1.5 text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavClick('rights')} className="hover:text-[#39EBFF] transition-colors">
                  {t('nav.rightsHub')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('corner')} className="hover:text-[#39EBFF] transition-colors">
                  {t('nav.childCorner')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('miniapps')} className="hover:text-[#39EBFF] transition-colors">
                  {t('nav.miniApps')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('safebrowsing')} className="hover:text-[#39EBFF] transition-colors">
                  {t('nav.safeBrowsing')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('report')} className="hover:text-rose-400 transition-colors">
                  {t('nav.reportIncident')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Nationwide Field Hubs */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              {language === 'bn' ? 'দেশব্যাপী কার্যক্রম ও নেটওয়ার্ক' : 'Nationwide Field Operations'}
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              {language === 'bn'
                ? 'ঢাকা, চট্টগ্রাম, রাজশাহী, খুলনা, বরিশাল, সিলেট, রংপুর ও ময়মনসিংহ — বাংলাদেশের ৬৪ জেলার সকল উপজেলা ও গ্রামীণ জনপদে।'
                : 'Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Rangpur & Mymensingh — Active in all 64 districts across Bangladesh.'}
            </p>
            <div className="text-slate-400 text-xs pt-2">
              <span>Email: </span>
              <a href="mailto:contact@childvoice.org" className="text-[#39EBFF] hover:underline font-semibold">
                contact@childvoice.org
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            {t('footer.rights')}
          </div>
          <div className="flex items-center gap-4">
            <span>UNCRC Article 12, 19, 28 & 31</span>
            <span aria-hidden="true">·</span>
            <span>Zero-PII Child Protection Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
