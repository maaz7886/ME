import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image, Modal, TextInput, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, BookOpen, GraduationCap, Plus, ChevronRight, Clock, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';

type Book = {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  progress: number;
  totalPages: number;
};

type Course = {
  id: string;
  title: string;
  provider: string;
  progress: number;
  totalModules: number;
};

export default function LearningScreen() {
  const router = useRouter();
  
  // Mock data
  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Atomic Habits',
      author: 'James Clear',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200',
      progress: 120,
      totalPages: 320,
    },
    {
      id: '2',
      title: 'Deep Work',
      author: 'Cal Newport',
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200',
      progress: 45,
      totalPages: 280,
    },
  ]);
  
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'React Native Masterclass',
      provider: 'Udemy',
      progress: 8,
      totalModules: 12,
    },
    {
      id: '2',
      title: 'Arabic Language Fundamentals',
      provider: 'Bayyinah',
      progress: 3,
      totalModules: 10,
    },
  ]);
  
  // Modal states
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showUpdateBookModal, setShowUpdateBookModal] = useState(false);
  const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Form states
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookPages, setNewBookPages] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseProvider, setNewCourseProvider] = useState('');
  const [newCourseModules, setNewCourseModules] = useState('');
  const [updateProgress, setUpdateProgress] = useState('');
  
  // Timer state
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  
  const handleAddBook = () => {
    setNewBookTitle('');
    setNewBookAuthor('');
    setNewBookPages('');
    setShowAddBookModal(true);
  };
  
  const handleAddCourse = () => {
    setNewCourseTitle('');
    setNewCourseProvider('');
    setNewCourseModules('');
    setShowAddCourseModal(true);
  };
  
  const handleUpdateBook = (book: Book) => {
    setSelectedBook(book);
    setUpdateProgress(book.progress.toString());
    setShowUpdateBookModal(true);
  };
  
  const handleUpdateCourse = (course: Course) => {
    setSelectedCourse(course);
    setUpdateProgress(course.progress.toString());
    setShowUpdateCourseModal(true);
  };
  
  const saveNewBook = () => {
    if (!newBookTitle || !newBookAuthor || !newBookPages) {
      Alert.alert("Missing Information", "Please fill in all fields");
      return;
    }
    
    const newBook: Book = {
      id: Date.now().toString(),
      title: newBookTitle,
      author: newBookAuthor,
      coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200',
      progress: 0,
      totalPages: parseInt(newBookPages),
    };
    
    setBooks([...books, newBook]);
    setShowAddBookModal(false);
    Alert.alert("Success", "Book added successfully!");
  };
  
  const saveNewCourse = () => {
    if (!newCourseTitle || !newCourseProvider || !newCourseModules) {
      Alert.alert("Missing Information", "Please fill in all fields");
      return;
    }
    
    const newCourse: Course = {
      id: Date.now().toString(),
      title: newCourseTitle,
      provider: newCourseProvider,
      progress: 0,
      totalModules: parseInt(newCourseModules),
    };
    
    setCourses([...courses, newCourse]);
    setShowAddCourseModal(false);
    Alert.alert("Success", "Course added successfully!");
  };
  
  const saveBookProgress = () => {
    if (!selectedBook || !updateProgress) {
      Alert.alert("Invalid Progress", "Please enter a valid number");
      return;
    }
    
    const progress = parseInt(updateProgress);
    if (isNaN(progress) || progress < 0 || progress > selectedBook.totalPages) {
      Alert.alert("Invalid Progress", `Please enter a number between 0 and ${selectedBook.totalPages}`);
      return;
    }
    
    const updatedBooks = books.map(book => 
      book.id === selectedBook.id ? { ...book, progress } : book
    );
    
    setBooks(updatedBooks);
    setShowUpdateBookModal(false);
    Alert.alert("Success", "Progress updated successfully!");
  };
  
  const saveCourseProgress = () => {
    if (!selectedCourse || !updateProgress) {
      Alert.alert("Invalid Progress", "Please enter a valid number");
      return;
    }
    
    const progress = parseInt(updateProgress);
    if (isNaN(progress) || progress < 0 || progress > selectedCourse.totalModules) {
      Alert.alert("Invalid Progress", `Please enter a number between 0 and ${selectedCourse.totalModules}`);
      return;
    }
    
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id ? { ...course, progress } : course
    );
    
    setCourses(updatedCourses);
    setShowUpdateCourseModal(false);
    Alert.alert("Success", "Progress updated successfully!");
  };
  
  const handleViewAllBooks = () => {
    Alert.alert("View All Books", "This would show a full list of all your books");
  };
  
  const handleViewAllCourses = () => {
    Alert.alert("View All Courses", "This would show a full list of all your courses");
  };
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  };
  
  const handleStartTimer = () => {
    setTimerRunning(true);
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  };
  
  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Learning Tracker',
          headerLeft: () => (
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Reading Tracker */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reading Tracker</Text>
            <Pressable style={styles.viewAllButton} onPress={handleViewAllBooks}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          {books.map((book) => (
            <Pressable 
              key={book.id} 
              style={styles.bookCard}
              onPress={() => handleUpdateBook(book)}
            >
              <Image 
                source={{ uri: book.coverUrl }} 
                style={styles.bookCover}
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(book.progress / book.totalPages) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {book.progress}/{book.totalPages} pages
                  </Text>
                </View>
              </View>
              <Pressable 
                style={styles.updateButton}
                onPress={() => handleUpdateBook(book)}
              >
                <Plus size={20} color={colors.primary} />
              </Pressable>
            </Pressable>
          ))}
          
          <Button
            title="Add New Book"
            icon={<BookOpen size={18} color={colors.background} />}
            style={styles.addButton}
            onPress={handleAddBook}
          />
        </View>
        
        {/* Courses & Skills */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Courses & Skills</Text>
            <Pressable style={styles.viewAllButton} onPress={handleViewAllCourses}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={colors.primary} />
            </Pressable>
          </View>
          
          {courses.map((course) => (
            <Pressable 
              key={course.id} 
              style={styles.courseCard}
              onPress={() => handleUpdateCourse(course)}
            >
              <View style={styles.courseIconContainer}>
                <GraduationCap size={24} color={colors.primary} />
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseProvider}>{course.provider}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(course.progress / course.totalModules) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {course.progress}/{course.totalModules} modules
                  </Text>
                </View>
              </View>
              <Pressable 
                style={styles.updateButton}
                onPress={() => handleUpdateCourse(course)}
              >
                <Plus size={20} color={colors.primary} />
              </Pressable>
            </Pressable>
          ))}
          
          <Button
            title="Add New Course"
            icon={<GraduationCap size={18} color={colors.background} />}
            style={styles.addButton}
            onPress={handleAddCourse}
          />
        </View>
        
        {/* Study Timer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Timer</Text>
          <Pressable 
            style={styles.timerCard}
            onPress={() => setShowTimerModal(true)}
          >
            <View style={styles.timerIconContainer}>
              <Clock size={32} color={colors.primary} />
            </View>
            <Text style={styles.timerValue}>{formatTime(timerSeconds)}</Text>
            <View style={styles.timerButtonsContainer}>
              <Button
                title={timerRunning ? "Pause" : "Start"}
                style={styles.timerButton}
                onPress={() => {
                  if (timerRunning) {
                    setTimerRunning(false);
                  } else {
                    handleStartTimer();
                  }
                }}
              />
              <Button
                title="Reset"
                variant="outline"
                style={styles.timerButton}
                onPress={handleResetTimer}
              />
            </View>
          </Pressable>
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Add Book Modal */}
      <Modal
        visible={showAddBookModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddBookModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Book</Text>
              <Pressable onPress={() => setShowAddBookModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.modalLabel}>Title:</Text>
            <TextInput
              style={styles.modalInput}
              value={newBookTitle}
              onChangeText={setNewBookTitle}
              placeholder="Enter book title"
              placeholderTextColor={colors.textSecondary}
            />
            
            <Text style={styles.modalLabel}>Author:</Text>
            <TextInput
              style={styles.modalInput}
              value={newBookAuthor}
              onChangeText={setNewBookAuthor}
              placeholder="Enter author name"
              placeholderTextColor={colors.textSecondary}
            />
            
            <Text style={styles.modalLabel}>Total Pages:</Text>
            <TextInput
              style={styles.modalInput}
              value={newBookPages}
              onChangeText={setNewBookPages}
              keyboardType="numeric"
              placeholder="Enter total pages"
              placeholderTextColor={colors.textSecondary}
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                style={styles.modalButton}
                onPress={() => setShowAddBookModal(false)}
              />
              <Button
                title="Save"
                style={styles.modalButton}
                onPress={saveNewBook}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Add Course Modal */}
      <Modal
        visible={showAddCourseModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddCourseModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Course</Text>
              <Pressable onPress={() => setShowAddCourseModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.modalLabel}>Title:</Text>
            <TextInput
              style={styles.modalInput}
              value={newCourseTitle}
              onChangeText={setNewCourseTitle}
              placeholder="Enter course title"
              placeholderTextColor={colors.textSecondary}
            />
            
            <Text style={styles.modalLabel}>Provider:</Text>
            <TextInput
              style={styles.modalInput}
              value={newCourseProvider}
              onChangeText={setNewCourseProvider}
              placeholder="Enter provider name"
              placeholderTextColor={colors.textSecondary}
            />
            
            <Text style={styles.modalLabel}>Total Modules:</Text>
            <TextInput
              style={styles.modalInput}
              value={newCourseModules}
              onChangeText={setNewCourseModules}
              keyboardType="numeric"
              placeholder="Enter total modules"
              placeholderTextColor={colors.textSecondary}
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                style={styles.modalButton}
                onPress={() => setShowAddCourseModal(false)}
              />
              <Button
                title="Save"
                style={styles.modalButton}
                onPress={saveNewCourse}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Update Book Progress Modal */}
      <Modal
        visible={showUpdateBookModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUpdateBookModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Progress</Text>
              <Pressable onPress={() => setShowUpdateBookModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            {selectedBook && (
              <>
                <Text style={styles.modalBookTitle}>{selectedBook.title}</Text>
                <Text style={styles.modalBookInfo}>
                  Current progress: {selectedBook.progress} of {selectedBook.totalPages} pages
                </Text>
                
                <Text style={styles.modalLabel}>New Progress:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={updateProgress}
                  onChangeText={setUpdateProgress}
                  keyboardType="numeric"
                  placeholder="Enter pages read"
                  placeholderTextColor={colors.textSecondary}
                  autoFocus
                />
                
                <View style={styles.modalButtons}>
                  <Button
                    title="Cancel"
                    variant="outline"
                    style={styles.modalButton}
                    onPress={() => setShowUpdateBookModal(false)}
                  />
                  <Button
                    title="Save"
                    style={styles.modalButton}
                    onPress={saveBookProgress}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Update Course Progress Modal */}
      <Modal
        visible={showUpdateCourseModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUpdateCourseModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Update Progress</Text>
              <Pressable onPress={() => setShowUpdateCourseModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            {selectedCourse && (
              <>
                <Text style={styles.modalBookTitle}>{selectedCourse.title}</Text>
                <Text style={styles.modalBookInfo}>
                  Current progress: {selectedCourse.progress} of {selectedCourse.totalModules} modules
                </Text>
                
                <Text style={styles.modalLabel}>New Progress:</Text>
                <TextInput
                  style={styles.modalInput}
                  value={updateProgress}
                  onChangeText={setUpdateProgress}
                  keyboardType="numeric"
                  placeholder="Enter modules completed"
                  placeholderTextColor={colors.textSecondary}
                  autoFocus
                />
                
                <View style={styles.modalButtons}>
                  <Button
                    title="Cancel"
                    variant="outline"
                    style={styles.modalButton}
                    onPress={() => setShowUpdateCourseModal(false)}
                  />
                  <Button
                    title="Save"
                    style={styles.modalButton}
                    onPress={saveCourseProgress}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
      
      {/* Timer Modal */}
      <Modal
        visible={showTimerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTimerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Study Timer</Text>
              <Pressable onPress={() => setShowTimerModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <View style={styles.timerModalContent}>
              <View style={styles.timerIconContainer}>
                <Clock size={48} color={colors.primary} />
              </View>
              <Text style={styles.timerModalValue}>{formatTime(timerSeconds)}</Text>
              
              <View style={styles.timerModalButtons}>
                <Button
                  title={timerRunning ? "Pause" : "Start"}
                  style={styles.timerModalButton}
                  size="large"
                  onPress={() => {
                    if (timerRunning) {
                      setTimerRunning(false);
                    } else {
                      handleStartTimer();
                    }
                  }}
                />
                <Button
                  title="Reset"
                  variant="outline"
                  style={styles.timerModalButton}
                  size="large"
                  onPress={handleResetTimer}
                />
              </View>
            </View>
            
            <Button
              title="Close"
              variant="outline"
              style={{ marginTop: 24 }}
              onPress={() => setShowTimerModal(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  backButton: {
    marginRight: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  updateButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addButton: {
    marginTop: 8,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  courseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  courseProvider: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  timerCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  timerIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timerValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  timerButtonsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  timerButton: {
    minWidth: 120,
  },
  bottomPadding: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
  },
  modalInput: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  modalBookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  modalBookInfo: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  timerModalContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerModalValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 32,
  },
  timerModalButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  timerModalButton: {
    flex: 1,
  },
});
