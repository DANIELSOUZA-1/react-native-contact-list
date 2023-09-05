import {StatusBar} from "expo-status-bar";
import React from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";
import {NativeWindStyleSheet} from "nativewind";
import {Button} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from "./screens/SignUp";
import ContactListScreen from "./screens/ContactList";
import ContactEditScreen from "./screens/ContactEdit";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={ LoginScreen } />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={ SignUpScreen } />
        <Stack.Screen options={{ headerShown: false }} name="Contacts" component={ ContactListScreen } />
        <Stack.Screen options={{ headerShown: false }} name="ContactsEdit" component={ ContactEditScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
