import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { getDaysInCurrentWeek, getDayName, getDayNumber, formatDate, isToday } from '@/utils/date';

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ 
  selectedDate, 
  onSelectDate 
}) => {
  const [weekDays, setWeekDays] = useState<Date[]>([]);
  
  useEffect(() => {
    setWeekDays(getDaysInCurrentWeek());
  }, []);
  
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {weekDays.map((day) => {
          const dateString = formatDate(day);
          const isSelected = dateString === selectedDate;
          const isTodayDate = isToday(dateString);
          
          return (
            <Pressable
              key={dateString}
              style={[
                styles.dayContainer,
                isSelected && styles.selectedDayContainer,
              ]}
              onPress={() => onSelectDate(dateString)}
            >
              <Text style={[
                styles.dayName,
                isSelected && styles.selectedDayText,
                isTodayDate && styles.todayText,
              ]}>
                {getDayName(day)}
              </Text>
              <View style={[
                styles.dayNumberContainer,
                isSelected && styles.selectedDayNumberContainer,
                isTodayDate && !isSelected && styles.todayNumberContainer,
              ]}>
                <Text style={[
                  styles.dayNumber,
                  isSelected && styles.selectedDayNumber,
                  isTodayDate && !isSelected && styles.todayNumber,
                ]}>
                  {getDayNumber(day)}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  dayContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 45,
  },
  selectedDayContainer: {
    opacity: 1,
  },
  dayName: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  selectedDayText: {
    color: colors.primary,
    fontWeight: '600',
  },
  todayText: {
    color: colors.primary,
    fontWeight: '600',
  },
  dayNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
  },
  selectedDayNumberContainer: {
    backgroundColor: colors.primary,
  },
  todayNumberContainer: {
    backgroundColor: colors.primaryLight,
  },
  dayNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  selectedDayNumber: {
    color: colors.background,
  },
  todayNumber: {
    color: colors.primary,
  },
});
