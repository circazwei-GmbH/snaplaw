import React from "react";
import CheckBox from "react-native-check-box";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

type CheckboxProps = {
  isChecked: boolean;
  onChange: () => void;
  text: string;
  style?: StyleProp<TextStyle> | undefined;
};

export default function Checkbox({
  isChecked,
  onChange,
  text,
  style,
}: CheckboxProps) {
  return (
    <CheckBox
      style={[styles.checkbox, style]}
      isChecked={isChecked}
      onClick={onChange}
      rightText={text}
      checkBoxColor="#1696E2"
      checkedCheckBoxColor="#1696E2"
      rightTextStyle={styles.checkboxText}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  checkboxText: {
    fontFamily: "P",
    fontSize: 17,
    color: "#202020",
  },
});
