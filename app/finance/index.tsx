import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, TextInput, Alert, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, DollarSign, TrendingUp, PiggyBank, Plus, X } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { ProgressChart } from '@/components/ProgressChart';

export default function FinanceScreen() {
  const router = useRouter();
  const [savingsGoal, setSavingsGoal] = useState('100000');
  const [currentSavings, setCurrentSavings] = useState('25000');
  const [monthlyInvestment, setMonthlyInvestment] = useState('30000');
  const [yearlyInvestmentGoal, setYearlyInvestmentGoal] = useState('360000');
  
  // Modal states
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  
  // Calculate percentages
  const savingsPercentage = Math.min(100, (parseInt(currentSavings) / parseInt(savingsGoal)) * 100);
  const investmentPercentage = Math.min(100, (parseInt(monthlyInvestment) * 12 / parseInt(yearlyInvestmentGoal)) * 100);
  
  const handleAddTransaction = () => {
    setShowTransactionModal(true);
  };
  
  const handleLogInvestment = () => {
    setShowInvestmentModal(true);
  };
  
  const saveTransaction = () => {
    if (!transactionAmount || isNaN(Number(transactionAmount))) {
      Alert.alert("Invalid Amount", "Please enter a valid number");
      return;
    }
    
    const newSavings = (parseInt(currentSavings) + parseInt(transactionAmount)).toString();
    setCurrentSavings(newSavings);
    setShowTransactionModal(false);
    setTransactionAmount('');
    Alert.alert("Success", "Transaction added successfully!");
  };
  
  const saveInvestment = () => {
    if (!investmentAmount || isNaN(Number(investmentAmount))) {
      Alert.alert("Invalid Amount", "Please enter a valid number");
      return;
    }
    
    const newInvestment = (parseInt(monthlyInvestment) + parseInt(investmentAmount)).toString();
    setMonthlyInvestment(newInvestment);
    setShowInvestmentModal(false);
    setInvestmentAmount('');
    Alert.alert("Success", "Investment logged successfully!");
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Finance Goals',
          headerLeft: () => (
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <ArrowLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Savings Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Savings Goal</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <PiggyBank size={24} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>Emergency Fund</Text>
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Goal Amount:</Text>
              <TextInput
                style={styles.input}
                value={savingsGoal}
                onChangeText={setSavingsGoal}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Current Savings:</Text>
              <TextInput
                style={styles.input}
                value={currentSavings}
                onChangeText={setCurrentSavings}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${savingsPercentage}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(savingsPercentage)}% of goal
              </Text>
            </View>
            
            <Button
              title="Add Transaction"
              icon={<Plus size={18} color={colors.background} />}
              style={styles.button}
              onPress={handleAddTransaction}
            />
          </View>
        </View>
        
        {/* Investment Tracker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investment Tracker</Text>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondaryLight }]}>
                <TrendingUp size={24} color={colors.secondary} />
              </View>
              <Text style={styles.cardTitle}>Monthly Investments</Text>
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Monthly Amount:</Text>
              <TextInput
                style={styles.input}
                value={monthlyInvestment}
                onChangeText={setMonthlyInvestment}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Yearly Goal:</Text>
              <TextInput
                style={styles.input}
                value={yearlyInvestmentGoal}
                onChangeText={setYearlyInvestmentGoal}
                keyboardType="numeric"
              />
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${investmentPercentage}%`, backgroundColor: colors.secondary }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round(investmentPercentage)}% of yearly goal
              </Text>
            </View>
            
            <Button
              title="Log Investment"
              variant="secondary"
              icon={<Plus size={18} color={colors.background} />}
              style={styles.button}
              onPress={handleLogInvestment}
            />
          </View>
        </View>
        
        {/* Financial Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Overview</Text>
          <View style={styles.card}>
            <ProgressChart 
              data={[
                {
                  label: 'Savings',
                  value: parseInt(currentSavings),
                  maxValue: parseInt(savingsGoal),
                  color: colors.primary,
                },
                {
                  label: 'Investments',
                  value: parseInt(monthlyInvestment) * 12,
                  maxValue: parseInt(yearlyInvestmentGoal),
                  color: colors.secondary,
                },
              ]}
            />
          </View>
        </View>
        
        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
      
      {/* Add Transaction Modal */}
      <Modal
        visible={showTransactionModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTransactionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <Pressable onPress={() => setShowTransactionModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.modalLabel}>Amount:</Text>
            <TextInput
              style={styles.modalInput}
              value={transactionAmount}
              onChangeText={setTransactionAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={colors.textSecondary}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                style={styles.modalButton}
                onPress={() => setShowTransactionModal(false)}
              />
              <Button
                title="Save"
                style={styles.modalButton}
                onPress={saveTransaction}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Log Investment Modal */}
      <Modal
        visible={showInvestmentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowInvestmentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Investment</Text>
              <Pressable onPress={() => setShowInvestmentModal(false)}>
                <X size={24} color={colors.text} />
              </Pressable>
            </View>
            
            <Text style={styles.modalLabel}>Amount:</Text>
            <TextInput
              style={styles.modalInput}
              value={investmentAmount}
              onChangeText={setInvestmentAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
              placeholderTextColor={colors.textSecondary}
              autoFocus
            />
            
            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="outline"
                style={styles.modalButton}
                onPress={() => setShowInvestmentModal(false)}
              />
              <Button
                title="Save"
                style={styles.modalButton}
                onPress={saveInvestment}
              />
            </View>
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
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 150,
    textAlign: 'right',
    fontSize: 16,
    color: colors.text,
  },
  progressContainer: {
    marginVertical: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  button: {
    marginTop: 8,
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
});
