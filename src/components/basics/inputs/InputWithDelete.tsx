import React, { useState, useEffect, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
  StyleProp,
  TextStyle,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import VerticalDivider from "../dividers/VerticalDivieder";

interface OnChangeFunction {
  (text: string): void;
}

interface InputWithDeletePropsInterface extends TextInputProps {
  canDelete: boolean;
  onDelete: () => void;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  onChangeFunction: OnChangeFunction;
  containerStyle?: StyleProp<TextStyle>;
  onFocus?: () => void;
  testID?: string;
}

export default function InputWithDelete({
  canDelete,
  placeholder,
  errorMessage,
  onChangeFunction,
  value,
  containerStyle,
  onFocus,
  onDelete,
  testID,
  ...props
}: InputWithDeletePropsInterface): JSX.Element {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const input: any = useRef();

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    onChangeFunction(text);
  };

  const handleFocus = () => {
    if (typeof onFocus === "function") onFocus();
    setFocused(true);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <>
      <Text
        style={[
          styles.label,
          focused || localValue ? null : styles.labelWithEmptyInputDance,
        ]}
      >
        {placeholder}
        <Text style={styles.redText}>*</Text>
      </Text>
      <View
        style={[
          styles.inputContainer,
          errorMessage ? styles.errorBorder : null,
          focused ? styles.fullInput : null,
          focused ? null : styles.focuslessInput,
        ]}
      >
        <TextInput
          {...props}
          ref={input}
          placeholder={!focused ? placeholder : ""}
          placeholderTextColor="#909090"
          style={[
            styles.emptyInput,
            localValue ? styles.inputWithText : null,
            props.editable === undefined ? null : styles.inputNotEditable,
            canDelete ? styles.delete : null,
          ]}
          value={localValue}
          onChangeText={textChangeHandler}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
        />
        {canDelete ? (
          <View style={styles.rightPart}>
            <View style={styles.dividerContainer}>
              <VerticalDivider />
            </View>
            <Pressable
              onPress={onDelete}
              style={styles.iconContainer}
              testID={`Delete${testID}`}
            >
              <MaterialIcons name="delete-outline" size={22} color="#668395" />
            </Pressable>
          </View>
        ) : null}
      </View>
      <Text
        style={[styles.errorText, errorMessage ? null : styles.displayNone]}
      >
        {errorMessage}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#EFF7FD",
    height: 44,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 29,
  },
  dividerContainer: {
    paddingVertical: 7,
  },
  rightPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  emptyInput: {
    fontSize: 15,
    paddingHorizontal: 16,
    fontFamily: "P",
    justifyContent: "center",
    width: "100%",
  },
  delete: {
    width: "80%",
  },
  fullInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BBD1DE",
    fontSize: 17,
  },
  inputNotEditable: {
    backgroundColor: "#F2F2F2",
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
