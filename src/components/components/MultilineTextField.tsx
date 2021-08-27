import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";

interface OnChangeFunction {
  (text: string): void;
}

interface MultilineTextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  fixed?: boolean;
  value?: string;
  onChangeFunction: OnChangeFunction;
}

export default function MultilineTextField({
  placeholder,
  fixed = false,
  onChangeFunction,
  value,
  ...props
}: MultilineTextFieldPropsInterface) {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    if (typeof onChangeFunction === "function") {
      onChangeFunction(text);
    }
  };

  return (
    <View style={[styles.inputContainer]}>
      <TextInput
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
        ]}
        value={localValue}
        onChangeText={textChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
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
    height: 140,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontFamily: "P",
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
});
