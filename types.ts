export type Language = 'en' | 'ar';
export type Page = 'dashboard' | 'admin' | 'parent' | 'canteen';

export interface CanteenItem {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  isHealthy: boolean;
  points: number;
}

export interface ActivityLog {
  id: number;
  grade: string;
  studentsAttended: number;
  date: string; // YYYY-MM-DD
  healthyChoices: number;
  activityClass: {
    attended: boolean;
    intensity: 'low' | 'medium' | 'high' | null;
  };
  academicBreak: boolean;
  teacher: string;
}

export interface School {
  id: number;
  name: { en: string; ar: string };
  points: number;
  logo: string;
}

export interface Challenge {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  points: number;
  icon: string;
}
