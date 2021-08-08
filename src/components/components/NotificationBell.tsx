import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import {} from "@testing-library/react-native";

console.log("@testing-library/react-native");

export default function NotificationBell(): JSX.Element {
  const [haveNew, setHaveNew] = useState(true);

  return (
    <View style={styles.container}>
      <Feather name="bell" size={24} color="#668395" />
      {haveNew ? <View testID="bell.pinkDot" style={styles.pinkDot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
  },
  pinkDot: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 12,
    height: 12,
    backgroundColor: "#FF79CA",
    borderRadius: 15,
  },
});
