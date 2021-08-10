import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationBell(): JSX.Element {
  const [haveNew] = useState(true);

  return (
    <View style={styles.container}>
      <Ionicons name="notifications-outline" size={24} color="#668395" />
      {haveNew ? <View testID="bell.pinkDot" style={styles.pinkDot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    width: 100,
    height: 45,
  },
  pinkDot: {
    position: "absolute",
    top: 7,
    left: 28,
    width: 12,
    height: 12,
    backgroundColor: "#FF79CA",
    borderRadius: 15,
  },
});
