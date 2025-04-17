import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, BarChart2, CheckSquare, Settings } from 'lucide-react-native';
import { colors, darkColors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settingsStore';

export default function TabsLayout() {
  const { darkMode } = useSettingsStore();
  const colorScheme = useColorScheme();
  
  // Use the user's preference from settings, or fall back to system preference
  const isDarkMode = darkMode;
  
  // Set the theme colors based on dark mode setting
  const theme = isDarkMode ? darkColors : colors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border,
        },
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <CheckSquare size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <BarChart2 size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
