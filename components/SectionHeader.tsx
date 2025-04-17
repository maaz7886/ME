import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

type SectionHeaderProps = {
  title: string;
  onPress?: () => void;
  actionText?: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onPress,
  actionText = 'View All',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onPress && (
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
          onPress={onPress}
        >
          <Text style={styles.actionText}>{actionText}</Text>
          <ChevronRight size={16} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: colors.primary,
    marginRight: 4,
  },
});

export default SectionHeader;
