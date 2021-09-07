import React from "react";
import CheckBox from "react-native-check-box";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  Pressable,
} from "react-native";

type CheckboxProps = {
  isChecked: boolean;
  onChange: () => void;
  text: string;
  isError?: boolean;
  errorMessage?: string;
  style?: StyleProp<TextStyle> | undefined;
};

export default function Checkbox({
  isChecked,
  onChange,
  text,
  style,
  isError,
  errorMessage,
}: CheckboxProps) {
  return (
    <>
      <Pressable style={[styles.container, style]} onPress={onChange}>
        <CheckBox
          isChecked={isChecked}
          onClick={onChange}
          checkBoxColor={isError ? "#FA7171" : "#1696E2"}
          checkedCheckBoxColor={isError ? "#FA7171" : "#1696E2"}
          rightTextStyle={styles.checkboxText}
        />
        <Text style={styles.checkboxText}>{text}</Text>
      </Pressable>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  checkboxText: {
    fontFamily: "P",
    fontSize: 17,
    color: "#202020",
    paddingLeft: 14,
    flex: 1,
  },
  errorMessage: {
    color: "#FA7171",
    fontFamily: "OS-SB",
    paddingTop: 8,
  },
});
