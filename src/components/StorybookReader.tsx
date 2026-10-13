import React, { useState } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { COMIC_STORY } from '../data/mockData';
import { BookOpen, ChevronLeft, ChevronRight, Volume2, ShieldAlert, Sparkles } from 'lucide-react';

export const StorybookReader: React.FC = () => {
  const { language, t, speakText, lowBandwidthMode } = useI18n();
  const [currentPageIdx, setCurrentPageIdx] = useState(0);

  const story = COMIC_STORY;
  const currentPage = story.pages[currentPageIdx];

  const handleNextPage = () => {
    if (currentPageIdx + 1 < story.pages.length) {
      setCurrentPageIdx(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      setCurrentPageIdx(prev => prev - 1);
    }
  };

  const handleListenPage = () => {
    const textToSpeak = language === 'bn'
      ? `${currentPage.titleBn}। ${currentPage.narrationBn}। ${currentPage.safetyLessonBn}`
      : `${currentPage.titleEn}. ${currentPage.narrationEn}. Golden safety rule: ${currentPage.safetyLessonEn}`;
    speakText(textToSpeak, language);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
      {/* Reader Header */}
      <div className="p-6 bg-slate-900 text-white border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#082f49] bg-[#39EBFF] mb-2 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#082f49]" />
              <span>{language === 'bn' ? 'সচিত্র শিশু কমিকস' : 'Illustrated Digital Storybook'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {language === 'bn' ? story.titleBn : story.titleEn}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'bn' ? story.themeBn : story.themeEn}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleListenPage}
              className="px-4 py-2 text-xs font-bold bg-[#39EBFF] hover:bg-[#5cf0ff] rounded-xl text-[#082f49] flex items-center gap-1.5 transition-all btn-interaction shadow-md shadow-[#39EBFF]/30"
              title="Listen to storybook audio"
            >
              <Volume2 className="w-4 h-4 text-[#082f49]" />
              <span>{t('comics.listenNarration')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Flipbook Canvas */}
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Illustration Area */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative aspect-[4/3] shadow-inner">
              {!lowBandwidthMode ? (
                <img
                  src={currentPage.imageUrl}
                  alt={currentPage.titleEn}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-cyan-50/70">
                  <Sparkles className="w-8 h-8 text-cyan-700 mb-2" />
                  <span className="text-xs font-bold text-slate-900">
                    {language === 'bn' ? 'সচিত্র দৃশ্য (ডাটা সাশ্রয়ী মোড)' : 'Comic Scene (Data Saver)'}
                  </span>
                </div>
              )}
              
              {/* Page Number Badge */}
              <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-[#39EBFF] text-xs font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-800">
                {t('comics.page')} {currentPage.pageNumber} / {story.pages.length}
              </div>
            </div>
          </div>

          {/* Story Narrative & Dialogue Bubbles */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {language === 'bn' ? currentPage.titleBn : currentPage.titleEn}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                {language === 'bn' ? currentPage.narrationBn : currentPage.narrationEn}
              </p>
            </div>

            {/* Comic Dialogue Speeches */}
            <div className="space-y-2">
              {((language === 'bn' ? currentPage.dialogueBn : currentPage.dialogueEn) || []).map((line, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed border ${
                    idx === 0 
                      ? 'bg-cyan-50/70 border-cyan-200 text-[#082f49] rounded-tl-none font-semibold'
                      : 'bg-amber-50/70 border-amber-200 text-amber-950 rounded-tr-none font-semibold'
                  }`}
                >
                  <span>{line}</span>
                </div>
              ))}
            </div>

            {/* Core Lesson Highlight */}
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-950">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-rose-900">
                  {t('comics.coreLesson')}
                </span>{' '}
                {language === 'bn' ? currentPage.safetyLessonBn : currentPage.safetyLessonEn}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIdx === 0}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all btn-interaction shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t('comics.prevPage')}</span>
              </button>

              <div className="flex gap-2">
                {story.pages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPageIdx(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentPageIdx ? 'w-6 bg-[#39EBFF] shadow-xs shadow-[#39EBFF]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    title={`Page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPageIdx + 1 === story.pages.length}
                className="px-5 py-2 text-xs font-bold rounded-xl bg-[#39EBFF] hover:bg-[#5cf0ff] text-[#082f49] disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all btn-interaction shadow-md shadow-[#39EBFF]/30"
              >
                <span>{t('comics.nextPage')}</span>
                <ChevronRight className="w-4 h-4 text-[#082f49]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
