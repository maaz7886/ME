import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Prayer, PrayerName, PrayerLog, PrayerStats } from '@/types/prayer';
import { getToday } from '@/utils/date';
import { colors } from '@/constants/colors';

interface PrayerState {
  prayers: Prayer[];
  prayerLogs: PrayerLog[];
  togglePrayer: (prayerName: PrayerName, date?: string) => void;
  getPrayersForDate: (date: string) => Prayer[];
  getPrayerStats: () => PrayerStats;
  getCompletionRate: (date: string) => number;
  getStreak: () => number;
  resetPrayers: () => void;
}

const defaultPrayers: Prayer[] = [
  { id: 'Fajr', name: 'Fajr', color: colors.fajr, isCompleted: false },
  { id: 'Dhuhr', name: 'Dhuhr', color: colors.dhuhr, isCompleted: false },
  { id: 'Asr', name: 'Asr', color: colors.asr, isCompleted: false },
  { id: 'Maghrib', name: 'Maghrib', color: colors.maghrib, isCompleted: false },
  { id: 'Isha', name: 'Isha', color: colors.isha, isCompleted: false },
  { id: 'Tahajjud', name: 'Tahajjud', color: colors.tahajjud, isCompleted: false },
];

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      prayers: defaultPrayers,
      prayerLogs: [],
      
      togglePrayer: (prayerName, date = getToday()) => {
        // Update the prayer status for today
        set((state) => {
          // Find the prayer log for this date
          const logIndex = state.prayerLogs.findIndex(log => log.date === date);
          let updatedLogs = [...state.prayerLogs];
          
          if (logIndex >= 0) {
            // Update existing log
            const currentLog = updatedLogs[logIndex];
            updatedLogs[logIndex] = {
              ...currentLog,
              prayers: {
                ...currentLog.prayers,
                [prayerName]: !currentLog.prayers[prayerName]
              }
            };
          } else {
            // Create new log for this date
            updatedLogs.push({
              date,
              prayers: {
                [prayerName]: true
              }
            });
          }
          
          // Update the prayers array for UI if it's today
          let updatedPrayers = [...state.prayers];
          if (date === getToday()) {
            updatedPrayers = updatedPrayers.map(prayer => 
              prayer.name === prayerName 
                ? { ...prayer, isCompleted: !prayer.isCompleted } 
                : prayer
            );
          }
          
          return {
            prayers: updatedPrayers,
            prayerLogs: updatedLogs
          };
        });
      },
      
      getPrayersForDate: (date) => {
        const state = get();
        const log = state.prayerLogs.find(log => log.date === date);
        
        if (!log) {
          return defaultPrayers.map(prayer => ({ ...prayer, isCompleted: false }));
        }
        
        return defaultPrayers.map(prayer => ({
          ...prayer,
          isCompleted: !!log.prayers[prayer.name]
        }));
      },
      
      getPrayerStats: () => {
        const state = get();
        const totalPossiblePrayers = state.prayerLogs.length * 5; // 5 obligatory prayers per day
        
        let completedPrayers = 0;
        state.prayerLogs.forEach(log => {
          Object.entries(log.prayers).forEach(([name, completed]) => {
            if (completed && name !== 'Tahajjud') { // Exclude Tahajjud from stats
              completedPrayers++;
            }
          });
        });
        
        return {
          totalPrayers: totalPossiblePrayers,
          completedPrayers,
          streak: get().getStreak(),
          completionRate: totalPossiblePrayers > 0 
            ? (completedPrayers / totalPossiblePrayers) * 100 
            : 0
        };
      },
      
      getCompletionRate: (date) => {
        const prayers = get().getPrayersForDate(date);
        const obligatoryPrayers = prayers.filter(p => p.name !== 'Tahajjud');
        const completed = obligatoryPrayers.filter(p => p.isCompleted).length;
        return (completed / 5) * 100; // 5 obligatory prayers
      },
      
      getStreak: () => {
        const state = get();
        const sortedLogs = [...state.prayerLogs].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        if (sortedLogs.length === 0) return 0;
        
        let streak = 0;
        let currentDate = new Date(sortedLogs[0].date);
        
        // Check if the most recent log is from today or yesterday
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const mostRecentLogDate = new Date(sortedLogs[0].date);
        mostRecentLogDate.setHours(0, 0, 0, 0);
        
        // If the most recent log is not from today or yesterday, streak is 0
        if (mostRecentLogDate.getTime() !== today.getTime() && 
            mostRecentLogDate.getTime() !== yesterday.getTime()) {
          return 0;
        }
        
        // Count streak days (days with at least 3 prayers completed)
        for (const log of sortedLogs) {
          const logDate = new Date(log.date);
          logDate.setHours(0, 0, 0, 0);
          
          // Check if this log is for the expected date in the streak
          const expectedDate = new Date(currentDate);
          expectedDate.setHours(0, 0, 0, 0);
          
          if (logDate.getTime() !== expectedDate.getTime()) {
            break; // Break the streak
          }
          
          // Count completed prayers for this day
          const completedCount = Object.entries(log.prayers)
            .filter(([name, completed]) => completed && name !== 'Tahajjud')
            .length;
          
          // Consider the day part of streak if at least 3 prayers were completed
          if (completedCount >= 3) {
            streak++;
            // Move to the previous day
            currentDate.setDate(currentDate.getDate() - 1);
          } else {
            break; // Break the streak if not enough prayers completed
          }
        }
        
        return streak;
      },
      
      resetPrayers: () => {
        set({
          prayers: defaultPrayers.map(prayer => ({ ...prayer, isCompleted: false }))
        });
      }
    }),
    {
      name: 'prayer-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
