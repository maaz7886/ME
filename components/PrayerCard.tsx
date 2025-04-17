import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Prayer } from '@/types/prayer';

type PrayerCardProps = {
  prayer: Prayer;
  onToggle: () => void;
};

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, onToggle }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.9 : 1 },
        prayer.isCompleted && styles.completed
      ]}
      onPress={onToggle}
    >
      <View style={[styles.indicator, { backgroundColor: prayer.color }]} />
      <Text style={styles.name}>{prayer.name}</Text>
      {prayer.time && <Text style={styles.time}>{prayer.time}</Text>}
      <View style={[
        styles.checkContainer,
        prayer.isCompleted && { backgroundColor: prayer.color }
      ]}>
        {prayer.isCompleted && <Check size={16} color="#fff" />}
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
  indicator: {
    width: 8,
    height: 32,
    borderRadius: 4,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  time: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 8,
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

export default PrayerCard;
