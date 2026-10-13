import React from 'react';
import { useI18n } from '../i18n/i18nContext';
import { Users, GraduationCap, MapPin, CheckCircle } from 'lucide-react';

export const ImpactStats: React.FC = () => {
  const { language, t } = useI18n();

  const stats = [
    {
      id: 'children',
      icon: Users,
      value: '380,000+',
      label: t('stats.children'),
      note: language === 'bn' ? 'সমগ্র বাংলাদেশের ৬৪ জেলায়' : 'Across all 64 districts nationwide',
    },
    {
      id: 'districts',
      icon: MapPin,
      value: '64',
      label: t('stats.districts'),
      note: language === 'bn' ? '৮টি বিভাগের সকল প্রশাসনিক জেলা' : 'Covering all 8 divisions of Bangladesh',
    },
    {
      id: 'workshops',
      icon: GraduationCap,
      value: '4,850',
      label: t('stats.workshops'),
      note: language === 'bn' ? 'স্কুল, মাদ্রাসা ও ইউনিয়ন পর্যায়ে' : 'In schools, madrasas & community hubs',
    },
    {
      id: 'cases',
      icon: CheckCircle,
      value: '2,850+',
      label: t('stats.casesHandled'),
      note: language === 'bn' ? '১০৯৮ ও জাতীয় প্রশাসনের সমন্বয়ে উদ্ধার' : 'Referred & rescued via 1098 & administration',
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#39EBFF] shadow-xs shadow-[#39EBFF]" />
            <span>{language === 'bn' ? 'দেশব্যাপী কার্যক্রমের পরিসংখ্যান' : 'Nationwide Verified Metrics'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('stats.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-50/80 to-white border border-slate-200/80 hover:border-[#39EBFF] card-hover shadow-2xs group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#39EBFF]/20 text-[#082f49] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#39EBFF] transition-all shadow-inner">
                    <Icon className="w-5 h-5 text-cyan-900" />
                  </div>
                  <span className="text-[10px] font-bold text-[#082f49] bg-[#39EBFF]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#39EBFF]/60">
                    National
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                  {item.value}
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">
                  {item.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.note}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
