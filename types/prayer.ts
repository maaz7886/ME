export type PrayerName = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha' | 'Tahajjud';

export type Prayer = {
  id: PrayerName;
  name: PrayerName;
  color: string;
  time?: string; // Optional prayer time
  isCompleted: boolean;
};

export type PrayerLog = {
  date: string; // ISO date string
  prayers: {
    [key in PrayerName]?: boolean;
  };
};

export type PrayerStats = {
  totalPrayers: number;
  completedPrayers: number;
  streak: number;
  completionRate: number;
};
