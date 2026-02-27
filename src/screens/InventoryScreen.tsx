import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useStore, GRAMS_IN_KG, GRAMS_IN_TEMA } from '../store/useStore';

// WE ARE USING A NAMED EXPORT HERE
export const InventoryScreen = () => {
  const { t } = useTranslation();
  
  const { 
    name, 
    currentStockGrams, 
    dailyConsumptionTema, 
    addStockKg, 
    manualDeductTema, 
    resetApp,
    debug_SimulateDaysPassed 
  } = useStore();

  // Unit Conversions for Display
  const displayKg = (currentStockGrams / GRAMS_IN_KG).toFixed(2);
  const displayTemaLeft = (currentStockGrams / GRAMS_IN_TEMA).toFixed(1);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.welcomeText}>{t('common.appName')}</Text>
          <Text style={styles.userName}>নমস্কাৰ, {name}!</Text>
        </View>

        {/* Primary Stock Card - Showing KG */}
        <View style={styles.stockCard}>
          <Text style={styles.stockLabel}>{t('inventory.currentStock')}</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.stockValue}>{displayKg}</Text>
            <Text style={styles.unitText}>KG</Text>
          </View>
          
          <Text style={styles.subValue}>
            ≈ {displayTemaLeft} {t('inventory.unitTema')} remaining
          </Text>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{t('inventory.dailyUsage')}:</Text>
            <Text style={styles.infoValue}>{dailyConsumptionTema} {t('inventory.unitTema')}/day</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Update Inventory</Text>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.addButton]} 
              onPress={() => addStockKg(1)}
            >
              <Text style={styles.buttonText}>+ 1 KG</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.deductButton]} 
              onPress={() => manualDeductTema(1)}
            >
              <Text style={styles.buttonText}>- 1 Tema</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Developer Tools */}
        <View style={styles.debugSection}>
          <TouchableOpacity 
            style={styles.debugButton} 
            onPress={() => debug_SimulateDaysPassed(1)}
          >
            <Text style={styles.debugButtonText}>Simulate 1 Day (Auto-Deduct)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resetBtn} onPress={resetApp}>
            <Text style={styles.resetText}>Reset All Data</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  container: { padding: 20 },
  header: { marginBottom: 25 },
  welcomeText: { fontSize: 14, color: '#6C757D', fontWeight: 'bold' },
  userName: { fontSize: 26, fontWeight: 'bold', color: '#212529' },
  stockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center'
  },
  stockLabel: { fontSize: 16, color: '#495057', marginBottom: 5 },
  valueContainer: { flexDirection: 'row', alignItems: 'baseline' },
  stockValue: { fontSize: 56, fontWeight: 'bold', color: '#0D6EFD' },
  unitText: { fontSize: 20, color: '#0D6EFD', marginLeft: 5, fontWeight: 'bold' },
  subValue: { fontSize: 14, color: '#ADB5BD', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#E9ECEF', width: '100%', marginVertical: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  infoLabel: { fontSize: 14, color: '#6C757D' },
  infoValue: { fontSize: 14, fontWeight: 'bold', color: '#212529' },
  actionsContainer: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  addButton: { backgroundColor: '#198754' },
  deductButton: { backgroundColor: '#DC3545' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  debugSection: { marginTop: 40, borderTopWidth: 1, borderColor: '#DEE2E6', paddingTop: 20 },
  debugButton: { backgroundColor: '#6C757D', padding: 12, borderRadius: 8, alignItems: 'center' },
  debugButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  resetBtn: { marginTop: 15, alignSelf: 'center' },
  resetText: { color: '#DC3545', fontSize: 12, textDecorationLine: 'underline' }
});