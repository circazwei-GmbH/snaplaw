import React from "react";
import { StyleSheet, View } from "react-native";

export default function VerticalDivider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    width: 0.5,
    backgroundColor: "#919191",
    height: "100%",
  },
});
