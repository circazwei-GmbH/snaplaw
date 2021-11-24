import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  TextStyle,
  Dimensions,
} from "react-native";

interface ButtonPropsInterface {
  text: string;
  onPress: () => void;
  type: "left" | "right";
  styleText?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export default function TextButton({
  text,
  onPress,
  type,
  styleText,
  disabled,
}: ButtonPropsInterface): JSX.Element {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.2}
      style={styles.container}
      testID={text}
    >
      <Text
        style={[
          styles.text,
          type === "left" ? styles.buttonLeft : styles.buttonRight,
          styleText,
          disabled ? styles.disabled : null,
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
    width: Dimensions.get("window").width * 0.2,
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
  disabled: {
    color: "#E5E5E5",
  },
});
