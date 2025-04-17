import { Habit } from '@/types/habit';
import { colors } from '@/constants/colors';

export const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Adhkar',
    description: 'Recite morning supplications',
    icon: 'Sun',
    color: colors.primary,
    category: 'spiritual',
    frequency: {
      type: 'daily',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
  {
    id: '2',
    name: 'Evening Adhkar',
    description: 'Recite evening supplications',
    icon: 'Moon',
    color: colors.secondary,
    category: 'spiritual',
    frequency: {
      type: 'daily',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
  {
    id: '3',
    name: 'Read Quran',
    description: '10 pages daily',
    icon: 'BookOpen',
    color: '#4CAF50',
    category: 'spiritual',
    frequency: {
      type: 'daily',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
  {
    id: '4',
    name: 'Exercise',
    description: '30 minutes workout',
    icon: 'Activity',
    color: '#F44336',
    category: 'health',
    frequency: {
      type: 'daily',
      days: [1, 3, 5], // Monday, Wednesday, Friday
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
  {
    id: '5',
    name: 'Drink Water',
    description: '8 glasses of water',
    icon: 'Droplets',
    color: '#2196F3',
    category: 'health',
    frequency: {
      type: 'daily',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
  {
    id: '6',
    name: 'Read Book',
    description: '30 minutes of reading',
    icon: 'BookOpen',
    color: '#9C27B0',
    category: 'learning',
    frequency: {
      type: 'daily',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
  {
    id: '7',
    name: 'Save Money',
    description: 'Put aside 10% of income',
    icon: 'PiggyBank',
    color: '#FF9800',
    category: 'finance',
    frequency: {
      type: 'monthly',
    },
    createdAt: '2023-01-01T00:00:00.000Z',
    completedDates: [],
    streak: 0,
  },
];
