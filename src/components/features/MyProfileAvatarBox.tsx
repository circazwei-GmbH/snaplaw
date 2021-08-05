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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => toggleAvatarSize(avatarSize, setAvatarSize)}
      >
        <UserAvatar
          size={avatarSize}
          url={url} />
      </TouchableOpacity>
      <VerificationCounter size={avatarSize} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 18,
    backgroundColor: '#F8FCFF',
    elevation: 1,
    shadowColor: 'rgba(196, 211, 220, 0.6)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  avatar: {
    alignItems: 'center',
    width: '100%',
  }
})