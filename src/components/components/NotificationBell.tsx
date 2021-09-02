import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PROFILE_ROUTER } from "../../router/ProfileRouterTypes";
import * as RootNavigation from "../../router/RootNavigation";

export default function NotificationBell(): JSX.Element {
  const [haveNew] = useState(true);
  const onPressHandler = () =>
    RootNavigation.navigate(PROFILE_ROUTER.NOTIFICATIONS);

  return (
    <TouchableOpacity
      testID="bell.button"
      style={styles.container}
      onPress={onPressHandler}
    >
      <Ionicons name="notifications-outline" size={24} color="#668395" />
      {haveNew ? <View testID="bell.pinkDot" style={styles.pinkDot} /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
    width: 120,
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
