import React from 'react'
import {
  View,
  StyleSheet,
  Image
} from "react-native"

interface UserAvatarPropsInterface {
  size: 'small' | 'big'
  url?: string
}

export default function UserAvatar({ size, url }: UserAvatarPropsInterface) {
  const getAvatar = () => {
    return url ? {uri: url} : require('../../../assets/user_profile.png')
  }
  return (
    <View style={
      size === 'small'
        ? styles.containerSmall
        : styles.containerBig
    }>
      <Image source={getAvatar()} style={styles.image} />
    </ View>
  )
}

const styles = StyleSheet.create({
  containerSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 32,
    overflow: 'hidden'
  },
  containerBig: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    height: 300,
    backgroundColor: '#fff',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  }
})