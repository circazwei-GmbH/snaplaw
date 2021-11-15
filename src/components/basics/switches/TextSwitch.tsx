import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

export enum TEXT_SWITCH_POSITION {
  LEFT,
  RIGHT,
}

type TextSwitchProps = {
  left: string;
  right: string;
  currentPosition: TEXT_SWITCH_POSITION;
  onChange: (state: TEXT_SWITCH_POSITION) => void;
};

export default function TextSwitch({
  left,
  right,
  currentPosition,
  onChange,
}: TextSwitchProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.item,
          currentPosition === TEXT_SWITCH_POSITION.LEFT
            ? styles.selectedItem
            : null,
        ]}
        onPress={() => onChange(TEXT_SWITCH_POSITION.LEFT)}
      >
        <Text
          style={[
            styles.text,
            currentPosition === TEXT_SWITCH_POSITION.LEFT
              ? styles.selectedText
              : null,
          ]}
        >
          {left}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.item,
          currentPosition === TEXT_SWITCH_POSITION.RIGHT
            ? styles.selectedItem
            : null,
        ]}
        onPress={() => onChange(TEXT_SWITCH_POSITION.RIGHT)}
      >
        <Text
          style={[
            styles.text,
            currentPosition === TEXT_SWITCH_POSITION.RIGHT
              ? styles.selectedText
              : null,
          ]}
        >
          {right}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1696E2",
    borderRadius: 9,
    justifyContent: "center",
    flexDirection: "row",
    padding: 2,
  },
  item: {
    width: "50%",
    paddingVertical: 6,
    borderRadius: 9,
  },
  selectedItem: {
    backgroundColor: "#fff",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "OS",
    fontSize: 15,
  },
  selectedText: {
    color: "#202020",
  },
});
