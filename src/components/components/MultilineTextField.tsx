import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  Text,
} from "react-native";

interface OnChangeFunction {
  (text: string): void;
}

interface MultilineTextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeFunction: OnChangeFunction;
  errorMessage?: string;
}

export default function MultilineTextField({
  placeholder,
  value,
  onChangeFunction,
  errorMessage,
  ...props
}: MultilineTextFieldPropsInterface) {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    onChangeFunction(text);
  };

  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        testID={placeholder}
        {...props}
        placeholder={!focused ? placeholder : ""}
        placeholderTextColor="#909090"
        autoCapitalize={"sentences"}
        multiline={true}
        style={[
          styles.emptyInput,
          focused ? styles.fullInput : null,
          focused ? null : styles.focuslessInput,
          localValue ? styles.inputWithText : null,
          errorMessage ? styles.fieldOnError : null,
        ]}
        value={localValue}
        onChangeText={textChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: "flex-end",
    marginTop: 16,
    marginBottom: 24,
  },
  emptyInput: {
    textAlignVertical: "top",
    backgroundColor: "#EFF7FD",
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontFamily: "P",
    height: 140,
  },
  fullInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BBD1DE",
    fontSize: 17,
  },
  inputWithText: {
    fontSize: 17,
  },
  focuslessInput: {
    backgroundColor: "#EFF7FD",
    borderWidth: 1,
    borderColor: "transparent",
  },
  displayNone: {
    display: "none",
    marginBottom: 8,
  },
  fieldOnError: {
    borderColor: "#FA7171",
    borderWidth: 1,
  },
  errorMessage: {
    color: "#FA7171",
    paddingTop: 8,
  },
});
