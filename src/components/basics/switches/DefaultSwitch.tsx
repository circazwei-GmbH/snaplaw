import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

type DefaultSwitchProps = {
  title: string;
  value: boolean;
  onChange: (isEnabled: boolean) => void;
  disabled?: boolean
};

export default function DefaultSwitch({
  title,
  onChange,
  value,
  disabled,
}: DefaultSwitchProps) {
  
  return (
    <View style={[styles.container, disabled && styles.disabledContainder]}>
      <Text style={[styles.buttonText, disabled && styles.disabledText]}>{title}</Text>
      <Switch
        testID={`Switch.${title}`}
        trackColor={{
          false: "#E2E8ED",
          true: "#1696E2",
        }}
        thumbColor="#fff"
        onValueChange={onChange}
        value={value}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    minHeight: 45,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 10,
    backgroundColor: "#F8FCFF",
    elevation: 1,
    shadowColor: "rgba(196, 211, 220, 0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  disabledContainder: {
    backgroundColor: "#F2F2F2",
  },
  disabledText: {
    color: "#909090"
  },
  buttonText: {
    fontSize: 17,
    color: "#202020",
    fontFamily: "P",
    flex: 1,
    paddingRight: 10,
  },
});
