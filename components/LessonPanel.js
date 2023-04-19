import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import QuestionComponent from "./QuestionComponent";

const LessonPanel = () => {
  const lessons = [
    {
      id: 1,
      title: "Lesson 1",
    },
    {
      id: 2,
      title: "Lesson 2",
    },
    {
      id: 3,
      title: "Lesson 3",
    },
    {
      id: 4,
      title: "Lesson 4",
    },
    {
      id: 5,
      title: "Lesson 5",
    },
    {
      id: 6,
      title: "Lesson 6",
    },
    {
      id: 7,
      title: "Lesson 7",
    },
    {
      id: 8,
      title: "Lesson 8",
    },
    {
      id: 9,
      title: "Lesson 9",
    },
    {
      id: 10,
      title: "Lesson 10",
    },
    {
      id: 11,
      title: "Lesson 11",
    },
  ];

  const navigation = useNavigation();

  const handleGoPress = (lessonId) => {
    navigation.navigate("Question", { lessonId });
  };

  return (
    <View style={styles.container}>
      {lessons.map((lesson) => (
        <View key={lesson.id} style={styles.lessonContainer}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Button
            title="Go"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => handleGoPress(lesson.id)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lessonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9c2ff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LessonPanel;
