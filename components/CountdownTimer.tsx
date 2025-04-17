import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { Clock } from 'lucide-react-native';

type CountdownTimerProps = {
  targetDate: string;
  startDate: string;
  title: string;
};

export default function CountdownTimer({ targetDate, startDate, title }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    progress: 0,
  });
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const start = new Date(startDate).getTime();
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      
      // Calculate total duration in milliseconds
      const totalDuration = target - start;
      const elapsed = now - start;
      const remaining = target - now;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(1, Math.max(0, elapsed / totalDuration));
      
      // Calculate total days in the period
      const totalDays = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));
      
      if (remaining > 0) {
        // Calculate time units
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds, totalDays, progress });
      } else {
        // Countdown finished
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalDays, progress: 1 });
      }
    };
    
    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, startDate]);
  
  // Format time units to always have two digits
  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Clock size={20} color={colors.primary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.timerContainer}>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{timeLeft.days}</Text>
          <Text style={styles.timeLabel}>Days</Text>
        </View>
        <Text style={styles.timeSeparator}>:</Text>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{formatTimeUnit(timeLeft.hours)}</Text>
          <Text style={styles.timeLabel}>Hours</Text>
        </View>
        <Text style={styles.timeSeparator}>:</Text>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{formatTimeUnit(timeLeft.minutes)}</Text>
          <Text style={styles.timeLabel}>Mins</Text>
        </View>
        <Text style={styles.timeSeparator}>:</Text>
        <View style={styles.timeUnit}>
          <Text style={styles.timeValue}>{formatTimeUnit(timeLeft.seconds)}</Text>
          <Text style={styles.timeLabel}>Secs</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${timeLeft.progress * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(timeLeft.progress * 100)}% complete • {timeLeft.totalDays} days total
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeUnit: {
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  timeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  timeSeparator: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
