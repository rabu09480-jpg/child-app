import React, { useState, useRef } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { Award, CheckCircle2, XCircle, RotateCcw, Printer, Sparkles, Volume2, Shield } from 'lucide-react';
import { dbService } from '../lib/dbService.ts';

export const QuizApp: React.FC = () => {
  const { language, t, speakText } = useI18n();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [participantName, setParticipantName] = useState('');
  const [certificateCode, setCertificateCode] = useState('');

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const certRef = useRef<HTMLDivElement | null>(null);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Finished
      const code = `CRD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setCertificateCode(code);
      setQuizFinished(true);
      dbService.recordQuizCompletion(participantName || 'Anonymous Scout', score, code);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setCertificateCode('');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const speakQuestionAloud = () => {
    const qText = language === 'bn' ? currentQ.questionBn : currentQ.questionEn;
    const mascotTip = language === 'bn' ? currentQ.mascotTipBn : currentQ.mascotTipEn;
    speakText(`${qText}. ${mascotTip}`, language);
  };

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const hasPassed = percentage >= 60;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Header bar */}
      <div className="bg-emerald-800 text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>{t('quiz.badge')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t('quiz.title')}
            </h3>
            <p className="text-xs text-emerald-100 mt-1 max-w-xl">
              {t('quiz.subtitle')}
            </p>
          </div>

          <div className="bg-emerald-900/80 px-4 py-2 rounded-xl text-center border border-emerald-700/50">
            <span className="text-xs text-emerald-300 block font-medium">
              {t('quiz.points')}
            </span>
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {score} / {QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {!quizFinished ? (
          <div>
            {/* Progress indicator */}
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-emerald-800">
                {t('quiz.question')} {currentIdx + 1} {t('quiz.of')} {QUIZ_QUESTIONS.length}
              </span>
              <span className="font-mono tabular-nums">
                {Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mb-6">
              <div
                className="bg-emerald-600 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                {language === 'bn' ? currentQ.questionBn : currentQ.questionEn}
              </h4>
              <button
                onClick={speakQuestionAloud}
                className="shrink-0 p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                title="Listen to question aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Options list */}
            <div className="space-y-3 mb-6">
              {((language === 'bn' ? currentQ.optionsBn : currentQ.optionsEn) || []).map((opt, idx) => {
                let btnStyle = 'border-stone-200 hover:border-emerald-300 hover:bg-stone-50 text-stone-800';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (idx === selectedAnswer) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                  } else {
                    btnStyle = 'opacity-60 border-stone-200 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswered && idx === selectedAnswer && idx !== currentQ.correctIndex && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation and Mascot feedback */}
            {isAnswered && (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>
                    {language === 'bn' ? 'সবুজ ডলফিনের পরামর্শ:' : 'Mascot Dolphin Tip:'}
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  {language === 'bn' ? currentQ.explanationBn : currentQ.explanationEn}
                </p>
                <div className="text-xs font-medium text-emerald-800 bg-emerald-50 p-2 rounded">
                  {language === 'bn' ? currentQ.mascotTipBn : currentQ.mascotTipEn}
                </div>
              </div>
            )}

            {/* Next button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
                >
                  {currentIdx + 1 < QUIZ_QUESTIONS.length
                    ? t('quiz.nextQuestion')
                    : t('quiz.finishQuiz')}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results and E-Certificate */
          <div className="space-y-8">
            <div className="text-center max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-stone-900">
                {hasPassed ? t('quiz.congrats') : t('quiz.keepLearning')}
              </h4>
              <p className="text-xs text-stone-600">
                {language === 'bn'
                  ? `তুমি ৫টি প্রশ্নের মধ্যে ${score}টি সঠিক উত্তর দিয়েছ (${percentage}%)।`
                  : `You scored ${score} out of 5 (${percentage}%).`}
              </p>

              {/* Name entry for certificate personalization */}
              <div className="pt-2 text-left">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'সনদপত্রের জন্য তোমার নাম লিখো:' : 'Enter Your Name for the Official Certificate:'}
                </label>
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder={language === 'bn' ? 'যেমন: সামিরা ইসলাম' : 'e.g. Samira Islam'}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Official e-Certificate Layout */}
            <div
              ref={certRef}
              className="p-8 rounded-2xl bg-gradient-to-br from-amber-50/50 via-white to-emerald-50/40 border-4 border-double border-amber-300/80 shadow-md text-center space-y-4 max-w-2xl mx-auto print:border-stone-900"
            >
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Child Voice · চাইল্ড ভয়েস
                  </span>
                </div>
                <span className="text-xs font-mono text-stone-500">
                  {certificateCode}
                </span>
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
                  {t('quiz.certificateTitle')}
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                  CHILD RIGHTS DEFENDER
                </h2>
                <div className="text-xs text-stone-500 italic mt-1">
                  {t('quiz.awardedTo')}
                </div>
              </div>

              <div className="py-2 border-b-2 border-dashed border-stone-300 max-w-xs mx-auto">
                <span className="text-lg font-bold text-emerald-900">
                  {participantName.trim() || (language === 'bn' ? 'সচেতন শিশু শিক্ষার্থী' : 'Junior Rights Defender')}
                </span>
              </div>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                {language === 'bn'
                  ? 'উপকূলীয় ও প্রত্যন্ত অঞ্চলের শিশু অধিকার, নির্যাতন প্রতিরোধ এবং নিরাপদ ইন্টারনেট ব্যবহারে সফলভাবে জ্ঞান অর্জনের স্বীকৃতিস্বরূপ এই সম্মাননা প্রদান করা হলো।'
                  : 'For successfully demonstrating knowledge in UNCRC child rights, personal boundary safety, and cyber protection across coastal communities.'}
              </p>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-4 border-t border-amber-100 font-mono">
                <span>Date: {new Date().toLocaleDateString()}</span>
                <span>Verified: Directorate of Social Welfare & CV</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg flex items-center gap-2 shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{t('quiz.downloadCert')}</span>
              </button>

              <button
                onClick={handleRestart}
                className="px-5 py-2.5 text-xs font-semibold text-stone-700 bg-white border border-stone-300 hover:bg-stone-50 rounded-lg flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('quiz.tryAgain')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
