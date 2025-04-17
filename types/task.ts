export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskCategory = 'work' | 'personal' | 'spiritual' | 'health' | 'learning' | 'finance' | 'other';
export type TaskTimeOfDay = 'morning' | 'afternoon' | 'evening';

export type Task = {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  timeOfDay: TaskTimeOfDay;
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
  isRecurring?: boolean;
  recurringDays?: number[]; // 0 = Sunday, 6 = Saturday
};

export type TaskStats = {
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
};
