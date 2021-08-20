import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface IconButtonPropsInterface {
  icon: object;
  text: string;
  onPress: () => void;
}

export default function IconButton({
  text,
  onPress,
  icon,
}: IconButtonPropsInterface): JSX.Element {
  const library = require("@expo/vector-icons");

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <library.AntDesign name="pluscircle" size={16} color="#668395" />
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: 150,
    height: 45,
  },
  text: {
    fontSize: 17,
    fontWeight: "400",
    color: "#1696E2",
  },
});
