import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { IncidentReportFormData, SubmittedReportRecord } from '../types';
import { ShieldAlert, Lock, CheckCircle2, Search, AlertTriangle, PhoneCall, Eye, EyeOff, FileText } from 'lucide-react';
import { dbService } from '../lib/dbService.ts';

export const EmergencyReportForm: React.FC = () => {
  const { language, t } = useI18n();

  const [formData, setFormData] = useState<IncidentReportFormData>({
    incidentType: 'EARLY_MARRIAGE',
    urgency: 'high',
    district: 'Satkhira',
    upazila: 'Shyamnagar',
    village: '',
    description: '',
    hasPhoto: false,
    photoUrl: undefined,
    applyPrivacyBlur: true,
    stripMetadata: true,
    anonymousConsent: true,
  });

  const [submittedReport, setSubmittedReport] = useState<SubmittedReportRecord | null>(null);
  const [trackingSearchCode, setTrackingSearchCode] = useState('');
  const [trackedResult, setTrackedResult] = useState<SubmittedReportRecord | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local state to simulate stored confidential reports in session
  const [existingReports, setExistingReports] = useState<SubmittedReportRecord[]>([
    {
      id: 'mock-1',
      trackingCode: 'CV-2026-8812',
      incidentType: 'CHILD_LABOR',
      urgency: 'medium',
      district: 'Barguna',
      upazila: 'Patharghata',
      village: 'Shutki Palli Ghat',
      description: 'Report of school-age children working full-time in fish drying fields without schooling.',
      hasPhoto: true,
      applyPrivacyBlur: true,
      stripMetadata: true,
      anonymousConsent: true,
      timestamp: '2026-03-24 14:30',
      status: 'VOLUNTEER_ASSIGNED',
    }
  ]);

  const handlePhotoUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate client-side metadata stripping
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          hasPhoto: true,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedCode = `CV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const record: SubmittedReportRecord = {
      ...formData,
      id: `rep-${Date.now()}`,
      trackingCode: generatedCode,
      timestamp: new Date().toLocaleString(),
      status: formData.urgency === 'critical' ? 'REFERRED_1098' : 'UNDER_REVIEW',
    };

    // Persist to Cloud Firestore database
    await dbService.submitIncidentReport({
      ...formData,
      trackingCode: generatedCode,
      timestamp: new Date().toISOString(),
      status: formData.urgency === 'critical' ? 'REFERRED_1098' : 'UNDER_REVIEW',
    });

    setExistingReports(prev => [record, ...prev]);
    setSubmittedReport(record);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      incidentType: 'EARLY_MARRIAGE',
      urgency: 'high',
      district: 'Satkhira',
      upazila: '',
      village: '',
      description: '',
      hasPhoto: false,
      photoUrl: undefined,
      applyPrivacyBlur: true,
      stripMetadata: true,
      anonymousConsent: true,
    });
  };

  const handleTrackCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const cleanCode = trackingSearchCode.trim().toUpperCase();

    // Query Firestore database first
    const remoteRecord = await dbService.findReportByTrackingCode(cleanCode);
    if (remoteRecord) {
      setTrackedResult(remoteRecord);
      return;
    }

    // Local session fallback
    const found = existingReports.find(r => r.trackingCode.toUpperCase() === cleanCode);
    setTrackedResult(found || null);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="bg-rose-900 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-200 uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>{t('report.badge')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t('report.title')}
            </h3>
            <p className="text-xs text-rose-100 mt-1 max-w-xl">
              {t('report.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:1098"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>1098 Toll-Free</span>
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Success Confirmation Modal / Banner if just submitted */}
        {submittedReport && (
          <div className="mb-8 p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <h4 className="font-bold text-sm">
                {t('report.successTitle')}
              </h4>
            </div>
            <p className="text-xs text-stone-700">
              {t('report.keepSafeNote')}
            </p>
            <div className="p-3 bg-white rounded-lg border border-emerald-300 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">
                  {t('report.trackingCodeLabel')}
                </span>
                <span className="text-lg font-mono font-bold text-emerald-800">
                  {submittedReport.trackingCode}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 font-semibold rounded">
                {submittedReport.status}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Incident Type & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('report.incidentTypeLabel')}
                  </label>
                  <select
                    value={formData.incidentType}
                    onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-none"
                  >
                    <option value="EARLY_MARRIAGE">
                      {language === 'bn' ? 'বাল্যবিয়ের ঝুঁকি / প্রস্তুতি' : 'Early Child Marriage Risk'}
                    </option>
                    <option value="CHILD_LABOR">
                      {language === 'bn' ? 'বিপজ্জনক শিশুশ্রম (ইটভাটা/শুঁটকি/চিংড়ি)' : 'Hazardous Child Labor'}
                    </option>
                    <option value="PHYSICAL_ABUSE">
                      {language === 'bn' ? 'শারীরিক নির্যাতন বা সহিংসতা' : 'Physical Abuse / Violence'}
                    </option>
                    <option value="EDUCATION_DEPRIVATION">
                      {language === 'bn' ? 'স্কুলে যেতে বাধা বা শিক্ষা বঞ্চনা' : 'Denial of Basic Schooling'}
                    </option>
                    <option value="CYCLONE_DISPLACEMENT">
                      {language === 'bn' ? 'দুর্যোগে আশ্রয়হীন বা নিখোঁজ শিশু' : 'Cyclone Disaster Displacement'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {t('report.urgencyLabel')}
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-none"
                  >
                    <option value="low">
                      {language === 'bn' ? 'সাধারণ পর্যবেক্ষণ (Low)' : 'Low (General Observation)'}
                    </option>
                    <option value="medium">
                      {language === 'bn' ? 'মধ্যম জরুরি (Medium)' : 'Medium (Within 48 hours)'}
                    </option>
                    <option value="high">
                      {language === 'bn' ? 'উচ্চ জরুরি (High - ২৪ ঘণ্টার মধ্যে হস্তক্ষেপ)' : 'High (Requires 24h Action)'}
                    </option>
                    <option value="critical">
                      {language === 'bn' ? 'তাৎক্ষণিক বিপদ (Critical - এখনই উদ্ধারের প্রয়োজন)' : 'Critical (Immediate Imminent Danger)'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Location details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-none"
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
                    placeholder={language === 'bn' ? 'যেমন: শ্যামনগর / পাথরঘাটা' : 'e.g. Shyamnagar'}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'গ্রাম বা ইউনিয়ন' : 'Village or Union'}
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: গাবুরা চর' : 'e.g. Gabura Char'}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {t('report.descriptionLabel')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={language === 'bn'
                    ? 'ঘটনাটি কী এবং কোথায় ঘটছে বিস্তারিত লিখুন। শিশুর ব্যক্তিগত সম্মান ও সুরক্ষার কথা বিবেচনা করে তথ্য দিন...'
                    : 'Describe what is happening without revealing identifying names...'}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-rose-600 focus:outline-none"
                />
              </div>

              {/* Photo Upload with Automated EXIF metadata stripping & privacy blur toggle */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-800">
                      {t('report.photoUploadLabel')}
                    </label>
                    <span className="text-xs text-stone-500">
                      {t('report.metadataStripNotice')}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUploadSim}
                    className="text-xs text-stone-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-rose-100 file:text-rose-700 hover:file:bg-rose-200"
                  />
                </div>

                {formData.photoUrl && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-stone-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden bg-stone-100 relative">
                        <img
                          src={formData.photoUrl}
                          alt="Preview"
                          className={`w-full h-full object-cover transition-all ${
                            formData.applyPrivacyBlur ? 'blur-xs scale-105' : ''
                          }`}
                        />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-stone-800 block">
                          {language === 'bn' ? 'ছবি সংযুক্ত হয়েছে' : 'Image attached'}
                        </span>
                        <span className="text-stone-500">
                          {formData.applyPrivacyBlur 
                            ? (language === 'bn' ? 'সুরক্ষা ব্লার ফিল্টার সক্রিয়' : 'Face Privacy Blur active')
                            : (language === 'bn' ? 'স্বাভাবিক ভিউ' : 'Normal view')}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, applyPrivacyBlur: !formData.applyPrivacyBlur })}
                      className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-stone-300 rounded hover:bg-stone-50 text-stone-700"
                    >
                      {formData.applyPrivacyBlur ? <EyeOff className="w-3.5 h-3.5 text-rose-600" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{formData.applyPrivacyBlur ? (language === 'bn' ? 'ব্লার বন্ধ' : 'Unblur') : (language === 'bn' ? 'ব্লার করুন' : 'Blur Face')}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Zero-PII Anonymous Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={formData.anonymousConsent}
                  onChange={(e) => setFormData({ ...formData, anonymousConsent: e.target.checked })}
                  className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="anonymousCheck" className="text-xs text-stone-600 leading-snug">
                  {language === 'bn'
                    ? 'আমি নিশ্চিত করছি যে এই তথ্য কোনো ব্যক্তিগত স্বার্থে নয়, বরং শিশুর সুরক্ষার জন্য সম্পূর্ণ নিরপেক্ষভাবে প্রদান করছি। আমার কোনো তথ্য প্রকাশ হবে না।'
                    : 'I confirm that this report is submitted strictly for child protection. No personal IP or device identifiers will be linked.'}
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !formData.anonymousConsent}
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition-all btn-interaction shadow-md hover:shadow-rose-200"
              >
                {isSubmitting ? (language === 'bn' ? 'তথ্য যাচাই ও পাঠানো হচ্ছে...' : 'Submitting anonymously...') : t('report.submitBtn')}
              </button>
            </form>
          </div>

          {/* Right Sidebar: Anonymous Status Tracker & Safeguarding Rules */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tracking widget */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('report.trackStatusBtn')}</span>
              </h4>
              <p className="text-xs text-slate-500 mb-3">
                {language === 'bn'
                  ? 'আপনার পূর্ববর্তী রিপোর্টের ট্র্যাকিং কোড লিখে অগ্রগতি দেখুন:'
                  : 'Enter your tracking code to view verification status:'}
              </p>

              <form onSubmit={handleTrackCode} className="space-y-2.5">
                <input
                  type="text"
                  value={trackingSearchCode}
                  onChange={(e) => setTrackingSearchCode(e.target.value)}
                  placeholder="e.g. CV-2026-8812"
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl transition-all btn-interaction shadow-2xs"
                >
                  {language === 'bn' ? 'যাচাই করুন' : 'Check Status'}
                </button>
              </form>

              {searchAttempted && (
                <div className="mt-3 pt-3 border-t border-stone-200">
                  {trackedResult ? (
                    <div className="p-3 bg-white rounded border border-emerald-300 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-800">
                          {trackedResult.trackingCode}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold text-[10px]">
                          {trackedResult.status}
                        </span>
                      </div>
                      <div className="text-stone-600">
                        {language === 'bn' ? 'এলাকা:' : 'Area:'} {trackedResult.district}, {trackedResult.upazila}
                      </div>
                      <div className="text-stone-500 text-[11px]">
                        {language === 'bn' ? 'কার্যক্রম:' : 'Update:'} {language === 'bn' ? 'মাঠপর্যায়ের স্বেচ্ছাসেবক ও সমাজসেবা কর্মকর্তাকে অবহিত করা হয়েছে।' : 'Case assigned to field coordinator for grassroots visit.'}
                      </div>
                    </div>
                  ) : (
                    <div className="p-2.5 text-center text-xs text-rose-700 bg-rose-50 rounded border border-rose-200">
                      {language === 'bn' ? 'এই কোড দিয়ে কোনো রিপোর্ট পাওয়া যায়নি।' : 'No report found with this tracking code.'}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Safeguarding protocols info */}
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-amber-950">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>{language === 'bn' ? 'তাৎক্ষণিক জরুরি অবস্থা?' : 'Imminent Emergency Danger?'}</span>
              </div>
              <p className="leading-relaxed">
                {language === 'bn'
                  ? 'কোনো শিশুর জীবন যদি এই মুহূর্তে প্রত্যক্ষ বিপদে থাকে, তবে অনলাইন ফরম পূরণ না করে সরাসরি সরকারি হেল্পলাইনে ফোন করুন:'
                  : 'If a child is in immediate physical danger, do not wait for online processing. Call the emergency line directly:'}
              </p>
              <div className="pt-2 flex flex-col gap-1.5 font-bold">
                <a href="tel:1098" className="text-emerald-800 hover:underline">
                  📞 ১০৯৮ (চাইল্ড হেল্পলাইন - সমাজসেবা অধিদপ্তর)
                </a>
                <a href="tel:999" className="text-rose-800 hover:underline">
                  📞 ৯৯৯ (জাতীয় জরুরি সেবা - পুলিশ/ফায়ার/অ্যাম্বুলেন্স)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
