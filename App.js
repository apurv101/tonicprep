import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import QuestionComponent from "./components/QuestionComponent";
import { Header, Icon } from "react-native-elements";

const MenuPanel = ({ isVisible, onClose }) => {
  return isVisible ? (
    <View style={styles.menuPanel}>
      <Text style={styles.menuOption}>Option 1</Text>
      <Text style={styles.menuOption}>Option 2</Text>
      <Text style={styles.menuOption}>Option 3</Text>
      <Text style={styles.menuOption} onPress={onClose}>
        Close
      </Text>
    </View>
  ) : null;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuPress = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Icon name="menu" color="#fff" onPress={handleMenuPress} />
        }
        centerComponent={{
          text: "Welcome to My App",
          style: { color: "#fff", fontSize: 18 },
        }}
        containerStyle={{
          backgroundColor: "#4CAF50",
          justifyContent: "space-around",
          paddingTop: 60,
        }}
      />
      <MenuPanel isVisible={isMenuOpen} onClose={handleMenuClose} />
      <Text>Test up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuPanel: {
    top: 50,
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 1,
    padding: 10,
  },
  menuOption: {
    fontSize: 18,
    marginVertical: 5,
  },
});
