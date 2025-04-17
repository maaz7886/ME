import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Modal, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { BookText, BookOpen, Moon, Sun, ArrowLeft, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { usePrayerStore } from '@/store/prayerStore';
import { getToday } from '@/utils/date';
import { DateSelector } from '@/components/DateSelector';
import PrayerCard from '@/components/PrayerCard';
import { Button } from '@/components/Button';
import { ProgressChart } from '@/components/ProgressChart';

export default function SpiritualDashboardScreen() {
  const router = useRouter();
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState(today);
  
  const { prayers, togglePrayer, getPrayersForDate, getCompletionRate } = usePrayerStore();
  
  const todaysPrayers = getPrayersForDate(selectedDate);
  const completionRate = getCompletionRate(selectedDate);
  
  // Modal states
  const [showQuranModal, setShowQuranModal] = useState(false);
  const [quranGoal, setQuranGoal] = useState('');
  const [showAdhkarModal, setShowAdhkarModal] = useState(false);
  const [adhkarType, setAdhkarType] = useState('');
  
  const handleSetReadingGoal = () => {
    setShowQuranModal(true);
  };
  
  const saveQuranGoal = () => {
    if (!quranGoal) {
      Alert.alert("Invalid Goal", "Please enter a valid goal");
      return;
    }
    
    setShowQuranModal(false);
    Alert.alert("Success", `Reading goal set to ${quranGoal} pages/day`);
  };
  
  const handleStartAdhkar = (type) => {
    setAdhkarType(type);
    setShowAdhkarModal(true);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Spiritual Dashboard',
          headerLeft: () => (
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
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
        
        {/* Prayer Completion Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Prayer Completion</Text>
          <ProgressChart 
            data={[
              {
                label: 'Fajr',
                value: todaysPrayers.find(p => p.name === 'Fajr')?.isCompleted ? 100 : 0,
                color: colors.fajr || '#4CAF50',
              },
              {
                label: 'Dhuhr',
                value: todaysPrayers.find(p => p.name === 'Dhuhr')?.isCompleted ? 100 : 0,
                color: colors.dhuhr || '#2196F3',
              },
              {
                label: 'Asr',
                value: todaysPrayers.find(p => p.name === 'Asr')?.isCompleted ? 100 : 0,
                color: colors.asr || '#FFC107',
              },
              {
                label: 'Maghrib',
                value: todaysPrayers.find(p => p.name === 'Maghrib')?.isCompleted ? 100 : 0,
                color: colors.maghrib || '#FF9800',
              },
              {
                label: 'Isha',
                value: todaysPrayers.find(p => p.name === 'Isha')?.isCompleted ? 100 : 0,
                color: colors.isha || '#9C27B0',
              },
            ]}
          />
          <View style={styles.completionRateContainer}>
            <Text style={styles.completionRateLabel}>Overall Completion</Text>
            <Text style={styles.completionRateValue}>{Math.round(completionRate)}%</Text>
          </View>
        </View>
        
        {/* Prayer Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prayer Tracker</Text>
          <View style={styles.prayersContainer}>
            {todaysPrayers.map((prayer) => (
              <PrayerCard
                key={prayer.id}
                prayer={prayer}
                onToggle={() => togglePrayer(prayer.name, selectedDate)}
              />
            ))}
          </View>
        </View>
        
        {/* Quran Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quran Tracker</Text>
          <View style={styles.quranCard}>
            <View style={styles.quranIconContainer}>
              <BookOpen size={24} color={colors.primary} />
            </View>
            <View style={styles.quranContent}>
              <Text style={styles.quranTitle}>Daily Reading</Text>
              <Text style={styles.quranSubtitle}>Track your Quran reading progress</Text>
              <Button 
                title="Set Reading Goal" 
                size="small" 
                style={styles.quranButton}
                onPress={handleSetReadingGoal}
              />
            </View>
          </View>
        </View>
        
        {/* Adhkar Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Adhkar</Text>
          <View style={styles.adhkarContainer}>
            <View style={styles.adhkarCard}>
              <View style={[styles.adhkarIconContainer, { backgroundColor: colors.primaryLight }]}>
                <Sun size={24} color={colors.primary} />
              </View>
              <Text style={styles.adhkarTitle}>Morning Adhkar</Text>
              <Button 
                title="Start" 
                size="small" 
                style={styles.adhkarButton}
                onPress={() => handleStartAdhkar('morning')}
              />
            </View>
            
            <View style={styles.adhkarCard}>
              <View style={[styles.adhkarIconContainer, { backgroundColor: colors.secondaryLight }]}>
                <Moon size={24} color={colors.secondary} />
              </View>
              <Text style={styles.adhkarTitle}>Evening Adhkar</Text>
              <Button 
                title="Start" 
                size="small" 
                variant="secondary"
                style={styles.adhkarButton}
                onPress={() => handleStartAdhkar('evening')}
              />
            </View>
          </View>
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Quran Goal Modal */}
      <Modal
        visible={showQuranModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowQuranModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Set Reading Goal</Text>
              <Pressable onPress={() => setShowQuranModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.modalLabel}>Pages per day:</Text>
            <TextInput
              style={styles.modalInput}
              value={quranGoal}
              onChangeText={setQuranGoal}
              keyboardType="numeric"
              placeholder="Enter number of pages"
              placeholderTextColor={colors.textSecondary}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                style={styles.modalButton}
                onPress={() => setShowQuranModal(false)}
              />
              <Button
                title="Save"
                style={styles.modalButton}
                onPress={saveQuranGoal}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Adhkar Modal */}
      <Modal
        visible={showAdhkarModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAdhkarModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {adhkarType === 'morning' ? 'Morning Adhkar' : 'Evening Adhkar'}
              </Text>
              <Pressable onPress={() => setShowAdhkarModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.adhkarText}>
              {adhkarType === 'morning' 
                ? "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَٰهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ."
                : "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَٰهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ."
              }
            </Text>
            
            <Text style={styles.adhkarTranslation}>
              {adhkarType === 'morning'
                ? "We have reached the morning and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner, to Him belongs all sovereignty and praise and He is over all things omnipotent."
                : "We have reached the evening and at this very time all sovereignty belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone, without any partner, to Him belongs all sovereignty and praise and He is over all things omnipotent."
              }
            </Text>
            
            <Text style={styles.adhkarCount}>Repeat: 1 time</Text>
            
            <Button
              title="Complete"
              style={[styles.modalButton, { marginTop: 24 }]}
              onPress={() => {
                setShowAdhkarModal(false);
                Alert.alert("Completed", `${adhkarType === 'morning' ? 'Morning' : 'Evening'} Adhkar completed!`);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  backButton: {
    marginRight: 16,
  },
  chartContainer: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  completionRateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  completionRateLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  completionRateValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  prayersContainer: {
    paddingHorizontal: 16,
  },
  quranCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  quranIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quranContent: {
    flex: 1,
  },
  quranTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  quranSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  quranButton: {
    alignSelf: 'flex-start',
  },
  adhkarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  adhkarCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  adhkarIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  adhkarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  adhkarButton: {
    width: '100%',
  },
  bottomPadding: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  adhkarText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 16,
  },
  adhkarTranslation: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  adhkarCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
});
