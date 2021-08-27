import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
} from "react-native";

interface ButtonPropsInterface {
  text: string;
  onPress: () => void;
  type: "left" | "right";
  styleText?: StyleProp<TextStyle>;
}

export default function TextButton({
  text,
  onPress,
  type,
  styleText,
}: ButtonPropsInterface): JSX.Element {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text
        style={[
          styles.text,
          type === "left" ? styles.buttonLeft : styles.buttonRight,
          styleText,
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
    width: 120,
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
