import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import QuestionComponent from "./QuestionComponent";
import AppContext from "../AppContext";

const LessonPanel = () => {
  const { userId, setUserId } = useContext(AppContext);
  const { baseUrl, setBaseUrl } = useContext(AppContext);
  const [lessons, setLessons] = useState([]);
  // const [questionIds, setQuestionIds] = useState([]);
  // const [progressStatus, setProgressStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  console.log(`${baseUrl}/get_lessons/${userId}`);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (userId) {
          const response = await fetch(`${baseUrl}/get_lessons/${userId}`);
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

  const fetchQuestions = async (lessonId, userId) => {
    try {
      if (userId) {
        const response = await fetch(
          `${baseUrl}/lesson_question_ids/${lessonId}/${userId}`
        );
        const json = await response.json();
        const questionIds = json["question_ids"];
        const progressStatus = json["progress_status"];

        return { questionIds, progressStatus };
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoPress = async (lessonId) => {
    console.log(lessonId);

    setLoading(true);

    fetchQuestions(lessonId, userId);

    try {
      const { questionIds, progressStatus } = await fetchQuestions(
        lessonId,
        userId
      );

      navigation.navigate("QuestionComponent", {
        lessonId,
        questionIds,
        progressStatus,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
