import React from "react";
import { StyleSheet, Text, View } from "react-native";

type AbstractErrorMessageProps = {
  message: string | undefined;
};

export default function AbstractErrorMessage({
  message,
}: AbstractErrorMessageProps) {
  if (!message) {
    return null;
  }
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    marginTop: 18,
  },
  errorText: {
    color: "#FA7171",
  },
});
