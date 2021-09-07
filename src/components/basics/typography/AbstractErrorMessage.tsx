import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DefaultText from "./DefaultText";

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
      <Text style={styles.dot}>*</Text>
      <DefaultText style={styles.errorText} text={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    paddingRight: 10,
    color: "#FA7171",
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: "row",
    marginTop: 18,
  },
  errorText: {
    fontFamily: "OS-SB",
  },
});
