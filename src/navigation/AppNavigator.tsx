import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

import { OnboardingScreen } from '../screens/OnboardingScreen';
import { InventoryScreen } from '../screens/InventoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
          options={{ headerShown: false }} // Hide the top header for onboarding
        />
        <Stack.Screen 
          name="Inventory" 
          component={InventoryScreen} 
          options={{ title: 'Jogar Dashboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};