import React from "react";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type UndoButton = {
  onPress: () => void;
  style?: StyleProp<TextStyle>;
};

export default function UndoButton({ onPress, style }: UndoButton) {
  return (
    <TouchableOpacity testID="UndoButton" onPress={onPress} style={style}>
      <Ionicons name="md-arrow-undo-circle" size={30} color="#1696E2" />
    </TouchableOpacity>
  );
}
