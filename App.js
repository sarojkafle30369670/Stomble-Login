import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Welcome" component= {WelcomeScreen} />
      <Stack.Screen name="Contact" component= {ContactScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
