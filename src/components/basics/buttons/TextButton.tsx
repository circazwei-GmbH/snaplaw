import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

interface ButtonPropsInterface {
  text: string;
  onPress: () => void;
  type: "left" | "right";
}

export default function TextButton({
  text,
  onPress,
  type,
}: ButtonPropsInterface): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text
        style={[
          styles.text,
          type === "left" ? styles.buttonLeft : styles.buttonRight,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: 100,
    height: 45,
  },
  text: {
    fontSize: 17,
    fontWeight: "400",
    color: "#1696E2",
  },
  buttonRight: {
    textAlign: "right",
    paddingRight: 16,
  },
  buttonLeft: {
    textAlign: "left",
    paddingLeft: 16,
  },
});
