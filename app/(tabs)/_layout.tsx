import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '@/store/settingsStore';
import { colors, darkColors } from '@/constants/colors';

export default function RootLayout() {
  const { darkMode } = useSettingsStore();
  const colorScheme = useColorScheme();
  
  // Use the user's preference from settings, or fall back to system preference
  const isDarkMode = darkMode;
  
  // Set the theme colors based on dark mode setting
  const theme = isDarkMode ? darkColors : colors;
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.backgroundSecondary,
        },
      }}
    />
  );
}
