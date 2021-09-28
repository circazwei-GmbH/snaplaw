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
  validations?: Array<Function>;
  errorMessage?: string;
  value: string | undefined;
  edit: boolean;
  onChangeFunction: OnChangeFunction;
}

export default function EditProfileTextField({
  placeholder,
  errorMessage,
  onChangeFunction,
  value,
  edit,
  ...props
}: EditProfileTextFieldPropsInterface): JSX.Element {
  const [focused, setFocused] = useState(false);

  const textChangeHandler = (text: string) => {
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
      {value?.length === 0 ? null : (
        <Text style={[styles.label]}>{placeholder}</Text>
      )}
      <TextInput
        {...props}
        placeholder={!focused && !errorMessage ? placeholder : ""}
        placeholderTextColor="#909090"
        testID="Input"
        style={[
          styles.emptyInput,
          focused ? styles.fullInput : null,
          focused ? null : styles.focuslessInput,
          value ? styles.inputWithText : null,
        ]}
        value={value}
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
    minHeight: 68,
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
    color: "#000",
  },
  focuslessInput: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  label: {
    color: "#1696E2",
    fontSize: 14,
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
});
