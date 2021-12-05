import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(); //Ignore log notifications by message

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}
