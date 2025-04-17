import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Switch } from 'react-native';
import { Stack } from 'expo-router';
import { 
  User, 
  Bell, 
  Moon, 
  BookText, 
  BookOpen, 
  Flame, 
  Calendar, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  BookMarked,
  DollarSign,
  Brain
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settingsStore';
import { SettingsItem } from '@/components/SettingsItem';

export default function SettingsScreen() {
  const { 
    reminderEnabled, 
    toggleReminder, 
    darkMode, 
    toggleDarkMode 
  } = useSettingsStore();
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'Settings' }} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <User size={40} color={colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>User Name</Text>
            <Text style={styles.profileEmail}>user@example.com</Text>
          </View>
          <Pressable style={styles.editButton} onPress={() => {}}>
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>
        
        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <SettingsItem
            title="Notifications"
            description="Enable push notifications"
            icon={<Bell size={20} color={colors.primary} />}
            isSwitch
            switchValue={reminderEnabled}
            onSwitchChange={toggleReminder}
          />
          
          <SettingsItem
            title="Dark Mode"
            description="Switch between light and dark theme"
            icon={<Moon size={20} color={colors.primary} />}
            isSwitch
            switchValue={darkMode}
            onSwitchChange={toggleDarkMode}
          />
        </View>
        
        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          
          <SettingsItem
            title="Prayer Settings"
            description="Configure prayer times and notifications"
            icon={<BookText size={20} color={colors.primary} />}
            onPress={() => {}}
          />
          
          <SettingsItem
            title="Quran Tracker"
            description="Set reading and memorization goals"
            icon={<BookMarked size={20} color={colors.primary} />}
            onPress={() => {}}
          />
          
          <SettingsItem
            title="Habit Categories"
            description="Customize habit categories and icons"
            icon={<Flame size={20} color={colors.primary} />}
            onPress={() => {}}
          />
          
          <SettingsItem
            title="Task Templates"
            description="Create and manage task templates"
            icon={<Calendar size={20} color={colors.primary} />}
            onPress={() => {}}
          />
          
          <SettingsItem
            title="Finance Goals"
            description="Set savings and investment targets"
            icon={<DollarSign size={20} color={colors.primary} />}
            onPress={() => {}}
          />
          
          <SettingsItem
            title="Learning Tracker"
            description="Track books, courses, and skills"
            icon={<Brain size={20} color={colors.primary} />}
            onPress={() => {}}
          />
        </View>
        
        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <SettingsItem
            title="Help & Support"
            description="Get help and contact support"
            icon={<HelpCircle size={20} color={colors.primary} />}
            onPress={() => {}}
          />
          
          <SettingsItem
            title="Sign Out"
            icon={<LogOut size={20} color={colors.error} />}
            onPress={() => {}}
          />
        </View>
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>ME App v1.0.0</Text>
          <Text style={styles.appCopyright}>
            © 2023-2026 Personal Revolution
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
    marginBottom: 16,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
  },
  editButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  section: {
    backgroundColor: colors.background,
    marginBottom: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  appInfo: {
    alignItems: 'center',
    padding: 24,
  },
  appVersion: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
