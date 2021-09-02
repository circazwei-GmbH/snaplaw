import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as RootNavigation from "../../../router/RootNavigation";

export default function BackButton(): JSX.Element {
  const backHandler = () => {
    RootNavigation.pop();
  };

  return (
    <Pressable
      testID="BackButton.back"
      onPress={backHandler}
      style={styles.backButton}
    >
      <SimpleLineIcons name="arrow-left" size={16} color="#668395" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    width: "28%",
    height: 45,
  },
});
