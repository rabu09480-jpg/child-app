export type Language = 'bn' | 'en';

export interface ChildRightArticle {
  id: string;
  articleNumber: string;
  iconName: string;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  legalReferenceEn: string;
  legalReferenceBn: string;
  actionAdviceEn: string;
  actionAdviceBn: string;
  audioTextEn: string;
  audioTextBn: string;
}

export interface CreativeSubmissionItem {
  id: string;
  title: string;
  category: 'drawing' | 'story' | 'poem' | 'voice';
  author: string;
  age: number;
  location: string;
  imageUrl?: string;
  textContent?: string;
  audioDuration?: string;
  likes: number;
  date: string;
  tags: string[];
}

export interface QuizQuestionItem {
  id: number;
  questionEn: string;
  questionBn: string;
  optionsEn: string[];
  optionsBn: string[];
  correctIndex: number;
  explanationEn: string;
  explanationBn: string;
  mascotTipEn: string;
  mascotTipBn: string;
}

export interface IncidentReportFormData {
  incidentType: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  district: string;
  upazila: string;
  village: string;
  description: string;
  hasPhoto: boolean;
  photoUrl?: string;
  applyPrivacyBlur: boolean;
  stripMetadata: boolean;
  anonymousConsent: boolean;
}

export interface SubmittedReportRecord extends IncidentReportFormData {
  id: string;
  trackingCode: string;
  timestamp: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'VOLUNTEER_ASSIGNED' | 'REFERRED_1098' | 'ACTION_TAKEN';
}

export interface SafeWebResource {
  id: string;
  title: string;
  titleBn: string;
  url: string;
  category: 'education' | 'science' | 'art' | 'bangla_books' | 'safety';
  minAge: number;
  maxAge: number;
  safetyScore: number;
  descriptionEn: string;
  descriptionBn: string;
  isVerified: boolean;
  badge: string;
}

export interface ComicStoryPage {
  pageNumber: number;
  titleEn: string;
  titleBn: string;
  dialogueEn: string[];
  dialogueBn: string[];
  narrationEn: string;
  narrationBn: string;
  safetyLessonEn: string;
  safetyLessonBn: string;
  imageUrl: string;
}

export interface ComicStory {
  id: string;
  titleEn: string;
  titleBn: string;
  themeEn: string;
  themeBn: string;
  pages: ComicStoryPage[];
}

export interface VolunteerFormData {
  fullName: string;
  phone: string;
  email?: string;
  district: string;
  upazila: string;
  profession: string;
  skills: string[];
  availability: string;
  motivation: string;
}

export interface OperationalDistrict {
  id: string;
  nameEn: string;
  nameBn: string;
  zoneEn: string;
  zoneBn: string;
  schools: number;
  volunteers: number;
  childrenReached: number;
  vulnerabilityFactorEn: string;
  vulnerabilityFactorBn: string;
  localHubLead: string;
  leadPhone: string;
}
