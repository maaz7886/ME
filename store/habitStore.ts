import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitStats } from '@/types/habit';
import { getToday, getStreakCount } from '@/utils/date';
import { mockHabits } from '@/app/mocks/habits';
interface HabitState {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => void;
  removeHabit: (id: string) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  toggleHabitCompletion: (id: string, date: string) => void;
  getHabitById: (id: string) => Habit | undefined;
  getCompletedHabitsForDate: (date: string) => Habit[];
  getHabitStats: (id: string) => HabitStats;
  getHabitsByCategory: (category: string) => Habit[];
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: mockHabits,
      
      addHabit: (habitData) => {
        const newHabit: Habit = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          completedDates: [],
          streak: 0,
          ...habitData,
        };
        
        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },
      
      removeHabit: (id) => {
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        }));
      },
      
      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id ? { ...habit, ...updates } : habit
          ),
        }));
      },
      
      toggleHabitCompletion: (id, date) => {
        set((state) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return state;
          
          const isCompleted = habit.completedDates.includes(date);
          let updatedCompletedDates: string[];
          
          if (isCompleted) {
            // Remove the date if already completed
            updatedCompletedDates = habit.completedDates.filter((d) => d !== date);
          } else {
            // Add the date if not completed
            updatedCompletedDates = [...habit.completedDates, date];
          }
          
          // Calculate new streak
          const newStreak = getStreakCount(updatedCompletedDates);
          
          return {
            habits: state.habits.map((h) =>
              h.id === id
                ? {
                    ...h,
                    completedDates: updatedCompletedDates,
                    streak: newStreak,
                  }
                : h
            ),
          };
        });
      },
      
      getHabitById: (id) => {
        return get().habits.find((habit) => habit.id === id);
      },
      
      getCompletedHabitsForDate: (date) => {
        return get().habits.filter((habit) =>
          habit.completedDates.includes(date)
        );
      },
      
      getHabitStats: (id) => {
        const habit = get().habits.find((h) => h.id === id);
        if (!habit) {
          return {
            totalCompletions: 0,
            currentStreak: 0,
            longestStreak: 0,
            completionRate: 0,
          };
        }
        
        const daysSinceCreation = Math.ceil(
          (new Date().getTime() - new Date(habit.createdAt).getTime()) /
            (1000 * 60 * 60 * 24)
        );
        
        // Calculate longest streak
        let longestStreak = habit.streak;
        let currentStreak = 0;
        let previousDate: Date | null = null;
        
        // Sort dates in ascending order
        const sortedDates = [...habit.completedDates].sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );
        
        for (const dateStr of sortedDates) {
          const currentDate = new Date(dateStr);
          
          if (!previousDate) {
            currentStreak = 1;
          } else {
            const diffTime = currentDate.getTime() - previousDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
              currentStreak++;
            } else {
              currentStreak = 1;
            }
          }
          
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
          
          previousDate = currentDate;
        }
        
        return {
          totalCompletions: habit.completedDates.length,
          currentStreak: habit.streak,
          longestStreak,
          completionRate: daysSinceCreation > 0
            ? (habit.completedDates.length / daysSinceCreation) * 100
            : 0,
        };
      },
      
      getHabitsByCategory: (category) => {
        return get().habits.filter((habit) => habit.category === category);
      },
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
