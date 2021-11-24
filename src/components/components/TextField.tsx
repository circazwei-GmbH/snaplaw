import React, { useState, useEffect, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

interface OnChangeFunction {
  (text: string): void;
}

interface TextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  validations?: Array<Function>;
  errorMessage?: string;
  value?: string;
  search?: boolean;
  onChangeFunction: OnChangeFunction;
  containerStyle?: StyleProp<TextStyle>;
  onFocus?: () => void;
  disabled?: boolean
}

export default function TextField({
  placeholder,
  errorMessage,
  onChangeFunction,
  value,
  search,
  containerStyle,
  onFocus,
  disabled,
  ...props
}: TextFieldPropsInterface): JSX.Element {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const input: any = useRef();

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    onChangeFunction(text);
  };
  
  const cancelButtonHandler = () => {
    setLocalValue("");
    input.current.blur();
  };

  const handleFocus = () => {
    if (typeof onFocus === "function") onFocus();
    setFocused(true);
  };

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <View
      style={[
        containerStyle,
        styles.inputContainer,
        (value || focused) && !search ? null : styles.paddingForLabel,
      ]}
    >
      {search ? null : (
        <Text
          style={[
            styles.label,
            focused || localValue ? null : styles.labelWithEmptyInputDance,
          ]}
        >
          {placeholder}
          <Text style={styles.redText}>*</Text>
        </Text>
      )}
      {search && !focused ? (
        <Feather
          name="search"
          size={16}
          color="#668395"
          style={styles.searchIcon}
        />
      ) : null}
      {search && focused ? (
        <TouchableOpacity
          style={styles.crossButton}
          onPress={cancelButtonHandler}
          testID="EntypoCancelbutton"
        >
          <Entypo name="cross" size={20} color="#668395" />
        </TouchableOpacity>
      ) : null}
      <TextInput
        {...props}
        ref={input}
        placeholder={!focused ? placeholder : ""}
        placeholderTextColor="#909090"
        editable={!disabled}
        style={[
          styles.emptyInput,
          focused ? styles.fullInput : null,
          focused ? null : styles.focuslessInput,
          localValue ? styles.inputWithText : null,
          props.editable === undefined ? null : styles.inputNotEditable,
          errorMessage ? styles.errorBorder : null,
          search && !focused ? styles.search : null,
          disabled ? styles.inputNotEditable : null
        ]}
        value={localValue}
        onChangeText={textChangeHandler}
        onFocus={handleFocus}
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
    justifyContent: "flex-end",
    minHeight: 68,
  },
  paddingForLabel: {
    paddingTop: 22,
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
    top: "80%",
    left: "5%",
    zIndex: 1,
  },
  crossButton: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    top: "50%",
    right: 0,
    zIndex: 1,
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
