import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";

type NumberInputProps = {
  style: StyleSheet;
  onChange?: Function;
};

export default forwardRef(
  ({ style, onChange }: NumberInputProps, ref: ForwardedRef<ReactNode>) => (
    <TextInput
      ref={ref}
      testID="numeric.input"
      keyboardType="numeric"
      maxLength={1}
      onChangeText={onChange}
      style={[styles.input, style]}
    />
  )
);

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(22, 150, 226, 0.08)",
    height: 51,
    width: 61,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#1696E2",
    fontFamily: "P",
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontSize: 32,
      },
      android: {
        fontSize: 24,
      },
    }),
  },
});
