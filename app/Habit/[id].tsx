import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Pressable, 
  Alert 
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useHabitStore } from '@/store/habitStore';
import { ProgressChart } from '@/components/ProgressChart';
import { Button } from '@/components/Button';
import { 
  Calendar, 
  Trash2, 
  Edit, 
  ArrowLeft, 
  Trophy, 
  Flame, 
  BarChart 
} from 'lucide-react-native';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const habit = useHabitStore((state) => state.getHabitById(id as string));
  const getHabitStats = useHabitStore((state) => state.getHabitStats);
  const removeHabit = useHabitStore((state) => state.removeHabit);
  
  if (!habit) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Habit not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </SafeAreaView>
    );
  }
  
  const stats = getHabitStats(habit.id);
  
  const handleDeleteHabit = () => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: () => {
            removeHabit(habit.id);
            router.back();
          },
          style: "destructive"
        }
      ]
    );
  };
  
  const handleEditHabit = () => {
    // In a real app, you would navigate to an edit screen
    router.back();
  };
  
  const Icon = require('lucide-react-native')[habit.icon];
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: habit.name,
          headerLeft: () => (
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={[styles.iconContainer, { backgroundColor: habit.color + '20' }]}>
              <Icon size={32} color={habit.color} />
            </View>
            <Text style={styles.title}>{habit.name}</Text>
            {habit.description && (
              <Text style={styles.description}>{habit.description}</Text>
            )}
          </View>
          
          <View style={styles.statsCardsContainer}>
            <View style={styles.statsCard}>
              <View style={[styles.statsIconContainer, { backgroundColor: colors.primaryLight }]}>
                <Calendar size={24} color={colors.primary} />
              </View>
              <Text style={styles.statsValue}>{stats.totalCompletions}</Text>
              <Text style={styles.statsLabel}>Completions</Text>
            </View>
            
            <View style={styles.statsCard}>
              <View style={[styles.statsIconContainer, { backgroundColor: colors.secondaryLight }]}>
                <Flame size={24} color={colors.secondary} />
              </View>
              <Text style={styles.statsValue}>{stats.currentStreak}</Text>
              <Text style={styles.statsLabel}>Current Streak</Text>
            </View>
            
            <View style={styles.statsCard}>
              <View style={[styles.statsIconContainer, { backgroundColor: '#E8F5E9' }]}>
                <Trophy size={24} color="#4CAF50" />
              </View>
              <Text style={styles.statsValue}>{stats.longestStreak}</Text>
              <Text style={styles.statsLabel}>Best Streak</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completion Rate</Text>
            <ProgressChart 
              data={[
                {
                  label: 'Completion Rate',
                  value: stats.completionRate,
                  color: habit.color,
                },
              ]}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityContainer}>
              {habit.completedDates.length > 0 ? (
                habit.completedDates
                  .slice(-5)
                  .reverse()
                  .map((date, index) => (
                    <View key={index} style={styles.activityItem}>
                      <View style={[styles.activityDot, { backgroundColor: habit.color }]} />
                      <Text style={styles.activityDate}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Text>
                    </View>
                  ))
              ) : (
                <Text style={styles.emptyText}>No activity yet</Text>
              )}
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <Button
              title="Edit"
              onPress={handleEditHabit}
              variant="outline"
              icon={<Edit size={18} color={colors.primary} />}
              style={styles.actionButton}
            />
            <Button
              title="Delete"
              onPress={handleDeleteHabit}
              variant="outline"
              style={[styles.actionButton, styles.deleteButton]}
              textStyle={{ color: colors.error }}
              icon={<Trash2 size={18} color={colors.error} />}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  statsCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statsCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  activityContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  activityDate: {
    fontSize: 14,
    color: colors.text,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  actionButton: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteButton: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: 18,
    color: colors.error,
    textAlign: 'center',
    marginVertical: 24,
  },
});
