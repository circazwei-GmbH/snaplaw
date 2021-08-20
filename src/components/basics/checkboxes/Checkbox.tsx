import React from "react";
import CheckBox from "react-native-check-box";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

type CheckboxProps = {
  isChecked: boolean;
  onChange: () => void;
  text?: string;
  textView: React.ReactNode;
  style?: StyleProp<TextStyle> | undefined;
};

export default function Checkbox({
  isChecked,
  onChange,
  text,
  textView,
  style,
}: CheckboxProps) {
  return (
    <CheckBox
      style={[styles.checkbox, style]}
      isChecked={isChecked}
      onClick={onChange}
      rightText={text}
      rightTextView={textView}
      checkBoxColor="#1696E2"
      checkedCheckBoxColor="#1696E2"
      rightTextStyle={styles.checkboxText}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    marginTop: -30,
  },
  checkboxText: {
    fontFamily: "P",
    fontSize: 17,
    color: "#202020",
  },
});
