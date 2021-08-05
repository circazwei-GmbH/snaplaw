import React, { ReactElement } from 'react'
import { Pressable, StyleSheet } from "react-native"
import { MaterialIcons } from '@expo/vector-icons'
import * as RootNavigation from '../../../router/RootNavigation'

export default function BackButton(): JSX.Element {
  const backHandler = () => {
    RootNavigation.pop()
  }

  return (
    <Pressable
      testID="HeaderNavigation.back"
      onPress={backHandler}
      style={styles.backButton}
    >
      <MaterialIcons name="arrow-back-ios" size={24} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
  }
})