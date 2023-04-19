import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
// import QuestionComponent from "./components/QuestionComponent";
import { Header, Icon, Button, Input, Text } from "react-native-elements";
import LessonPanel from "./components/LessonPanel";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import QuestionComponent from "./components/QuestionComponent";
import LoginScreen from "./components/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Question" component={QuestionComponent} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
