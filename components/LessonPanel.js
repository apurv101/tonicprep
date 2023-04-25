import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import QuestionComponent from "./QuestionComponent";
import AppContext from "../AppContext";

const LessonPanel = () => {
  const { userId, setUserId } = useContext(AppContext);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  console.log(`http://127.0.0.1:5000/lesson_question_ids/${userId}`);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (userId) {
          const response = await fetch(
            `http://127.0.0.1:5000/lesson_question_ids/${userId}`
          );
          const json = await response.json();
          setLessons(json);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [userId]);

  const handleGoPress = (lessonId, questionIds, progressStatus) => {
    console.log(lessonId, questionIds);
    navigation.navigate("QuestionComponent", {
      lessonId,
      questionIds,
      progressStatus,
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading lessons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {lessons.map((lesson) => (
        <View key={lesson.id} style={styles.lessonContainer}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Button
            title="Go"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() =>
              handleGoPress(
                lesson.id,
                lesson.question_ids,
                lesson.progress_status
              )
            }
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
