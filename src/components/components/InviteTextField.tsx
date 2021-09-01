import React, { useState, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  FlatList,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

interface OnChangeFunction {
  (text: string): void;
}

interface InviteTextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  validations?: Array<Function>;
  errorMessage?: string;
  value?: string;
  onChangeFunction: OnChangeFunction;
  containerStyle?: StyleProp<TextStyle>;
  list?: object[];
  getEmails: Function;
}

export default function InviteTextField({
  placeholder,
  errorMessage,
  onChangeFunction,
  value,
  containerStyle,
  list,
  getEmails,
  ...props
}: InviteTextFieldPropsInterface) {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const input: any = useRef();

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    if (typeof onChangeFunction === "function") {
      onChangeFunction(text);
    }
  };
  const inputButtonHandler = () => {
    setFocused(!focused);
    // input.current.blur();
  };
  const listItemPressHandler = (newValue: string) => setLocalValue(newValue);

  const renderItem = (item: object): JSX.Element => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.listItem}
      onPress={() => listItemPressHandler(item.email)}
    >
      <Text style={styles.listItemText}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[containerStyle, styles.inputContainer]}>
      <TouchableOpacity style={styles.button} onPress={inputButtonHandler}>
        {focused ? (
          <SimpleLineIcons name="arrow-up" size={16} color="#668395" />
        ) : (
          <SimpleLineIcons name="arrow-down" size={16} color="#668395" />
        )}
      </TouchableOpacity>
      <TextInput
        {...props}
        ref={input}
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
      {focused ? (
        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => renderItem(item)}
          onEndReached={() => getEmails()}
          onEndReachedThreshold={0.0001}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 50 * index,
            index,
          })}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    height: 50,
    justifyContent: "center",
    borderBottomColor: "#EFF7FD",
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  listItemText: {
    fontSize: 15,
  },
  inputContainer: {
    width: "91%",
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
  button: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    top: 0,
    right: 10,
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
  list: {
    width: "100%",
    height: "530%",
    top: 55,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
});
