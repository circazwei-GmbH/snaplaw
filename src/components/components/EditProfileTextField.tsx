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

interface EditProfileTextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  fixed?: boolean;
  validations?: Array<Function>;
  errorMessage?: string;
  value?: string;
  onChangeFunction: OnChangeFunction;
}

export default function EditProfileTextField({
  placeholder,
  fixed = false,
  errorMessage,
  onChangeFunction,
  value,
  ...props
}: EditProfileTextFieldPropsInterface) {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    if (typeof onChangeFunction === "function") {
      onChangeFunction(text);
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        focused ? styles.borderFocused : styles.borderNotFocused,
      ]}
    >
      <Text
        style={[
          styles.label,
          focused || localValue
            ? null
            : fixed
            ? styles.labelWithEmptyInputFixed
            : styles.labelWithEmptyInputDance,
        ]}
      >
        {placeholder}
      </Text>
      <TextInput
        {...props}
        placeholder={!focused ? placeholder : ""}
        placeholderTextColor="#909090"
        style={[
          styles.emptyInput,
          focused ? styles.fullInput : null,
          focused ? null : styles.focuslessInput,
          localValue ? styles.inputWithText : null,
          errorMessage ? styles.errorBorder : null,
        ]}
        value={localValue}
        onChangeText={textChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <Text
        style={[styles.errorText, errorMessage ? null : styles.displayNone]}
      >
        {errorMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 67,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  borderNotFocused: {
    borderBottomColor: "#EFF7FD",
  },
  borderFocused: {
    borderBottomColor: "#C3E1F6",
  },
  emptyInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 40,
    fontSize: 15,
    fontFamily: "P",
  },
  fullInput: {
    backgroundColor: "transparent",
    fontSize: 17,
  },
  inputWithText: {
    fontSize: 17,
  },
  focuslessInput: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  label: {
    color: "#1696E2",
    fontSize: 14,
  },
  labelWithEmptyInputFixed: {
    opacity: 0,
  },
  labelWithEmptyInputDance: {
    display: "none",
  },
  redText: {
    color: "#FA7171",
  },
  errorText: {
    paddingTop: 5,
    color: "#FA7171",
  },
  displayNone: {
    display: "none",
    marginBottom: 8,
  },
  errorBorder: {
    borderColor: "#FA7171",
  },
});
