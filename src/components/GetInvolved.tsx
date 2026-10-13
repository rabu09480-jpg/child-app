import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { VolunteerFormData } from '../types';
import { HeartHandshake, CheckCircle2, Package, Sparkles, Shield, UserCheck } from 'lucide-react';
import { dbService } from '../lib/dbService.ts';

export const GetInvolved: React.FC = () => {
  const { language, t } = useI18n();

  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    phone: '',
    email: '',
    district: 'Satkhira',
    upazila: '',
    profession: 'STUDENT',
    skills: ['CHILD_LITERACY'],
    availability: 'WEEKENDS',
    motivation: '',
  });

  const [registered, setRegistered] = useState(false);
  const [selectedKit, setSelectedKit] = useState<string | null>(null);

  const availableSkills = [
    { id: 'CHILD_LITERACY', labelEn: 'Child Literacy & Teaching', labelBn: 'শিশু শিক্ষা ও পাঠদান' },
    { id: 'FIRST_AID', labelEn: 'First Aid & Health Care', labelBn: 'প্রাথমিক চিকিৎসা ও স্বাস্থ্য' },
    { id: 'DISASTER_RESCUE', labelEn: 'Cyclone Evacuation & Rescue', labelBn: 'দুর্যোগকালীন উদ্ধার তৎপরতা' },
    { id: 'COUNSELING', labelEn: 'Trauma & Child Counseling', labelBn: 'মানসিক সহায়তা ও কাউন্সিলিং' },
    { id: 'LEGAL_AID', labelEn: 'Child Marriage Prevention & Law', labelBn: 'বাল্যবিয়ে রোধ ও আইনি সহায়তা' },
  ];

  const handleSkillToggle = (skillId: string) => {
    setFormData(prev => {
      const exists = prev.skills.includes(skillId);
      if (exists) {
        return { ...prev, skills: prev.skills.filter(s => s !== skillId) };
      } else {
        return { ...prev, skills: [...prev.skills, skillId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dbService.registerVolunteer(formData);
    setRegistered(true);
  };

  return (
    <section id="get-involved" className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-1">
            <span>Community Youth Movement</span>
            <span aria-hidden="true">·</span>
            <span>{language === 'bn' ? 'স্বেচ্ছাসেবক ও অংশীদারিত্ব' : 'Join Our Network'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-2">
            {t('volunteer.title')}
          </h2>
          <p className="text-sm text-stone-600">
            {t('volunteer.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Volunteer Registration Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <h3 className="text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-700" />
              <span>{t('volunteer.formTitle')}</span>
            </h3>

            {registered ? (
              <div className="p-8 text-center text-emerald-950 bg-emerald-50 rounded-xl space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold">
                  {language === 'bn' ? 'স্বেচ্ছাসেবক আবেদন সফল হয়েছে!' : 'Volunteer Registration Completed!'}
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  {language === 'bn'
                    ? 'আমাদের উপজেলা সমন্বয়কারী আপনার মোবাইল নম্বরে খুব শীঘ্রই যোগাযোগ করবেন। শিশু অধিকার সুরক্ষার এই লড়াইয়ে আপনাকে স্বাগত।'
                    : 'Our upazila coordinator will contact your provided phone number shortly. Welcome to the child defense team!'}
                </p>
                <button
                  onClick={() => setRegistered(false)}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg"
                >
                  {language === 'bn' ? 'আরেকটি ফরম পূরণ করুন' : 'Register Another Volunteer'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('volunteer.name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === 'bn' ? 'যেমন: সাকিব আল হাসান' : 'e.g. Sakib Hasan'}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('volunteer.phone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017XXXXXXXX"
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t('volunteer.district')}
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    >
                      <option value="Satkhira">Satkhira (সাতক্ষীরা)</option>
                      <option value="Barguna">Barguna (বরগুনা)</option>
                      <option value="Bhola">Bhola (ভোলা)</option>
                      <option value="Patuakhali">Patuakhali (পটুয়াখালী)</option>
                      <option value="Bagerhat">Bagerhat (বাগেরহাট)</option>
                      <option value="Cox's Bazar">Cox's Bazar (কক্সবাজার)</option>
                      <option value="Sunamganj">Sunamganj (সুনামগঞ্জ)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {language === 'bn' ? 'উপজেলা' : 'Upazila'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.upazila}
                      onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                      placeholder={language === 'bn' ? 'আপনার উপজেলা' : 'Your Upazila'}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('volunteer.skills')}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableSkills.map((sk) => {
                      const isChecked = formData.skills.includes(sk.id);
                      return (
                        <button
                          key={sk.id}
                          type="button"
                          onClick={() => handleSkillToggle(sk.id)}
                          className={`p-2.5 rounded-lg border text-xs text-left transition-all flex items-center justify-between ${
                            isChecked
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-medium'
                              : 'border-stone-200 text-stone-600 hover:border-stone-300'
                          }`}
                        >
                          <span>{language === 'bn' ? sk.labelBn : sk.labelEn}</span>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'কাজে যুক্ত হওয়ার আগ্রহের কারণ (সংক্ষেপে)' : 'Motivation (Brief)'}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    placeholder={language === 'bn' ? 'শিশুদের অধিকার নিয়ে কাজ করার ইচ্ছা...' : 'Why you want to volunteer for coastal child rights...'}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all btn-interaction shadow-md hover:shadow-emerald-200"
                >
                  {t('volunteer.submit')}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Sponsor a Child Protection Kit */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Package className="w-4 h-4 text-amber-600" />
                <span>{t('volunteer.donorTitle')}</span>
              </div>
              <p className="text-xs text-slate-500">
                {language === 'bn'
                  ? 'উপকূলীয় চরে শিশুদের ক্লাসরুম উপকরণ ও জরুরি সুরক্ষা কিট উপহার দিন:'
                  : 'Directly support remote island children with certified education and protection kits:'}
              </p>

              {/* Kit 1 */}
              <div
                onClick={() => setSelectedKit('kit1')}
                className={`p-4 rounded-2xl border cursor-pointer card-hover transition-all ${
                  selectedKit === 'kit1' ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20' : 'border-slate-200/80 hover:border-amber-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-xs text-slate-900">
                    {t('volunteer.kit1')}
                  </h4>
                  <span className="text-xs font-extrabold text-emerald-800">৳1,500 / $15</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {language === 'bn' ? 'বইয়ের ব্যাগ, জ্যামিতি বক্স, রংপেন্সিল ও বিশুদ্ধ পানির বোতল।' : 'School bag, geometry kit, crayons, and water bottle.'}
                </p>
              </div>

              {/* Kit 2 */}
              <div
                onClick={() => setSelectedKit('kit2')}
                className={`p-4 rounded-2xl border cursor-pointer card-hover transition-all ${
                  selectedKit === 'kit2' ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20' : 'border-slate-200/80 hover:border-amber-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-xs text-slate-900">
                    {t('volunteer.kit2')}
                  </h4>
                  <span className="text-xs font-extrabold text-emerald-800">৳5,500 / $45</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  {language === 'bn' ? 'অফলাইন পাঠ্যবই এবং সেফ ব্রাউজিং ফিল্টার সংযুক্ত প্রি-লোডেড লার্নিং ট্যাব।' : 'Pre-loaded offline educational tablet with safe browsing engine.'}
                </p>
              </div>

              {/* Kit 3 */}
              <div
                onClick={() => setSelectedKit('kit3')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedKit === 'kit3' ? 'border-amber-600 bg-amber-50/50' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-xs text-stone-900">
                    {t('volunteer.kit3')}
                  </h4>
                  <span className="text-xs font-bold text-emerald-800">৳3,000 / $25</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {language === 'bn' ? 'ঘূর্ণিঝড় সতর্কতা ও ১০৯৮ যোগাযোগের সৌরচালিত রেডিও ও ফার্স্ট এইড।' : 'Solar weather warning radio and first aid kit for island schools.'}
                </p>
              </div>

              {selectedKit && (
                <div className="p-3 bg-emerald-50 rounded-lg text-xs text-emerald-950 font-medium">
                  {language === 'bn'
                    ? 'আপনার আগ্রহের জন্য ধন্যবাদ! অনুদান ও অংশীদারিত্বের জন্য যোগাযোগ করুন: partnership@childvoice.org'
                    : 'Thank you for your support! For verified institutional sponsorship, contact: partnership@childvoice.org'}
                </div>
              )}
            </div>

            {/* Institutional Trust Badges */}
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-500 space-y-2">
              <div className="font-bold text-stone-800">
                {language === 'bn' ? 'স্বচ্ছতা ও নিরীক্ষা নিশ্চয়তা:' : 'Financial Transparency & Safeguarding:'}
              </div>
              <p className="text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'প্রতিটি কিট সরাসরি স্থানীয় চাইল্ড ক্লাবের মাধ্যমে শিশুদের হাতে পৌঁছানো হয় এবং শতভাগ অডিট রিপোর্ট ওয়েবসাইটে উন্মুক্ত রাখা হয়।'
                  : 'Every single resource kit is hand-delivered through verified union child clubs with public audited records.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
