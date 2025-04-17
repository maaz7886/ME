import React from 'react';
import { StyleSheet, Text, View, Pressable, Switch } from 'react-native';
import { colors } from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';

interface SettingsItemProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  isSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

export const SettingsItem: React.FC<SettingsItemProps> = ({
  title,
  description,
  icon,
  onPress,
  rightElement,
  isSwitch = false,
  switchValue = false,
  onSwitchChange,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
      disabled={isSwitch && !onPress}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.rightContainer}>
        {isSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: colors.lightGray, true: colors.primary }}
            thumbColor={colors.background}
          />
        ) : rightElement ? (
          rightElement
        ) : onPress ? (
          <ChevronRight size={20} color={colors.gray} />
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  rightContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
