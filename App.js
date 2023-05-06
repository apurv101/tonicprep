import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
// import QuestionComponent from "./components/QuestionComponent";
import { Header, Icon, Button, Input, Text } from "react-native-elements";
import LessonPanel from "./components/LessonPanel";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import QuestionComponent from "./components/QuestionComponent";
import LoginScreen from "./components/LoginScreen";
import { AppProvider } from "./AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState("");
  // const [baseUrl, setBaseUrl] = useState("http://127.0.0.1:5000");

  const [baseUrl, setBaseUrl] = useState("https://apurv101.pythonanywhere.com");

  const checkUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("user_id");
      if (userId !== null) {
        // user_id is already stored in local storage
        console.log("User ID found:", userId);
        setUserId(userId); // update the userId state here
      } else {
        // user_id is not stored in local storage, store it now

        const response = await fetch(
          "https://apurv101.pythonanywhere.com/create_user_id"
        );
        const newUserId = await response.json();
        console.log(newUserId);
        await AsyncStorage.setItem("user_id", newUserId);
        console.log("New user ID stored:", newUserId);
        setUserId(newUserId);
      }
    } catch (e) {
      // Handle errors here
      console.log("Error:", e);
    }
  };

  useEffect(() => {
    checkUserId();
  }, []);

  return (
    <AppProvider value={{ userId, setUserId, baseUrl, setBaseUrl }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="QuestionComponent"
            component={QuestionComponent}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
