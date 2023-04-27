import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Card } from "react-native-elements";
import { useRoute, useNavigation } from "@react-navigation/native";
import AppContext from "../AppContext";

const QuestionComponent = () => {
  const { userId, setUserId } = useContext(AppContext);
  const { baseUrl, setBaseUrl } = useContext(AppContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResultCard, setShowResultCard] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [optionsColor, setOptionsColor] = useState(null);

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params.nullIndex !== -1) {
      setCurrentQuestionIndex(route.params.nullIndex);
      route.params.nullIndex = -1;
    }
  });

  useEffect(() => {
    navigation.setOptions({
      title: `Question ${currentQuestionIndex + 1} of ${
        route.params.questionIds.length
      }`,
    });
  }, [currentQuestionIndex]);

  useEffect(() => {
    // console.log("test");
    // console.log(userId);
    // console.log(route.params.lessonId);

    const fetchQuestion = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/get_question/${route.params.questionIds[currentQuestionIndex]}`
        );
        const json = await response.json();
        // console.log(json);
        setCurrentQuestion(json);
        setOptionsColor(Array(json.options.length).fill(0));
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [currentQuestionIndex]);

  const handleAnswerPress = async (option) => {
    setSelectedOption(option);

    // console.log(option);
    // console.log(currentQuestion.answer);

    const isCorrect = currentQuestion.answer === option;
    // console.log(isCorrect);

    const response = await fetch(`${baseUrl}/update_tonic_score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId, // replace with actual user id
        question_id: currentQuestion.id,
        answered_correct: isCorrect,
        lesson_id: route.params.lessonId,
      }),
    });

    // Update the progress status locally
    const updatedProgressStatus = [...route.params.progressStatus];
    updatedProgressStatus[currentQuestionIndex] = isCorrect;

    setIsAnswerCorrect(isCorrect);
    setShowResultCard(true);

    const updatedColors = currentQuestion.options.map((o) => {
      if (currentQuestion.answer === o) {
        return 1;
      } else if (option === o) {
        return 2;
      } else {
        return 0;
      }
    });
    setOptionsColor(updatedColors);
  };

  const handleNextPress = () => {
    if (currentQuestionIndex < route.params.questionIds.length - 1) {
      // console.log("here");
      // console.log("here");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // console.log(currentQuestionIndex);
      setSelectedOption(null);
      setLoading(true);
      setShowResultCard(false);
    } else {
      navigation.navigate("Home");
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
      {currentQuestion.options.map((option, index) => (
        <Button
          key={index}
          title={option}
          buttonStyle={
            optionsColor[index] === 1
              ? styles.correctButton
              : optionsColor[index] === 2
              ? styles.selectedButton
              : styles.button
          }
          titleStyle={styles.buttonText}
          onPress={() => handleAnswerPress(option)}
        />
      ))}
      {showResultCard && (
        <Card containerStyle={styles.cardContainer}>
          <Text h4 style={styles.cardText}>
            {isAnswerCorrect ? "Correct!" : "Incorrect!"}
          </Text>

          <Text h5 style={styles.cardText}>
            The answer is {currentQuestion.answer}
          </Text>

          <Text h6 style={styles.meaningText}>
            {currentQuestion.meaning}
          </Text>
          <Button
            title="Next →"
            buttonStyle={styles.nextButton}
            titleStyle={styles.buttonText}
            onPress={handleNextPress}
          />
        </Card>
      )}
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
    backgroundColor: "#fffcf5",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  correctButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  cardContainer: {
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  meaningText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  nextButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
});

export default QuestionComponent;
