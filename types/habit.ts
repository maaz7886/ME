export type HabitCategory = 'spiritual' | 'health' | 'learning' | 'finance' | 'productivity' | 'other';

export type Habit = {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  category: HabitCategory;
  frequency: {
    type: 'daily' | 'weekly' | 'monthly';
    days?: number[]; // For weekly habits, 0 = Sunday, 6 = Saturday
  };
  createdAt: string;
  completedDates: string[]; // ISO date strings
  streak: number;
  goal?: number;
};

export type HabitCompletion = {
  date: string; // ISO date string
  habitId: string;
};

export type HabitStats = {
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
};
