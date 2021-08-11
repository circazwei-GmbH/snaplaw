import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import UserAvatar from "../components/UserAvatar";
import VerificationCounter from "../components/VerificationCounter";
import { toggleBoolValue } from "../../utils/toggleBoolValue";
import {useAppSelector} from "../../store/hooks";

export default function MyProfileAvatarBox() {
  const [sizeSmall, setSizeSmall] = useState(true);
  const url = useAppSelector(state => state.profile.user.avatar)

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="MyProfileAvatarBox.toggle"
        style={styles.avatar}
        onPress={() => toggleBoolValue(sizeSmall, setSizeSmall)}
      >
        <UserAvatar sizeSmall={sizeSmall} url={url} />
      </TouchableOpacity>
      <VerificationCounter sizeSmall={sizeSmall} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 18,
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
  avatar: {
    alignItems: "center",
    width: "100%",
  },
});
