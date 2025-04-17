export type QuranGoal = {
  id: string;
  type: 'reading' | 'memorization';
  target: {
    type: 'pages' | 'juz' | 'surah' | 'ayah';
    value: number; // Number of pages, juz, etc.
    specific?: string; // Specific surah or ayah reference
  };
  progress: number; // Current progress (pages read, % memorized)
  startDate: string;
  endDate?: string;
  lastUpdated: string;
  notes?: string;
};

export type QuranBookmark = {
  id: string;
  surah: number;
  ayah: number;
  page: number;
  date: string;
  notes?: string;
};
