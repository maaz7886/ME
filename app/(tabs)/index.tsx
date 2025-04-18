import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { Flame, BookOpen, BookText } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { getToday, getFullDate } from '@/utils/date';
import { usePrayerStore } from '@/store/prayerStore';
import { useHabitStore } from '@/store/habitStore';
import { useTaskStore } from '@/store/taskStore';
import { getRandomQuote } from '@/constants/quotes';

import CountdownTimer from '@/components/CountdownTimer';
import PrayerCard from '@/components/PrayerCard';
import HabitCard from '@/components/HabitCard';
import TaskCard from '@/components/TaskCard';
import SectionHeader from '@/components/SectionHeader';
import QuoteCard from '@/components/QuoteCard';
import StatCard from '@/components/StatCard';

export default function HomeScreen() {
  const today = getToday();
  const [quote, setQuote] = useState(getRandomQuote('islamic'));
  
  // Stores
  const { prayers, togglePrayer, getCompletionRate } = usePrayerStore();
  const { habits, toggleHabitCompletion, getCompletedHabitsForDate } = useHabitStore();
  const { tasks, toggleTaskCompletion, getTasksForDate } = useTaskStore();
  
  // Data
  const todaysPrayers = prayers;
  const todaysHabits = habits.slice(0, 3); // Show only first 3 habits
  const todaysTasks = getTasksForDate(today).slice(0, 3); // Show only first 3 tasks
  
  const prayerCompletionRate = getCompletionRate(today);
  const completedHabits = getCompletedHabitsForDate(today);
  
  // Revolution countdown - set to one year from now
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  const revolutionEndDate = oneYearFromNow.toISOString().split('T')[0];
  const revolutionStartDate = today;
  
  useEffect(() => {
    // Refresh quote daily
    const interval = setInterval(() => {
      setQuote(getRandomQuote('islamic'));
    }, 86400000); // 24 hours
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'ME App Dashboard',
          headerTitleStyle: styles.headerTitle,
        }}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Date and Greeting */}
        <View style={styles.header}>
          <Text style={styles.date}>{getFullDate(new Date())}</Text>
          <Text style={styles.greeting}>Assalamu Alaikum</Text>
        </View>
        
        {/* Revolution Countdown */}
        <CountdownTimer 
          targetDate={revolutionEndDate} 
          startDate={revolutionStartDate}
          title="One Year Countdown"
        />
        
        {/* Daily Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            title="Prayer"
            value={`${Math.round(prayerCompletionRate)}%`}
            subtitle="Today's completion"
            icon={<BookText size={16} color={colors.primary} />}
          />
          <StatCard
            title="Habits"
            value={`${completedHabits.length}/${habits.length}`}
            subtitle="Completed today"
            icon={<Flame size={16} color={colors.secondary} />}
            color={colors.secondary}
          />
          <StatCard
            title="Tasks"
            value={`${todaysTasks.filter(t => t.isCompleted).length}/${todaysTasks.length}`}
            subtitle="Completed today"
            icon={<BookOpen size={16} color={colors.info} />}
            color={colors.info}
          />
        </View>
        
        {/* Prayer Tracker */}
        <SectionHeader 
          title="Prayer Tracker" 
          onPress={() => {}} 
        />
        <View style={styles.prayersContainer}>
          {todaysPrayers.map((prayer) => (
            <PrayerCard
              key={prayer.id}
              prayer={prayer}
              onToggle={() => togglePrayer(prayer.name)}
            />
          ))}
        </View>
        
        {/* Habits */}
        <SectionHeader 
          title="Today's Habits" 
          onPress={() => {}} 
        />
        <View style={styles.habitsContainer}>
          {todaysHabits.length > 0 ? (
            todaysHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={completedHabits.some(h => h.id === habit.id)}
                onToggle={() => toggleHabitCompletion(habit.id, today)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No habits added yet</Text>
          )}
        </View>
        
        {/* Tasks */}
        <SectionHeader 
          title="Today's Tasks" 
          onPress={() => {}} 
        />
        <View style={styles.tasksContainer}>
          {todaysTasks.length > 0 ? (
            todaysTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTaskCompletion(task.id)}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No tasks for today</Text>
          )}
        </View>
        
        {/* Quote of the Day */}
        <QuoteCard
          quote={quote.text}
          author={quote.author}
          source={quote.source}
        />
        
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
  scrollView: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 12,
  },
  prayersContainer: {
    paddingHorizontal: 16,
  },
  habitsContainer: {
    paddingHorizontal: 16,
  },
  tasksContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    padding: 16,
  },
  bottomPadding: {
    height: 40,
  },
});