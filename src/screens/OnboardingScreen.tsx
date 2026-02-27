import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

// Strictly typing the navigation prop
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export const OnboardingScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* If i18n is working, this will show the Assamese/Hindi/English text */}
      <Text style={styles.title}>{t('onboarding.selectLanguage')}</Text>
      
      <Button 
        title={t('common.next')} 
        // Using replace() so the user can't use the back button to return to onboarding
        onPress={() => navigation.replace('Inventory')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }
});