import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

const QuestionComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  useEffect(() => {
    console.log("test");
    console.log(route.params.lessonId);
    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/test_question/${route.params.questionIds[currentQuestionIndex]}`
        );
        const json = await response.json();
        setCurrentQuestion(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [currentQuestionIndex]);

  const handleAnswerPress = () => {
    if (currentQuestionIndex < route.params.questionIds.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setLoading(true);
    } else {
      // If all questions are answered, go back to LessonPanel
      // You can customize this behavior as per your requirement
      setCurrentQuestion(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading question...</Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option) => (
        <Button
          title={option}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={handleAnswerPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default QuestionComponent;
