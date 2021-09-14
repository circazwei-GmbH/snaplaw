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
} from "react-native";

interface TextFieldImitationPropsInterface {
  placeholder?: string;
  value?: string;
  settings?: boolean;
  gray?: boolean;
}

export default function TextFieldImitation({
  placeholder,
  value,
  settings,
  gray,
}: TextFieldImitationPropsInterface): JSX.Element {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.labelBox}>
        <Text style={[settings ? styles.labelMargin : null, styles.label]}>
          {placeholder}
        </Text>
        {settings ? null : <Text style={styles.redText}>*</Text>}
      </View>
      <View
        style={[
          settings ? styles.input : styles.emptyInput,
          gray ? styles.inputNotEditable : styles.inputEditable,
        ]}
      >
        <Text
          style={[
            styles.inputWithText,
            settings ? null : styles.lineHeight,
            gray ? styles.grayText : null,
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF7FD",
    minHeight: 68,
  },
  labelBox: {
    flexDirection: "row",
  },
  input: {
    paddingHorizontal: 16,
  },
  emptyInput: {
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 16,
  },
  fullInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BBD1DE",
    fontSize: 17,
  },
  inputEditable: {
    backgroundColor: "#EFF7FD",
  },
  inputNotEditable: {
    backgroundColor: "#F2F2F2",
  },
  inputWithText: {
    fontFamily: "P",
    fontSize: 17,
    lineHeight: 40,
  },
  lineHeight: {
    lineHeight: 44,
  },
  grayText: {
    color: "#909090",
  },
  redText: {
    color: "#FA7171",
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
  labelMargin: {
    marginHorizontal: 16,
  },
});
