import React, { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const LIST_ITEM_HEIGHT = 50;

interface OnChangeFunction {
  (text: string): void;
}

interface InviteTextFieldPropsInterface extends TextInputProps {
  placeholder?: string;
  validations?: Array<Function>;
  errorMessage?: string;
  value: string;
  onChangeFunction: OnChangeFunction;
  containerStyle?: StyleProp<TextStyle>;
  list: string[];
  getList: () => void;
  setValue: (email: string) => any;
}

export default function InviteTextField({
  placeholder,
  errorMessage,
  onChangeFunction,
  value,
  containerStyle,
  list,
  getList,
  setValue,
  ...props
}: InviteTextFieldPropsInterface): JSX.Element {
  const [localValue, setLocalValue] = useState(value);
  const [focused, setFocused] = useState(false);

  const textChangeHandler = (text: string) => {
    setLocalValue(text);
    if (typeof onChangeFunction === "function") {
      onChangeFunction(text);
    }
  };

  useEffect(() => {
    setValue(localValue);
  }, [localValue]);

  useEffect(() => {
    if (list.length === 0 && focused) {
      getList();
    }
  }, [focused]);

  const onPressListItem = (newValue: string) => setLocalValue(newValue);

  const inputButtonHandler = () => {
    setFocused(!focused);
  };

  const renderItem = (item: string): JSX.Element => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.listItem}
      onPress={() => onPressListItem(item)}
    >
      <Text style={styles.listItemText}>{item}</Text>
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
      {focused && list?.length > 0 ? (
        <FlatList
          style={[
            styles.list,
            errorMessage ? styles.listTopPositionError : styles.listTopPosition,
          ]}
          data={list}
          keyExtractor={(item) => item}
          renderItem={({ item }) => renderItem(item)}
          onEndReached={() => getList()}
          onEndReachedThreshold={0.0001}
          keyboardShouldPersistTaps="handled"
          getItemLayout={(data, index) => ({
            length: LIST_ITEM_HEIGHT,
            offset: LIST_ITEM_HEIGHT * index,
            index,
          })}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
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
    height: Dimensions.get("window").height / 4,
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    zIndex: 2,
  },
  listTopPosition: {
    top: 55,
  },
  listTopPositionError: {
    top: 75,
  },
  listItem: {
    height: LIST_ITEM_HEIGHT,
    justifyContent: "center",
    borderBottomColor: "#EFF7FD",
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  listItemText: {
    fontSize: 15,
  },
});
