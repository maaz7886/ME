import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  reminderEnabled: boolean;
  reminderTime: string; // Format: "HH:MM"
  weekStartsOn: 0 | 1; // 0 = Sunday, 1 = Monday
  showCompletedHabits: boolean;
  darkMode: boolean;
  
  toggleReminder: () => void;
  setReminderTime: (time: string) => void;
  setWeekStartsOn: (day: 0 | 1) => void;
  toggleShowCompletedHabits: () => void;
  toggleDarkMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      reminderEnabled: false,
      reminderTime: "20:00", // Default reminder time: 8:00 PM
      weekStartsOn: 0, // Default: week starts on Sunday
      showCompletedHabits: true,
      darkMode: false,
      
      toggleReminder: () => set((state) => ({ 
        reminderEnabled: !state.reminderEnabled 
      })),
      
      setReminderTime: (time) => set({ 
        reminderTime: time 
      }),
      
      setWeekStartsOn: (day) => set({ 
        weekStartsOn: day 
      }),
      
      toggleShowCompletedHabits: () => set((state) => ({ 
        showCompletedHabits: !state.showCompletedHabits 
      })),
      
      toggleDarkMode: () => set((state) => ({
        darkMode: !state.darkMode
      })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
