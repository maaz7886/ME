import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check, Flame } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Habit } from '@/types/habit';

type HabitCardProps = {
  habit: Habit;
  isCompleted: boolean;
  onToggle: () => void;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, isCompleted, onToggle }) => {
  const Icon = require('lucide-react-native')[habit.icon];
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.9 : 1 },
        isCompleted && styles.completed
      ]}
      onPress={onToggle}
    >
      <View style={[styles.colorIndicator, { backgroundColor: habit.color }]} />
      <View style={styles.iconContainer}>
        <Icon size={20} color={habit.color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{habit.name}</Text>
        {habit.description && (
          <Text style={styles.description} numberOfLines={1}>
            {habit.description}
          </Text>
        )}
      </View>
      <View style={styles.rightContent}>
        {habit.streak > 0 && (
          <View style={styles.streakContainer}>
            <Flame size={14} color={colors.secondary} />
            <Text style={styles.streakText}>{habit.streak}</Text>
          </View>
        )}
        <View style={[
          styles.checkContainer,
          isCompleted && { backgroundColor: habit.color }
        ]}>
          {isCompleted && <Check size={16} color="#fff" />}
        </View>
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
  colorIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
    marginRight: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
    marginLeft: 4,
  },
  checkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HabitCard;
