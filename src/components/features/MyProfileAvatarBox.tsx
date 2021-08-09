<<<<<<< HEAD
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import UserAvatar from "../components/UserAvatar";
import VerificationCounter from "../components/VerificationCounter";
import { toggleBoolValue } from "../../utils/toggleBoolValue";

export default function MyProfileAvatarBox(): JSX.Element {
  const [sizeSmall, setSizeSmall] = useState(true);
  const [url, setUrl] = useState<undefined | string>(undefined);
=======
import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from "react-native"
import UserAvatar from '../components/UserAvatar'
import VerificationCounter from '../components/VerificationCounter'

export default function MyProfileAvatarBox() {
  const [avatarSize, setAvatarSize] = useState('small')
  const [url] = useState<undefined | string>(undefined)

  const toggleAvatarSize = (
    size: string,
    setSize: React.Dispatch<React.SetStateAction<string>>
  ) => {
    size === 'big' ? setSize('small') : setSize('big')
  }
>>>>>>> e231a40fa121abc4978354ff4c91b65890c2dfbc

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
<<<<<<< HEAD
      height: 0,
=======
      height: 2
>>>>>>> e231a40fa121abc4978354ff4c91b65890c2dfbc
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  avatar: {
    alignItems: "center",
    width: "100%",
  },
});
