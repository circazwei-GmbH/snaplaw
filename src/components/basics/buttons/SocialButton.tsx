import React, { ReactElement } from "react";
import { TouchableHighlight, StyleSheet } from "react-native";

interface SocialButtonPropsInterface {
  children?: ReactElement;
}

export default function SocialButton({ children }: SocialButtonPropsInterface) {
  return (
    <TouchableHighlight style={styles.button}>{children}</TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 48,
    height: 48,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
