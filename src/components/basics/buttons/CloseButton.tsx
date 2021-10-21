import React from "react";
import {
  Pressable,
  StyleSheet,
  Dimensions,
  StyleProp,
  TextStyle,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

interface CloseButtonInterface {
  onPress: () => void;
  style?: StyleProp<TextStyle>;
}

export default function CloseButton({
  onPress,
  style,
}: CloseButtonInterface): JSX.Element {
  return (
    <Pressable onPress={onPress} style={style}>
      <EvilIcons name="close" size={24} color="#668395" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    width: Dimensions.get("window").width * 0.28,
    height: 45,
  },
});
