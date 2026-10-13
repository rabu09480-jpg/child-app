import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18nContext';
import { CREATIVE_SUBMISSIONS, ASSET_IMAGES } from '../data/mockData';
import { CreativeSubmissionItem } from '../types';
import { Palette, BookOpen, PenTool, Heart, ShieldCheck, Download, Trash2, Send, CheckCircle, PhoneCall } from 'lucide-react';
import { dbService } from '../lib/dbService.ts';

export const ChildCorner: React.FC = () => {
  const { language, t, lowBandwidthMode } = useI18n();
  const [activeFilter, setActiveFilter] = useState<'all' | 'drawing' | 'story' | 'poem'>('all');
  const [submissions, setSubmissions] = useState<CreativeSubmissionItem[]>(CREATIVE_SUBMISSIONS);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  
  // Interactive Drawing Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#10b981'); // Emerald default
  const [brushSize, setBrushSize] = useState(4);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorAge, setAuthorAge] = useState('10');
  const [district, setDistrict] = useState('Barguna');
  const [artworkTitle, setArtworkTitle] = useState('');
  const [storyText, setStoryText] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Initialize Canvas and fetch any community works from Firestore
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    dbService.getCreativeWorks().then((remoteWorks) => {
      if (remoteWorks.length > 0) {
        setSubmissions(prev => [...remoteWorks, ...prev]);
      }
    });
  }, []);

  const handleLike = (id: string) => {
    setLikesMap(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveDrawingLocally = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `child-voice-art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleOpenSubmit = () => {
    setShowSubmitModal(true);
    setSubmissionSuccess(false);
  };

  const handleSubmitArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const drawnImageUrl = canvas ? canvas.toDataURL() : ASSET_IMAGES.childrenArt;

    const newCreation: CreativeSubmissionItem = {
      id: `c-user-${Date.now()}`,
      title: artworkTitle || (language === 'bn' ? 'আমার আঁকা স্বপ্ন' : 'My Dream Picture'),
      category: storyText ? 'story' : 'drawing',
      author: authorName || (language === 'bn' ? 'শিশু বন্ধু' : 'Young Friend'),
      age: parseInt(authorAge, 10) || 10,
      location: district,
      imageUrl: drawnImageUrl,
      textContent: storyText || undefined,
      likes: 1,
      date: 'Just now',
      tags: ['Community Art', 'Child Voice']
    };

    // Save to Firestore database
    await dbService.submitCreativeWork({
      title: newCreation.title,
      category: newCreation.category,
      author: newCreation.author,
      age: newCreation.age,
      location: newCreation.location,
      imageUrl: newCreation.imageUrl,
      textContent: newCreation.textContent,
      likes: 1,
      date: new Date().toLocaleDateString(),
      tags: newCreation.tags,
    });

    setSubmissions([newCreation, ...submissions]);
    setSubmissionSuccess(true);
    setTimeout(() => {
      setShowSubmitModal(false);
      setSubmissionSuccess(false);
      setArtworkTitle('');
      setStoryText('');
    }, 2000);
  };

  const filteredSubmissions = submissions.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="child-corner" className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase mb-1">
              <span>UNCRC Article 31: Creative Expression</span>
              <span aria-hidden="true">·</span>
              <span>{language === 'bn' ? 'শিশুদের সৃজনশীল কণ্ঠ' : 'Child Voice Wall'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              {t('voiceWall.title')}
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              {t('voiceWall.subtitle')}
            </p>
          </div>

          {/* Emergency Direct Call Affordance */}
          <div className="flex items-center gap-2">
            <a
              href="tel:1098"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'bn' ? '১০৯৮ চাইল্ড হেল্পলাইন' : 'Dial 1098 Child Helpline'}</span>
            </a>
            <a
              href="tel:999"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-900 bg-rose-100 hover:bg-rose-200 rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-700" />
              <span>{language === 'bn' ? '৯৯৯ জরুরি উদ্ধার' : 'Dial 999 Rescue'}</span>
            </a>
          </div>
        </div>

        {/* Interactive Child Canvas Tool (Drawing Pad) */}
        <div className="mb-12 p-6 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
                <Palette className="w-4 h-4 text-emerald-700" />
                <span>{t('voiceWall.drawingPadTitle')}</span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {t('voiceWall.canvasInstruction')}
              </p>
            </div>

            {/* Canvas Toolbar Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Color Swatches */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-stone-200">
                {['#10b981', '#0284c7', '#e11d48', '#d97706', '#7c3aed', '#1f2937'].map((col) => (
                  <button
                    key={col}
                    onClick={() => setBrushColor(col)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      brushColor === col ? 'scale-115 ring-2 ring-stone-900' : ''
                    }`}
                    style={{ backgroundColor: col }}
                    title={`Color ${col}`}
                  />
                ))}
              </div>

              {/* Brush Size */}
              <select
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                aria-label={language === 'bn' ? 'তুলির আকার' : 'Brush size'}
                className="text-xs bg-white border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-700"
              >
                <option value="2">{language === 'bn' ? 'চিকন তুলি' : 'Thin Brush'}</option>
                <option value="4">{language === 'bn' ? 'মাঝারি তুলি' : 'Medium Brush'}</option>
                <option value="8">{language === 'bn' ? 'মোটা তুলি' : 'Thick Brush'}</option>
              </select>

              <button
                onClick={clearCanvas}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors"
                title="Clear canvas"
              >
                <Trash2 className="w-3.5 h-3.5 text-stone-500" />
                <span>{language === 'bn' ? 'মুছে ফেলো' : 'Clear'}</span>
              </button>

              <button
                onClick={handleSaveDrawingLocally}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-stone-600 bg-white border border-stone-200 hover:bg-stone-100 rounded-lg transition-colors"
                title="Save picture"
              >
                <Download className="w-3.5 h-3.5 text-stone-500" />
                <span>{language === 'bn' ? 'ডাউনলোড' : 'Download'}</span>
              </button>

              <button
                onClick={handleOpenSubmit}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t('voiceWall.submitYourWork')}</span>
              </button>
            </div>
          </div>

          {/* HTML5 Canvas Element */}
          <div className="w-full flex justify-center bg-white rounded-xl border border-stone-200 overflow-hidden shadow-inner touch-none">
            <canvas
              ref={canvasRef}
              width={800}
              height={360}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full max-w-full h-auto cursor-crosshair bg-white"
            />
          </div>
        </div>

        {/* Filter Bar (Functional Buttons) */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('voiceWall.filterAll')}
            </button>
            <button
              onClick={() => setActiveFilter('drawing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'drawing' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('voiceWall.filterDrawings')}
            </button>
            <button
              onClick={() => setActiveFilter('story')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'story' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('voiceWall.filterStories')}
            </button>
            <button
              onClick={() => setActiveFilter('poem')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeFilter === 'poem' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {t('voiceWall.filterPoems')}
            </button>
          </div>

          <div className="text-xs text-stone-500 hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t('voiceWall.childSafeNotice')}</span>
          </div>
        </div>

        {/* Gallery Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSubmissions.map((item) => {
            const currentLikes = item.likes + (likesMap[item.id] || 0);

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/80 overflow-hidden hover:border-emerald-300 card-hover shadow-2xs transition-all group"
              >
                <div>
                  {/* Media visual if present */}
                  {item.imageUrl && !lowBandwidthMode && (
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    {/* Category & metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                      <span className="font-semibold text-emerald-800 uppercase">
                        {item.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{item.location}</span>
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-stone-900 mb-2 line-clamp-2">
                      {item.title}
                    </h4>

                    {/* Text content for stories/poems */}
                    {item.textContent && (
                      <p className="text-xs text-stone-600 whitespace-pre-line line-clamp-4 bg-white p-3 rounded-lg border border-stone-100 font-serif leading-relaxed mb-3">
                        {item.textContent}
                      </p>
                    )}

                    {/* Author Attribution */}
                    <div className="text-xs text-stone-600">
                      <span className="font-medium text-stone-800">{item.author}</span>
                      <span className="text-stone-400"> ({item.age} {language === 'bn' ? 'বছর' : 'yrs'})</span>
                    </div>
                  </div>
                </div>

                {/* Footer Appreciation */}
                <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-100/60 mt-2">
                  <span className="text-xs text-stone-400 font-mono">
                    {item.date}
                  </span>
                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span className="tabular-nums">{currentLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-xl border border-stone-200">
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              {language === 'bn' ? 'তোমার শিল্পকর্ম বা গল্প জমা দাও' : 'Submit Your Artwork or Story'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {language === 'bn'
                ? 'শিশুর নিরাপত্তার স্বার্থে কেবল প্রথম নাম ও জেলা প্রদর্শিত হবে। কোনো ফোন নম্বর প্রকাশিত হবে না।'
                : 'For child privacy, only your first name and district will be visible.'}
            </p>

            {submissionSuccess ? (
              <div className="p-6 text-center text-emerald-800 bg-emerald-50 rounded-xl space-y-2">
                <CheckCircle className="w-10 h-10 mx-auto text-emerald-600" />
                <div className="font-bold text-sm">
                  {language === 'bn' ? 'ধন্যবাদ! তোমার সৃষ্টি সফলভাবে সংরক্ষিত হয়েছে।' : 'Thank you! Your creation has been submitted safely.'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitArtwork} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'শিল্পের শিরোনাম' : 'Artwork or Story Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={artworkTitle}
                    onChange={(e) => setArtworkTitle(e.target.value)}
                    placeholder={language === 'bn' ? 'যেমন: আমাদের নদী বা স্কুলের গল্প' : 'e.g. My River Boat School'}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {language === 'bn' ? 'শিশুর নাম (ডাকনাম)' : 'Child Name (First only)'}
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: আমিন / তানিয়া' : 'e.g. Amin / Tania'}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {language === 'bn' ? 'বয়স' : 'Age'}
                    </label>
                    <input
                      type="number"
                      min="4"
                      max="17"
                      value={authorAge}
                      onChange={(e) => setAuthorAge(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {language === 'bn' ? 'উপকূলীয় জেলা' : 'District'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
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
                    {language === 'bn' ? 'তোমার লেখা গল্প বা কবিতা (ঐচ্ছিক)' : 'Story or Poem Text (Optional)'}
                  </label>
                  <textarea
                    rows={3}
                    value={storyText}
                    onChange={(e) => setStoryText(e.target.value)}
                    placeholder={language === 'bn' ? 'তোমার গ্রামের বা বন্ধুদের নিয়ে কোনো গল্প লিখো...' : 'Share a short village experience...'}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                  >
                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                  >
                    {language === 'bn' ? 'জমা দাও' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
