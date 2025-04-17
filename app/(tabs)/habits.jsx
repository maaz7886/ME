import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Plus, Filter } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { getToday, getDaysInCurrentWeek, getDayName, getDayNumber } from '@/utils/date';
import { useHabitStore } from '@/store/habitStore';

import HabitCard from '@/components/HabitCard';
import SectionHeader from '@/components/SectionHeader';
import { EmptyState } from '@/components/EmptyState';

const categoryLabels= {
  spiritual: 'Spiritual',
  health: 'Health',
  learning: 'Learning',
  finance: 'Finance',
  productivity: 'Productivity',
  other: 'Other',
};

export default function HabitsScreen() {
  const router = useRouter();
  const today = getToday();
  const weekDays = getDaysInCurrentWeek();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { habits, toggleHabitCompletion, getCompletedHabitsForDate } = useHabitStore();
  
  const completedHabits = getCompletedHabitsForDate(selectedDate);
  
  const filteredHabits = selectedCategory === 'all'
    ? habits
    : habits.filter(habit => habit.category === selectedCategory);
  
  const categories= ['all', 'spiritual', 'health', 'learning', 'finance', 'productivity', 'other'];
  
  const handleAddHabit = () => {
    router.push('/new-habit');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Habits',
          headerRight: () => (
            <Pressable style={styles.addButton} onPress={handleAddHabit}>
              <Plus size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Week Day Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekDaysContainer}
        >
          {weekDays.map((date) => {
            const dateStr = date.toISOString().split('T')[0];
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === today;
            
            return (
              <Pressable
                key={dateStr}
                style={[
                  styles.dayItem,
                  isSelected && styles.selectedDayItem,
                  isToday && styles.todayItem,
                ]}
                onPress={() => setSelectedDate(dateStr)}
              >
                <Text style={[
                  styles.dayName,
                  isSelected && styles.selectedDayText,
                ]}>
                  {getDayName(date)}
                </Text>
                <Text style={[
                  styles.dayNumber,
                  isSelected && styles.selectedDayText,
                ]}>
                  {getDayNumber(date)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        
        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryItem,
                selectedCategory === category && styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
                {category === 'all' ? 'All' : categoryLabels[category]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        
        {/* Habits List */}
        <View style={styles.habitsContainer}>
          <SectionHeader 
            title={`${selectedDate === today ? "Today's" : "Selected Day's"} Habits`}
          />
          
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={completedHabits.some(h => h.id === habit.id)}
                onToggle={() => toggleHabitCompletion(habit.id, selectedDate)}
              />
            ))
          ) : (
            <EmptyState
              title="No habits found"
              description="Start building positive habits by adding your first habit"
              buttonTitle="Add Habit"
              onButtonPress={handleAddHabit}
              icon={<Plus size={40} color={colors.primary} />}
            />
          )}
        </View>
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
  weekDaysContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dayItem: {
    width: 50,
    height: 70,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  selectedDayItem: {
    backgroundColor: colors.primary,
  },
  todayItem: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dayName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  selectedDayText: {
    color: colors.background,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 8,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.background,
    fontWeight: '500',
  },
  habitsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});
