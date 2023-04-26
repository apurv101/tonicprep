import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import LessonPanel from "./LessonPanel";
import { Header, Icon, Button, Input, Text } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* <Header
        centerComponent={{
          text: "My App",
          style: { color: "#fff", fontSize: 20 },
        }}
        statusBarProps={{ barStyle: "light-content" }}
        containerStyle={{
          backgroundColor: "#6C5B7B",
          justifyContent: "space-around",
        }}
      /> */}
      <View style={styles.container}>
        <LessonPanel />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});

export default HomeScreen;
