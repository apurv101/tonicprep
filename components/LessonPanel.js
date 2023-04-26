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
  // console.log(`${baseUrl}/get_lessons/${userId}`);

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

      const nullIndex = progressStatus.indexOf(null);

      navigation.navigate("QuestionComponent", {
        lessonId,
        questionIds,
        progressStatus,
        nullIndex,
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{lesson.title}</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${
                      (lesson.correct_answered / lesson.total_questions) *
                      100 *
                      1.5
                    }%`,
                  },
                ]}
              />
              <View
                style={[
                  styles.progressBarFill,
                  {
                    width: `${
                      (lesson.incorrect_answered / lesson.total_questions) *
                      100 *
                      1.5
                    }%`,
                    backgroundColor: "red",
                  },
                ]}
              />
            </View>
          </View>
          <Button
            title="Start →"
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
    padding: 5,
  },
  lessonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    padding: 30,
    backgroundColor: "#fffcf5",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e1d7c1",
    borderRadius: 10,
  },

  button: {
    flex: 1,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  lessonInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    width: 200,
    marginLeft: 10,
    backgroundColor: "#d8d8d8",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "green",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
});

export default LessonPanel;
