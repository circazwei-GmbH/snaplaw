import React, { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import { BUTTON_COLORTYPE } from "../../../store/modules/main/types";

interface ButtonPropsInterface {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  type?: "primary" | "secondary";
  textColorType?: BUTTON_COLORTYPE;
}

export default function Button({
  text,
  onPress,
  style,
  type,
  textColorType,
}: ButtonPropsInterface) {
  const [touched, setTouched] = useState(false);

  const onPressInHandler = () => {
    setTouched(true);
  };

  const onPressOutHandler = () => {
    setTouched(false);
  };
  return (
    <Pressable
      style={[
        styles.button,
        style,
        !type || type === "secondary"
          ? styles.secondaryButton
          : styles.privaryButton,
        touched ? styles.touch : null,
      ]}
      onPress={onPress}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
    >
      <Text
        style={[
          styles.text,
          type !== "primary" ? styles.secondaryText : styles.primaryText,
          textColorType === BUTTON_COLORTYPE.PRIMARY
            ? styles.secondaryText
            : null,
          textColorType === BUTTON_COLORTYPE.ERROR ? styles.errorText : null,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "rgb(22, 150, 226)",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.19,
  },
  text: {
    fontSize: 17,
    lineHeight: 18,
    fontFamily: "OS-SB",
  },
  privaryButton: {
    backgroundColor: "#1696E2",
  },
  secondaryButton: {
    backgroundColor: "#fff",
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: "#1696E2",
  },
  errorText: {
    color: "#FA7171",
  },
  touch: {
    opacity: 0.5,
  },
});
