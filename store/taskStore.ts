import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStats, TaskTimeOfDay } from '@/types/task';
import { getToday } from '@/utils/date';
import { mockTasks } from '@/app/mocks/tasks';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  toggleTaskCompletion: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasksForDate: (date: string) => Task[];
  getTasksForTimeOfDay: (date: string, timeOfDay: TaskTimeOfDay) => Task[];
  getTaskStats: () => TaskStats;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: mockTasks,
      
      addTask: (taskData) => {
        const newTask: Task = {
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          isCompleted: false,
          ...taskData,
        };
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
      },
      
      removeTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },
      
      toggleTaskCompletion: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        }));
      },
      
      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
      },
      
      getTasksForDate: (date) => {
        return get().tasks.filter((task) => {
          // If task has a due date, check if it matches
          if (task.dueDate) {
            return task.dueDate === date;
          }
          
          // If task is recurring, check if it should appear on this date
          if (task.isRecurring && task.recurringDays) {
            const dayOfWeek = new Date(date).getDay();
            return task.recurringDays.includes(dayOfWeek);
          }
          
          // Default to tasks created for today
          return task.createdAt.split('T')[0] === date;
        });
      },
      
      getTasksForTimeOfDay: (date, timeOfDay) => {
        const tasksForDate = get().getTasksForDate(date);
        return tasksForDate.filter((task) => task.timeOfDay === timeOfDay);
      },
      
      getTaskStats: () => {
        const allTasks = get().tasks;
        const completedTasks = allTasks.filter((task) => task.isCompleted);
        
        return {
          totalTasks: allTasks.length,
          completedTasks: completedTasks.length,
          completionRate: allTasks.length > 0
            ? (completedTasks.length / allTasks.length) * 100
            : 0,
        };
      },
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
