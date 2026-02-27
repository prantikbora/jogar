import './src/i18n';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* backgroundColor prevents UI bleeding under the status bar on Android */}
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}