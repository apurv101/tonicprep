import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Rome", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest country in the world by area?",
    options: ["Russia", "China", "Canada", "USA"],
    correctAnswer: "Russia",
  },
  // add more questions here...
];

const QuestionComponent = ({ lesson, onFinish }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleNextPress = () => {
    const question = questions[currentQuestion];
    const isCorrect = question.correctAnswer === selectedOption;
    if (isCorrect) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentQuestion === questions.length - 1) {
      onFinish(score);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <Text style={styles.lessonTitle}>{lesson}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.options.map((option) => (
          <Button
            key={option}
            title={option}
            onPress={() => handleOptionPress(option)}
            color={option === selectedOption ? "#6C5B7B" : "#000"}
          />
        ))}
        <Button title="Next" onPress={handleNextPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default QuestionComponent;
