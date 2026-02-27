import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useStore } from '../store/useStore';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'as', label: 'অসমীয়া' },
  { code: 'hi', label: 'हिन्दी' }
];

export const OnboardingScreen = ({ navigation }: Props) => {
  const { t, i18n } = useTranslation();
  
  // Local state for the form inputs (always strings initially)
  const [name, setName] = useState('');
  const [dailyTema, setDailyTema] = useState('');
  const [initialKg, setInitialKg] = useState(''); // Added new state for KG
  
  const completeOnboarding = useStore((state) => state.completeOnboarding);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleSaveAndContinue = () => {
    // 1. Name Validation
    if (!name.trim()) {
      Alert.alert(t('common.appName'), "Please enter your name.");
      return;
    }

    // 2. Daily Consumption Validation (String -> Number)
    const temaNumber = parseFloat(dailyTema);
    if (isNaN(temaNumber) || temaNumber <= 0) {
      Alert.alert(t('common.appName'), "Please enter a valid daily consumption.");
      return;
    }

    // 3. Initial Stock Validation (String -> Number)
    const kgNumber = parseFloat(initialKg);
    if (isNaN(kgNumber) || kgNumber < 0) {
      Alert.alert(t('common.appName'), "Please enter your starting stock in KG.");
      return;
    }

    // 4. Save to Store (All numbers are now properly typed as 'number')
    completeOnboarding(name.trim(), temaNumber, kgNumber);

    navigation.replace('Inventory');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          <Text style={styles.headerTitle}>{t('common.appName')}</Text>

          {/* Language Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>{t('onboarding.selectLanguage')}</Text>
            <View style={styles.languageRow}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity 
                  key={lang.code}
                  style={[styles.langButton, i18n.language === lang.code && styles.langButtonActive]}
                  onPress={() => handleLanguageChange(lang.code)}
                >
                  <Text style={[styles.langText, i18n.language === lang.code && styles.langTextActive]}>
                    {lang.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Name Input */}
          <View style={styles.section}>
            <Text style={styles.label}>{t('onboarding.enterName')}</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g. Rahul"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Initial Stock Input (The new addition) */}
          <View style={styles.section}>
            <Text style={styles.label}>Starting Stock (KG)</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g. 10"
              value={initialKg}
              onChangeText={setInitialKg}
              keyboardType="numeric"
            />
          </View>

          {/* Daily Consumption Input */}
          <View style={styles.section}>
            <Text style={styles.label}>{t('onboarding.setConsumption')} ({t('inventory.unitTema')})</Text>
            <TextInput 
              style={styles.input}
              placeholder="e.g. 2"
              value={dailyTema}
              onChangeText={setDailyTema}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSaveAndContinue}>
            <Text style={styles.submitButtonText}>{t('common.next')}</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
  keyboardAvoid: { flex: 1 },
  scrollContent: { padding: 24, flexGrow: 1, justifyContent: 'center' },
  headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#2C3E50', textAlign: 'center', marginBottom: 40 },
  section: { marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', color: '#34495E', marginBottom: 8 },
  input: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 8, 
    padding: 16, 
    fontSize: 16,
    color: '#2C3E50'
  },
  languageRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  langButton: { 
    flex: 1, 
    paddingVertical: 12, 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 8, 
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  langButtonActive: { backgroundColor: '#3498DB', borderColor: '#3498DB' },
  langText: { fontSize: 14, color: '#7F8C8D', fontWeight: '600' },
  langTextActive: { color: '#FFFFFF' },
  submitButton: { 
    backgroundColor: '#2ECC71', 
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 20 
  },
  submitButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});