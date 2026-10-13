import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { OPERATIONAL_DISTRICTS, ASSET_IMAGES } from '../data/mockData';
import { Shield, MapPin, Users, HeartHandshake, Phone, ArrowUpRight, GraduationCap } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, t, lowBandwidthMode } = useI18n();
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(OPERATIONAL_DISTRICTS[0].id);

  const selectedDistrict = OPERATIONAL_DISTRICTS.find(d => d.id === selectedDistrictId) || OPERATIONAL_DISTRICTS[0];

  return (
    <section id="about-us" className="py-14 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#39EBFF] shadow-xs shadow-[#39EBFF]" />
            <span>Nationwide Child Protection Across Bangladesh</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'bn' ? 'আমাদের প্রত্যয়' : 'Our Story & Vision'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
            {t('about.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t('about.story')}
          </p>
        </div>

        {/* 3 Core Pillars Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 hover:border-[#39EBFF] card-hover shadow-2xs group">
            <div className="w-12 h-12 rounded-xl bg-[#39EBFF]/20 text-[#082f49] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#39EBFF] transition-all shadow-inner">
              <GraduationCap className="w-6 h-6 text-cyan-950" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2 group-hover:text-cyan-950 transition-colors">
              {t('about.pillar1')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'গাড়ির গ্যারেজ, ইটভাটা, ঝুঁকিপূর্ণ কারখানা কিংবা কৃষিক্ষেত্রে শিশুদের ঝুঁকিপূর্ণ শ্রম প্রতিরোধ করে স্কুলে নিয়মিত পাঠগ্রহণ নিশ্চিত করা।'
                : 'Eliminating hazardous child labor in auto workshops, brickfields, informal urban labor and farms, keeping every child enrolled.'}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 hover:border-[#39EBFF] card-hover shadow-2xs group">
            <div className="w-12 h-12 rounded-xl bg-[#39EBFF]/20 text-[#082f49] flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-[#39EBFF] transition-all shadow-inner">
              <Shield className="w-6 h-6 text-cyan-950" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2 group-hover:text-cyan-950 transition-colors">
              {t('about.pillar2')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'অনলাইন ক্ষতিকর কনটেন্ট ও সাইবার শোষণ থেকে শিশুদের রক্ষা এবং সারাদেশে আধুনিক নিরাপদ শিক্ষামূলক অ্যাপস পৌঁছে দেওয়া।'
                : 'Safeguarding children from digital exploitation and providing verified educational portals across all 64 districts.'}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 hover:border-rose-300 card-hover shadow-2xs group">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-rose-100 transition-all shadow-inner">
              <Phone className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-slate-900 mb-2 group-hover:text-rose-700 transition-colors">
              {t('about.pillar3')}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'সরকারি ১০৯৮ হেল্পলাইন এবং স্থানীয় প্রশাসনের সাথে সমন্বিত দেশব্যাপী সার্বক্ষণিক জরুরি সুরক্ষা নেটওয়ার্ক।'
                : 'Direct linkage with the national 1098 Child Helpline and district administrations for instantaneous emergency rescue.'}
            </p>
          </div>
        </div>

        {/* Operational Areas Interactive Hub */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {t('about.districtsTitle')}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'বাংলাদেশের বিভিন্ন বিভাগ ও অঞ্চল নির্বাচন করে স্থানীয় তথ্য ও কো-অর্ডিনেটরের যোগাযোগ দেখুন:'
                  : 'Select any regional hub to view local impact metrics and field coordinator details:'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left list of regional hubs */}
            <div className="lg:col-span-5 space-y-2.5">
              {OPERATIONAL_DISTRICTS.map((district) => {
                const isSelected = selectedDistrictId === district.id;
                return (
                  <button
                    key={district.id}
                    onClick={() => setSelectedDistrictId(district.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between card-hover ${
                      isSelected
                        ? 'border-[#39EBFF] bg-cyan-50/50 text-slate-900 shadow-xs ring-2 ring-[#39EBFF]/40'
                        : 'border-slate-200/80 bg-white hover:border-[#39EBFF] text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {language === 'bn' ? district.nameBn : district.nameEn}
                      </div>
                      <div className="text-xs text-slate-500">
                        {language === 'bn' ? district.zoneBn : district.zoneEn}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-cyan-950 block tabular-nums">
                        {district.childrenReached.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {language === 'bn' ? 'উপকৃত শিশু' : 'Children reached'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right details card for selected district */}
            <div className="lg:col-span-7 p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 space-y-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-xs font-bold text-[#082f49] uppercase tracking-wide">
                    {language === 'bn' ? selectedDistrict.zoneBn : selectedDistrict.zoneEn}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {language === 'bn' ? selectedDistrict.nameBn : selectedDistrict.nameEn} {language === 'bn' ? 'আঞ্চলিক হাব' : 'Regional Hub'}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#39EBFF]/20 text-[#082f49] font-bold text-xs rounded-xl border border-[#39EBFF]/60 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-cyan-900" />
                  <span>{language === 'bn' ? 'সক্রিয় মাঠ কার্যালয়' : 'Active Field Base'}</span>
                </div>
              </div>

              {/* Numerical Indicators */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
                  <span className="text-xs text-slate-500 block">
                    {language === 'bn' ? 'সংযুক্ত স্কুল' : 'Schools'}
                  </span>
                  <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                    {selectedDistrict.schools}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
                  <span className="text-xs text-slate-500 block">
                    {language === 'bn' ? 'স্বেচ্ছাসেবক' : 'Volunteers'}
                  </span>
                  <span className="text-lg font-bold font-mono tabular-nums text-slate-900">
                    {selectedDistrict.volunteers}
                  </span>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-center shadow-2xs">
                  <span className="text-xs text-slate-500 block">
                    {language === 'bn' ? 'উপকৃত শিশু' : 'Children'}
                  </span>
                  <span className="text-lg font-bold font-mono tabular-nums text-cyan-950">
                    {selectedDistrict.childrenReached.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Vulnerability factors */}
              <div className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 text-xs text-[#082f49] space-y-1">
                <span className="font-bold text-[#082f49] block">
                  {language === 'bn' ? 'আঞ্চলিক সুরক্ষার চ্যালেঞ্জ ও ঝুঁকি:' : 'Regional Vulnerability Factors:'}
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {language === 'bn' ? selectedDistrict.vulnerabilityFactorBn : selectedDistrict.vulnerabilityFactorEn}
                </p>
              </div>

              {/* Local coordinator */}
              <div className="p-4 bg-white rounded-xl border border-slate-200/90 flex items-center justify-between text-xs shadow-2xs">
                <div>
                  <span className="text-slate-400 block font-medium">
                    {language === 'bn' ? 'মাঠ সমন্বয়কারী কর্মকর্তা:' : 'Field Coordinator:'}
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedDistrict.localHubLead}
                  </span>
                </div>
                <a
                  href={`tel:${selectedDistrict.leadPhone}`}
                  className="px-3.5 py-2 bg-[#39EBFF]/20 hover:bg-[#39EBFF]/40 text-[#082f49] font-bold rounded-xl border border-[#39EBFF]/60 flex items-center gap-1.5 transition-all btn-interaction shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-900" />
                  <span>{selectedDistrict.leadPhone}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Field Volunteers Spotlight Card */}
        <div className="p-7 rounded-2xl bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xs">
          <div className="lg:col-span-5 rounded-xl overflow-hidden aspect-[4/3] bg-slate-200 shadow-inner">
            {!lowBandwidthMode && (
              <img
                src={ASSET_IMAGES.volunteerWorker}
                alt="Community volunteer with children in Bangladesh"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF]/20 border border-[#39EBFF]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39EBFF]" />
              <span>{language === 'bn' ? 'মাঠপর্যায়ের যুব নেতৃত্ব' : 'Youth Field Leadership'}</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              {language === 'bn' ? 'সারাদেশের তরুণরাই শিশুদের সুরক্ষার অতন্দ্র প্রহরী' : 'Empowering Bangladesh Youth as Child Rights Defenders'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {language === 'bn'
                ? 'আমাদের ৫,০০০+ নিবন্ধিত যুব স্বেচ্ছাসেবক দেশের ৮টি বিভাগের প্রতিটি উপজেলায় বাল্যবিয়ে রোধ, ঝুঁকিপূর্ণ শিশুশ্রম নিরসন, দুর্যোগের সময় শিশুদের নিরাপদ আশ্রয়ে স্থানান্তর এবং ড্রপআউট রোধে অগ্রণী ভূমিকা পালন করে চলেছেন।'
                : 'Over 5,000 registered youth leaders operate nationwide across all 8 divisions to stop early marriage, eliminate hazardous labor, assist in natural emergency relief, and ensure child schooling continuity.'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
