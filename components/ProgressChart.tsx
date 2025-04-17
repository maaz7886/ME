import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

interface ProgressChartProps {
  data: {
    label: string;
    value: number;
    color: string;
    maxValue?: number;
  }[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const maxValue = item.maxValue || 100;
        const percentage = Math.min(100, Math.max(0, (item.value / maxValue) * 100));
        
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>
                {item.value}{item.maxValue ? `/${item.maxValue}` : '%'}
              </Text>
            </View>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${percentage}%`, backgroundColor: item.color }
                ]} 
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  barContainer: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
