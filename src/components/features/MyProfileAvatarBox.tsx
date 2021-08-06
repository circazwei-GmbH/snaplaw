import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import UserAvatar from "../components/UserAvatar";
import VerificationCounter from "../components/VerificationCounter";
import { toggleAvatarSize } from "../../utils/toggleAvatarSize";

export default function MyProfileAvatarBox(): JSX.Element {
  const [avatarSize, setAvatarSize] = useState("small");
  const [url, setUrl] = useState<undefined | string>(undefined);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="MyProfileAvatarBox.toggle"
        style={styles.avatar}
        onPress={() => toggleAvatarSize(avatarSize, setAvatarSize)}
      >
        <UserAvatar size={avatarSize} url={url} />
      </TouchableOpacity>
      <VerificationCounter size={avatarSize} />
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
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  avatar: {
    alignItems: "center",
    width: "100%",
  },
});
