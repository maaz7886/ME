import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TextInput, 
  Pressable 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { habitIcons, habitColors } from '@/constants/habitIcons';
import { useHabitStore } from '@/store/habitStore';
import { Button } from '@/components/Button';
import { X } from 'lucide-react-native';
import { HabitCategory } from '@/types/habit';

export default function NewHabitScreen() {
  const router = useRouter();
  const addHabit = useHabitStore((state) => state.addHabit);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(habitIcons[0].name);
  const [selectedColor, setSelectedColor] = useState(habitColors[0]);
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory>('spiritual');
  
  const categories: { value: HabitCategory; label: string }[] = [
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' },
    { value: 'finance', label: 'Finance' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'other', label: 'Other' },
  ];
  
  const handleCreateHabit = () => {
    if (!name.trim()) return;
    
    addHabit({
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
      color: selectedColor,
      category: selectedCategory,
      frequency: {
        type: 'daily',
      },
    });
    
    router.back();
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'New Habit',
          headerRight: () => (
            <Pressable onPress={() => router.back()}>
              <X size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Drink water"
              value={name}
              onChangeText={setName}
              maxLength={50}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="e.g., Drink 8 glasses of water daily"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={200}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <Pressable
                  key={category.value}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.value && styles.selectedCategoryItem,
                  ]}
                  onPress={() => setSelectedCategory(category.value)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category.value && styles.selectedCategoryText,
                  ]}>
                    {category.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Icon</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.iconsContainer}
            >
              {habitIcons.map((icon) => (
                <Pressable
                  key={icon.name}
                  style={[
                    styles.iconItem,
                    selectedIcon === icon.name && styles.selectedIconItem,
                  ]}
                  onPress={() => setSelectedIcon(icon.name)}
                >
                  <View style={{ color: icon.color }}>
                    {React.createElement(
                      require('lucide-react-native')[icon.name],
                      { size: 24, color: icon.color }
                    )}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Color</Text>
            <View style={styles.colorsContainer}>
              {habitColors.map((color) => (
                <Pressable
                  key={color}
                  style={[
                    styles.colorItem,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorItem,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
          </View>
          
          <Button
            title="Create Habit"
            onPress={handleCreateHabit}
            disabled={!name.trim()}
            style={styles.createButton}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginBottom: 8,
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedCategoryText: {
    color: colors.background,
    fontWeight: '500',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
  },
  iconItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedIconItem: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primaryLight,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorItem: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: colors.text,
    transform: [{ scale: 1.1 }],
  },
  createButton: {
    marginTop: 16,
  },
});
