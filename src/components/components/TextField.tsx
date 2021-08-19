import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface OnChanfeFunction {
  (text: string): void;
}

interface TextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  fixed?: boolean;
  validations?: Array<Function>;
  errorMessage?: string;
  value?: string;
  search?: boolean;
  onChangeFunction: OnChanfeFunction;
}

export default function TextField({
  placeholder,
  fixed = false,
  errorMessage,
  onChangeFunction,
  value,
  search,
  ...props
}: TextFieldPropsInterface) {
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
        <Text style={styles.redText}>*</Text>
      </Text>
      {search && !focused ? (
        <Feather
          name="search"
          size={16}
          color="#668395"
          style={styles.searchIcon}
        />
      ) : null}
      <TextInput
        {...props}
        placeholder={!focused ? placeholder : ""}
        placeholderTextColor="#909090"
        returnKeyType={"done"}
        style={[
          styles.emptyInput,
          focused ? styles.fullInput : null,
          focused ? null : styles.focuslessInput,
          localValue ? styles.inputWithText : null,
          errorMessage ? styles.errorBorder : null,
          search && !focused ? styles.search : null,
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
    height: 68,
    justifyContent: "flex-end",
  },
  emptyInput: {
    backgroundColor: "#EFF7FD",
    borderRadius: 10,
    height: 44,
    fontSize: 15,
    paddingHorizontal: 16,
    fontFamily: "P",
  },
  search: {
    paddingLeft: 50,
  },
  searchIcon: {
    position: "absolute",
    top: "55%",
    left: "5%",
    zIndex: 1,
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
  label: {
    color: "#1696E2",
    fontSize: 14,
    lineHeight: 22,
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
