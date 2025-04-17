import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { 
  User, 
  Bell, 
  Moon, 
  BookText, 
  Flame, 
  Calendar, 
  HelpCircle, 
  LogOut,
  BookMarked,
  DollarSign,
  Brain,
  Clock
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useSettingsStore } from '@/store/settingsStore';
import { SettingsItem } from '@/components/SettingsItem';

export default function SettingsScreen() {
  const router = useRouter();
  const { 
    reminderEnabled, 
    toggleReminder, 
    darkMode, 
    toggleDarkMode,
    reminderTime,
    setReminderTime,
    weekStartsOn,
    setWeekStartsOn,
    showCompletedHabits,
    toggleShowCompletedHabits
  } = useSettingsStore();
  
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Sign Out", 
          onPress: () => {
            // Sign out logic would go here
            Alert.alert("Signed out successfully");
          },
          style: "destructive"
        }
      ]
    );
  };

  const handleTimeSettings = () => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      setShowTimePicker(true);
    } else {
      // Fallback for web
      const time = prompt("Enter reminder time (HH:MM format)", reminderTime);
      if (time) {
        setReminderTime(time);
      }
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      setReminderTime(`${hours}:${minutes}`);
    }
  };

  const handleWeekStartSettings = () => {
    Alert.alert(
      "Week Starts On",
      "Select the first day of the week",
      [
        {
          text: "Sunday",
          onPress: () => setWeekStartsOn(0)
        },
        {
          text: "Monday",
          onPress: () => setWeekStartsOn(1)
        }
      ]
    );
  };

  const handleProfilePress = () => {
    Alert.alert(
      "Profile",
      "Your profile information",
      [
        {
          text: "Edit Profile",
          onPress: () => {
            Alert.alert("Profile editing would be implemented here");
          }
        },
        {
          text: "Close",
          style: "cancel"
        }
      ]
    );
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    
    try {
      const [hours, minutes] = timeString.split(':');
      const h = parseInt(hours, 10);
      const m = parseInt(minutes, 10);
      
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      
      return `${hour12}:${minutes.padStart(2, '0')} ${period}`;
    } catch (error) {
      return timeString;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Settings" }} />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <SettingsItem 
            icon={<User size={22} color={colors.text} />}
            title="Profile"
            onPress={handleProfilePress}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <SettingsItem 
            icon={<Bell size={22} color={colors.text} />}
            title="Reminders"
            isSwitch={true}
            switchValue={reminderEnabled}
            onSwitchChange={toggleReminder}
            description="Get daily reminders to track your habits"
          />
          <SettingsItem 
            icon={<Clock size={22} color={colors.text} />}
            title="Reminder Time"
            description={formatTime(reminderTime)}
            onPress={handleTimeSettings}
          />
          <SettingsItem 
            icon={<Moon size={22} color={colors.text} />}
            title="Dark Mode"
            isSwitch={true}
            switchValue={darkMode}
            onSwitchChange={toggleDarkMode}
          />
          <SettingsItem 
            icon={<Calendar size={22} color={colors.text} />}
            title="Week Starts On"
            description={weekStartsOn === 0 ? "Sunday" : "Monday"}
            onPress={handleWeekStartSettings}
          />
          <SettingsItem 
            icon={<Flame size={22} color={colors.text} />}
            title="Show Completed Habits"
            isSwitch={true}
            switchValue={showCompletedHabits}
            onSwitchChange={toggleShowCompletedHabits}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <SettingsItem 
            icon={<DollarSign size={22} color={colors.text} />}
            title="Finance"
            onPress={() => router.push('/finance')}
          />
          <SettingsItem 
            icon={<BookText size={22} color={colors.text} />}
            title="Spiritual Growth"
            onPress={() => router.push('/spiritual')}
          />
          <SettingsItem 
            icon={<BookMarked size={22} color={colors.text} />}
            title="Learning"
            onPress={() => router.push('/learning')}
          />
          <SettingsItem 
            icon={<Brain size={22} color={colors.text} />}
            title="Personal Development"
            onPress={() => router.push('/development')}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <SettingsItem 
            icon={<HelpCircle size={22} color={colors.text} />}
            title="Help & FAQ"
            onPress={() => {
              Alert.alert("Help & FAQ", "This section would contain help articles and frequently asked questions.");
            }}
          />
        </View>
        
        <Pressable style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={22} color={colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
        
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
      
      {showTimePicker && (
        <DateTimePicker
          value={(() => {
            const [hours, minutes] = reminderTime.split(':');
            const date = new Date();
            date.setHours(parseInt(hours, 10));
            date.setMinutes(parseInt(minutes, 10));
            return date;
          })()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
