import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType
} from "react-native"
import { AntDesign } from '@expo/vector-icons'

interface UserAvatarPropsInterface {
  size: string
  url?: ImageSourcePropType
}

export default function UserAvatar({ size, url }: UserAvatarPropsInterface) {
  return (
    <View style={
      size === 'small'
        ? styles.containerSmall
        : styles.containerBig
    }>
      {
        url
          ? <Image source={url} />
          : <AntDesign name="user" size={75} color="black" />
      }
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
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 32,
  },
  containerBig: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
    height: 300,
    backgroundColor: '#fff',

  }
})