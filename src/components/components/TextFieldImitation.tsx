import React from "react";
import { View, StyleSheet, Text, StyleProp, TextStyle } from "react-native";

interface TextFieldImitationPropsInterface {
  placeholder?: string;
  value?: string;
  settings?: boolean;
  gray?: boolean;
  errorMessage?: string;
  children?: JSX.Element;
}

export default function TextFieldImitation({
  placeholder,
  value,
  settings,
  gray,
  errorMessage,
  children,
}: TextFieldImitationPropsInterface): JSX.Element {
  return (
    <View
      style={[
        styles.inputContainer,
        settings ? { paddingHorizontal: 16 } :  null,
        settings ? styles.borderSettings : styles.border,
      ]}
      testID={placeholder}
    >
      <View style={styles.labelBox}>
        <Text style={[
           !settings && !value ? styles.labelWithEmptyInputDance : null,
          styles.label
        ]}>
          {placeholder}
        </Text>
        {settings || !value ? null : <Text style={styles.redText}>*</Text>}
      </View>
      <View
        style={[
          settings ? styles.input : styles.emptyInput,
          gray ? styles.inputNotEditable : null,
          !settings && errorMessage ? styles.errorBorder : null,
        ]}
      >
        { value || (settings && errorMessage) 
         ? (
              <Text
                style={[
                  styles.inputWithText,
                  settings ? null : styles.lineHeight,
                  gray ? styles.grayText : null,
                ]}
              >
                {value}
              </Text>
            )
          : (
            <Text
              style={[
                styles.inputWithText,
                styles.placeholder,
                settings ? null : styles.lineHeight,
              ]}
            >
              {placeholder}
            </Text>
          )
        }
        {children || null}
      </View>
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
    paddingTop: 6,
    borderBottomWidth: 1,
    minHeight: 68,
  },
  border: {
    borderBottomColor: "transparent",
  },
  borderSettings: {
    borderBottomColor: "#EFF7FD",
  },
  labelBox: {
    flexDirection: "row",
    height: 21,
  },
  input: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  emptyInput: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    fontSize: 15,
    paddingHorizontal: 16,
    backgroundColor: "#EFF7FD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputNotEditable: {
    backgroundColor: "#F2F2F2",
  },
  inputWithText: {
    fontFamily: "P",
    fontSize: 17,
    lineHeight: 40,
    color: "#000"
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
  label: {
    color: "#1696E2",
    fontSize: 14,
  },
  labelMargin: {
    marginHorizontal: 16,
  },
  placeholder: {
    color: "#909090",
    fontSize: 15,
  },
  errorBorder: {
    borderColor: "#FA7171",
  },
  errorText: {
    paddingTop: 5,
    color: "#FA7171",
  },
  displayNone: {
    display: "none",
    marginBottom: 8,
  },
  labelWithEmptyInputDance: {
    display: "none",
  },
});
