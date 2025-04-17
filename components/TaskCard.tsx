import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check, Clock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Task, TaskPriority } from '@/types/task';

type TaskCardProps = {
  task: Task;
  onToggle: () => void;
  onPress?: () => void;
};

const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'high':
      return colors.error;
    case 'medium':
      return colors.warning;
    case 'low':
      return colors.success;
    default:
      return colors.gray;
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onPress }) => {
  const priorityColor = getPriorityColor(task.priority);
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.9 : 1 },
        task.isCompleted && styles.completed
      ]}
      onPress={onPress}
    >
      <Pressable
        style={[
          styles.checkContainer,
          task.isCompleted && { backgroundColor: priorityColor }
        ]}
        onPress={onToggle}
        hitSlop={10}
      >
        {task.isCompleted && <Check size={16} color="#fff" />}
      </Pressable>
      
      <View style={styles.content}>
        <Text 
          style={[
            styles.title, 
            task.isCompleted && styles.completedText
          ]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        
        {task.description && (
          <Text 
            style={[
              styles.description,
              task.isCompleted && styles.completedText
            ]}
            numberOfLines={1}
          >
            {task.description}
          </Text>
        )}
      </View>
      
      <View style={styles.metaContainer}>
        {task.dueDate && (
          <View style={styles.dueContainer}>
            <Clock size={12} color={colors.textSecondary} />
            <Text style={styles.dueText}>
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </Text>
          </View>
        )}
        
        <View 
          style={[
            styles.priorityIndicator, 
            { backgroundColor: priorityColor }
          ]} 
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  completed: {
    backgroundColor: colors.backgroundSecondary,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  dueText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default TaskCard;
