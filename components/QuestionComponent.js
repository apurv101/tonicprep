import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const QuestionComponent = ({ question }) => {
  const [answer, setAnswer] = useState("");

  const handleAnswerChange = (text) => {
    setAnswer(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleAnswerChange}
        value={answer}
        placeholder="Type your answer here"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginVertical: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default QuestionComponent;
