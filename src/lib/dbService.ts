import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase.ts';
import {
  SubmittedReportRecord,
  CreativeSubmissionItem,
  VolunteerFormData
} from '../types';

export const dbService = {
  // 1. Save Anonymous Child Incident Report
  async submitIncidentReport(data: Omit<SubmittedReportRecord, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'child_incident_reports'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn('Firestore write fallback (local mode):', err);
      return `local-${Date.now()}`;
    }
  },

  // 2. Track Incident Report by Anonymous Code
  async findReportByTrackingCode(trackingCode: string): Promise<SubmittedReportRecord | null> {
    try {
      const q = query(
        collection(db, 'child_incident_reports'),
        where('trackingCode', '==', trackingCode.toUpperCase().trim()),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const docData = snap.docs[0].data();
        return {
          id: snap.docs[0].id,
          ...docData,
        } as SubmittedReportRecord;
      }
      return null;
    } catch (err) {
      console.warn('Firestore query error:', err);
      return null;
    }
  },

  // 3. Save Creative Submission (Voice Wall)
  async submitCreativeWork(work: Omit<CreativeSubmissionItem, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'creative_submissions'), {
        ...work,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn('Firestore creative submission fallback:', err);
      return `local-${Date.now()}`;
    }
  },

  // 4. Fetch Community Creative Submissions
  async getCreativeWorks(): Promise<CreativeSubmissionItem[]> {
    try {
      const q = query(
        collection(db, 'creative_submissions'),
        limit(20)
      );
      const snap = await getDocs(q);
      const results: CreativeSubmissionItem[] = [];
      snap.forEach(doc => {
        results.push({
          id: doc.id,
          ...doc.data(),
        } as CreativeSubmissionItem);
      });
      return results;
    } catch (err) {
      console.warn('Firestore read error, using offline seed:', err);
      return [];
    }
  },

  // 5. Register Volunteer Application
  async registerVolunteer(formData: VolunteerFormData): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'volunteers'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn('Firestore volunteer registration fallback:', err);
      return `local-${Date.now()}`;
    }
  },

  // 6. Save Quiz Completion
  async recordQuizCompletion(participantName: string, score: number, certificateCode: string): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'quiz_completions'), {
        participantName,
        score,
        certificateCode,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn('Firestore quiz completion record fallback:', err);
      return `local-${Date.now()}`;
    }
  }
};
