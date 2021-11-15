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
  testID?: string;
  disabled?: boolean;
};

export default function Checkbox({
  isChecked,
  onChange,
  text,
  style,
  isError,
  errorMessage,
  testID,
  disabled,
}: CheckboxProps) {
  return (
    <>
      <Pressable
        style={[styles.container, style]}
        onPress={onChange}
        testID={testID}
        disabled={disabled}
      >
        <CheckBox
          isChecked={isChecked}
          onClick={onChange}
          checkBoxColor={disabled ? "#909090" : isError ? "#FA7171" : "#1696E2"}
          checkedCheckBoxColor={
            disabled ? "#909090" : isError ? "#FA7171" : "#1696E2"
          }
          disabled={disabled}
        />
        <Text style={[styles.checkboxText, disabled && styles.disabledText]}>{text}</Text>
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
  disabledText: {
    color: "#909090",
  },
  errorMessage: {
    color: "#FA7171",
    paddingTop: 8,
  },
});
