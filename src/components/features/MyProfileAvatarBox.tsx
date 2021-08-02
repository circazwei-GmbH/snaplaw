import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import ProfileHeadline from '../basics/typography/ProfileHeadline'
import UserAvatar from '../components/UserAvatar'
import VerificationCounter from '../components/VerificationCounter'

export default function MyProfileAvatarBox() {
  const [avatarSize, setAvatarSize] = useState('small')

  const toggleAvatarSize = (size: string) => {
    size === 'big' ? setAvatarSize('small') : setAvatarSize('big')
  }

  return (
    <View style={styles.container}>
      <ProfileHeadline text="My Profile" />
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => toggleAvatarSize(avatarSize)}
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
    minHeight: 250,
    paddingTop: 48,
    paddingBottom: 18,
    backgroundColor: '#F8FCFF',
    elevation: 2
  },
  avatar: {
    alignItems: 'center',
    width: '100%',
  }
})