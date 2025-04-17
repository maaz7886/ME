import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Plus, Sun, Cloud, Moon, Kanban, CheckSquare, Clock, Calendar } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { getToday, getFullDate } from '@/utils/date';
import { useTaskStore } from '@/store/taskStore';
import { TaskTimeOfDay } from '@/types/task';
import { DateSelector } from '@/components/DateSelector';

import TaskCard from '@/components/TaskCard';
import SectionHeader from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';

export default function TasksScreen() {
  const router = useRouter();
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  const { tasks, toggleTaskCompletion, getTasksForDate, getTasksForTimeOfDay, addTask } = useTaskStore();
  
  const morningTasks = getTasksForTimeOfDay(selectedDate, 'morning');
  const afternoonTasks = getTasksForTimeOfDay(selectedDate, 'afternoon');
  const eveningTasks = getTasksForTimeOfDay(selectedDate, 'evening');
  
  const totalTasks = getTasksForDate(selectedDate).length;
  const completedTasks = getTasksForDate(selectedDate).filter(t => t.isCompleted).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const handleAddTask = () => {
    // In a real app, this would navigate to a task creation screen
    // For now, let's add a sample task
    addTask({
      title: "New task",
      description: "Task description",
      priority: "medium",
      category: "personal",
      timeOfDay: "morning",
      dueDate: selectedDate,
    });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Tasks & Goals',
          headerRight: () => (
            <Pressable style={styles.addButton} onPress={handleAddTask}>
              <Plus size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Date Selector */}
        <DateSelector 
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        
        {/* Date Header */}
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{getFullDate(new Date(selectedDate))}</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${completionPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {completedTasks}/{totalTasks} completed
            </Text>
          </View>
        </View>
        
        {/* View Toggle */}
        <View style={styles.viewToggleContainer}>
          <Pressable 
            style={[
              styles.viewToggleButton, 
              viewMode === 'list' && styles.viewToggleButtonActive
            ]}
            onPress={() => setViewMode('list')}
          >
            <CheckSquare size={18} color={viewMode === 'list' ? colors.primary : colors.textSecondary} />
            <Text style={[
              styles.viewToggleText,
              viewMode === 'list' && styles.viewToggleTextActive
            ]}>List View</Text>
          </Pressable>
          
          <Pressable 
            style={[
              styles.viewToggleButton, 
              viewMode === 'kanban' && styles.viewToggleButtonActive
            ]}
            onPress={() => setViewMode('kanban')}
          >
            <Kanban size={18} color={viewMode === 'kanban' ? colors.primary : colors.textSecondary} />
            <Text style={[
              styles.viewToggleText,
              viewMode === 'kanban' && styles.viewToggleTextActive
            ]}>Kanban View</Text>
          </Pressable>
        </View>
        
        {viewMode === 'list' ? (
          <>
            {/* Morning Tasks */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Sun size={20} color={colors.warning} />
                <Text style={styles.sectionTitle}>Morning</Text>
                <Pressable 
                  style={styles.addSectionButton}
                  onPress={() => addTask({
                    title: "New morning task",
                    priority: "medium",
                    category: "personal",
                    timeOfDay: "morning",
                    dueDate: selectedDate,
                  })}
                >
                  <Plus size={16} color={colors.primary} />
                </Pressable>
              </View>
              
              {morningTasks.length > 0 ? (
                morningTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskCompletion(task.id)}
                  />
                ))
              ) : (
                <Text style={styles.emptyText}>No morning tasks</Text>
              )}
            </View>
            
            {/* Afternoon Tasks */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Cloud size={20} color={colors.info} />
                <Text style={styles.sectionTitle}>Afternoon</Text>
                <Pressable 
                  style={styles.addSectionButton}
                  onPress={() => addTask({
                    title: "New afternoon task",
                    priority: "medium",
                    category: "personal",
                    timeOfDay: "afternoon",
                    dueDate: selectedDate,
                  })}
                >
                  <Plus size={16} color={colors.primary} />
                </Pressable>
              </View>
              
              {afternoonTasks.length > 0 ? (
                afternoonTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskCompletion(task.id)}
                  />
                ))
              ) : (
                <Text style={styles.emptyText}>No afternoon tasks</Text>
              )}
            </View>
            
            {/* Evening Tasks */}
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Moon size={20} color={colors.primary} />
                <Text style={styles.sectionTitle}>Evening</Text>
                <Pressable 
                  style={styles.addSectionButton}
                  onPress={() => addTask({
                    title: "New evening task",
                    priority: "medium",
                    category: "personal",
                    timeOfDay: "evening",
                    dueDate: selectedDate,
                  })}
                >
                  <Plus size={16} color={colors.primary} />
                </Pressable>
              </View>
              
              {eveningTasks.length > 0 ? (
                eveningTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskCompletion(task.id)}
                  />
                ))
              ) : (
                <Text style={styles.emptyText}>No evening tasks</Text>
              )}
            </View>
          </>
        ) : (
          // Kanban View
          <View style={styles.kanbanContainer}>
            <View style={styles.kanbanColumn}>
              <View style={styles.kanbanHeader}>
                <CheckSquare size={18} color={colors.textSecondary} />
                <Text style={styles.kanbanTitle}>To Do</Text>
              </View>
              
              {getTasksForDate(selectedDate)
                .filter(task => !task.isCompleted)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskCompletion(task.id)}
                  />
                ))}
              
              <Button
                title="Add Task"
                icon={<Plus size={16} color={colors.background} />}
                size="small"
                style={styles.kanbanAddButton}
                onPress={handleAddTask}
              />
            </View>
            
            <View style={styles.kanbanColumn}>
              <View style={styles.kanbanHeader}>
                <CheckSquare size={18} color={colors.success} />
                <Text style={styles.kanbanTitle}>Done</Text>
              </View>
              
              {getTasksForDate(selectedDate)
                .filter(task => task.isCompleted)
                .map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskCompletion(task.id)}
                  />
                ))}
            </View>
          </View>
        )}
        
        {/* Weekly Goals */}
        <View style={styles.goalsSection}>
          <SectionHeader 
            title="Weekly Goals" 
            onPress={() => {}} 
          />
          
          <View style={styles.goalCard}>
            <View style={styles.goalIconContainer}>
              <Calendar size={24} color={colors.primary} />
            </View>
            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>Set Weekly Goals</Text>
              <Text style={styles.goalDescription}>
                Plan your week ahead with clear objectives and milestones
              </Text>
              <Button
                title="Set Goals"
                size="small"
                style={styles.goalButton}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  addButton: {
    marginRight: 16,
  },
  dateHeader: {
    padding: 16,
    backgroundColor: colors.background,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  viewToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: colors.background,
  },
  viewToggleButtonActive: {
    backgroundColor: colors.primaryLight,
  },
  viewToggleText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },
  viewToggleTextActive: {
    color: colors.primary,
    fontWeight: '500',
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: colors.background,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  addSectionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: 16,
  },
  kanbanContainer: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  kanbanColumn: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
    maxHeight: 500,
  },
  kanbanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  kanbanTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  kanbanAddButton: {
    marginTop: 8,
  },
  goalsSection: {
    marginBottom: 16,
  },
  goalCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  goalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  goalContent: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  goalDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  goalButton: {
    alignSelf: 'flex-start',
  },
  bottomPadding: {
    height: 40,
  },
});
