import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { BookText, Flame, BookOpen, Calendar } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { usePrayerStore } from '@/store/prayerStore';
import { useHabitStore } from '@/store/habitStore';
import { useTaskStore } from '@/store/taskStore';

import ProgressCircle from '@/components/ProgressCircle';
import StatCard from '@/components/StatCard';
import SectionHeader from '@/components/SectionHeader';
import CountdownTimer from '@/components/CountdownTimer';
import { ProgressChart } from '@/components/ProgressChart';

export default function StatsScreen() {
  // Stores
  const { getPrayerStats } = usePrayerStore();
  const { habits } = useHabitStore();
  const { getTaskStats } = useTaskStore();
  
  // Stats
  const prayerStats = getPrayerStats();
  const taskStats = getTaskStats();
  
  // Calculate overall habit completion rate
  const totalHabits = habits.length;
  const habitsWithStreak = habits.filter(h => h.streak > 0).length;
  const habitCompletionRate = totalHabits > 0 
    ? (habitsWithStreak / totalHabits) * 100 
    : 0;
  
  // Revolution countdown
  const revolutionStartDate = '2023-04-16'; // Example start date
  const revolutionEndDate = '2026-04-16'; // Target date
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Statistics' }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Revolution Progress */}
        <CountdownTimer 
          targetDate={revolutionEndDate} 
          startDate={revolutionStartDate}
          title="Revolution Progress"
        />
        
        {/* Overall Stats */}
        <SectionHeader title="Overall Progress" />
        <View style={styles.overallContainer}>
          <View style={styles.progressCircleContainer}>
            <ProgressCircle 
              progress={prayerStats.completionRate} 
              size={120}
              color={colors.primary}
            >
              <View style={styles.circleContent}>
                <BookText size={24} color={colors.primary} />
                <Text style={styles.circleText}>
                  {Math.round(prayerStats.completionRate)}%
                </Text>
              </View>
            </ProgressCircle>
            <Text style={styles.progressLabel}>Prayer</Text>
          </View>
          
          <View style={styles.progressCircleContainer}>
            <ProgressCircle 
              progress={habitCompletionRate} 
              size={120}
              color={colors.secondary}
            >
              <View style={styles.circleContent}>
                <Flame size={24} color={colors.secondary} />
                <Text style={[styles.circleText, { color: colors.secondary }]}>
                  {Math.round(habitCompletionRate)}%
                </Text>
              </View>
            </ProgressCircle>
            <Text style={styles.progressLabel}>Habits</Text>
          </View>
          
          <View style={styles.progressCircleContainer}>
            <ProgressCircle 
              progress={taskStats.completionRate} 
              size={120}
              color={colors.info}
            >
              <View style={styles.circleContent}>
                <BookOpen size={24} color={colors.info} />
                <Text style={[styles.circleText, { color: colors.info }]}>
                  {Math.round(taskStats.completionRate)}%
                </Text>
              </View>
            </ProgressCircle>
            <Text style={styles.progressLabel}>Tasks</Text>
          </View>
        </View>
        
        {/* Prayer Stats */}
        <SectionHeader title="Prayer Statistics" />
        <View style={styles.chartContainer}>
          <ProgressChart 
            data={[
              {
                label: 'Fajr',
                value: 80,
                color: colors.fajr,
              },
              {
                label: 'Dhuhr',
                value: 90,
                color: colors.dhuhr,
              },
              {
                label: 'Asr',
                value: 85,
                color: colors.asr,
              },
              {
                label: 'Maghrib',
                value: 95,
                color: colors.maghrib,
              },
              {
                label: 'Isha',
                value: 75,
                color: colors.isha,
              },
            ]}
          />
        </View>
        
        <View style={styles.statsGrid}>
          <StatCard
            title="Completion Rate"
            value={`${Math.round(prayerStats.completionRate)}%`}
            subtitle="Overall prayers completed"
            icon={<BookText size={16} color={colors.primary} />}
          />
          <StatCard
            title="Current Streak"
            value={prayerStats.streak}
            subtitle="Days in a row"
            icon={<Flame size={16} color={colors.secondary} />}
            color={colors.secondary}
          />
          <StatCard
            title="Total Prayers"
            value={prayerStats.completedPrayers}
            subtitle="Prayers completed"
            icon={<Calendar size={16} color={colors.info} />}
            color={colors.info}
          />
        </View>
        
        {/* Habit Stats */}
        <SectionHeader title="Habit Statistics" />
        <View style={styles.statsGrid}>
          <StatCard
            title="Active Habits"
            value={totalHabits}
            subtitle="Total habits tracked"
            icon={<BookOpen size={16} color={colors.primary} />}
          />
          <StatCard
            title="Streak Habits"
            value={habitsWithStreak}
            subtitle="Habits with active streaks"
            icon={<Flame size={16} color={colors.secondary} />}
            color={colors.secondary}
          />
          <StatCard
            title="Completion Rate"
            value={`${Math.round(habitCompletionRate)}%`}
            subtitle="Overall completion"
            icon={<Calendar size={16} color={colors.info} />}
            color={colors.info}
          />
        </View>
        
        {/* Task Stats */}
        <SectionHeader title="Task Statistics" />
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Tasks"
            value={taskStats.totalTasks}
            subtitle="All tasks created"
            icon={<BookOpen size={16} color={colors.primary} />}
          />
          <StatCard
            title="Completed"
            value={taskStats.completedTasks}
            subtitle="Tasks completed"
            icon={<Flame size={16} color={colors.secondary} />}
            color={colors.secondary}
          />
          <StatCard
            title="Completion Rate"
            value={`${Math.round(taskStats.completionRate)}%`}
            subtitle="Overall completion"
            icon={<Calendar size={16} color={colors.info} />}
            color={colors.info}
          />
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
  overallContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: colors.background,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  progressCircleContainer: {
    alignItems: 'center',
  },
  circleContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  chartContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  bottomPadding: {
    height: 40,
  },
});
