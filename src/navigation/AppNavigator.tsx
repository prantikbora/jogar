import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { useStore } from "../store/useStore";

import { OnboardingScreen } from "../screens/OnboardingScreen";
import { InventoryScreen } from "../screens/InventoryScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  // Pull state and actions from Zustand
  const hasCompletedOnboarding = useStore(
    (state) => state.hasCompletedOnboarding,
  );
  const processAutoDeduction = useStore((state) => state.processAutoDeduction);

  // Run the background math immediately when the app loads
  useEffect(() => {
    if (hasCompletedOnboarding) {
      processAutoDeduction();
    }
  }, [hasCompletedOnboarding, processAutoDeduction]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        // Dynamically choose the first screen based on state
        initialRouteName={hasCompletedOnboarding ? "Inventory" : "Onboarding"}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inventory"
          component={InventoryScreen} // Ensure this matches the import name above
          options={{ title: "Jugar Dashboard" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
