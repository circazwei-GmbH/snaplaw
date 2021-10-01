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
  shadowNone?: boolean
}

export default function Button({
  text,
  onPress,
  style,
  type,
  textColorType,
  shadowNone = false
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
        shadowNone ? null : styles.shadow,
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
          textColorType === BUTTON_COLORTYPE.BLACK ? styles.blackText : null,
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
    paddingVertical: 12,
    borderRadius: 10,
  },
  shadow: {
    shadowColor: "rgb(22, 150, 226)",
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.19,
  },
  text: {
    fontSize: 17,
    fontFamily: "OS-SB",
  },
  privaryButton: {
    backgroundColor: "#1696E2",
  },
  secondaryButton: {
    backgroundColor: "#fff",
  },
  blackText: {
    color: "#202020",
    fontFamily: "P",
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
