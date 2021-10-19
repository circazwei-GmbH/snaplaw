import React from "react";
import { StyleProp, StyleSheet, Text, View, TextStyle } from "react-native";

type ErrorBoldMessageProps = {
  text: string;
  style?: StyleProp<TextStyle>;
};

export default function ErrorBoldMessage({
  text,
  style,
}: ErrorBoldMessageProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.star}>*</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  star: {
    paddingRight: 10,
    color: "#FA7171",
    fontSize: 17,
    fontFamily: "OS-SB",
  },
  text: {
    fontFamily: "OS-SB",
    fontSize: 17,
  },
});
