import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IconButtonPropsInterface {
  text?: string;
  onPress: () => void;
}

export default function IconButton({
  text,
  onPress,
}: IconButtonPropsInterface): JSX.Element {
  return (
    <TouchableOpacity testID={text} onPress={onPress} style={styles.container}>
      <AntDesign name="pluscircle" size={32} color="#668395" />
      <Text style={[styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 150,
    height: 45,
    zIndex: 1,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "OS",
    textDecorationLine: "underline",
    color: "#1696E2",
  },
});
