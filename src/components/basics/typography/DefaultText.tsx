import React from "react";
import { Text, StyleSheet } from "react-native";

type DefaultTextProps = {
  text: string;
  style?: any;
  testID?: string;
};

export default function DefaultText({ text, style, testID }: DefaultTextProps) {
  return <Text style={[styles.text, style]} testID={testID}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "P",
    color: "#202020",
    fontSize: 17,
  },
});
