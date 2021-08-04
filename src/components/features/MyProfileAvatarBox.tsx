import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import UserAvatar from '../components/UserAvatar'
import VerificationCounter from '../components/VerificationCounter'

export default function MyProfileAvatarBox() {
  const [avatarSize, setAvatarSize] = useState('small')

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
        <UserAvatar size={avatarSize} />
      </TouchableOpacity>
      <VerificationCounter size={avatarSize} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minHeight: 190,
    paddingBottom: 18,
    backgroundColor: '#F8FCFF',
    elevation: 2
  },
  avatar: {
    alignItems: 'center',
    width: '100%',
  }
})