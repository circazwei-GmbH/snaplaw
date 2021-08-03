import React, { ReactElement } from 'react'
import { View, StyleSheet, Text, Pressable } from "react-native"
import BackButton from '../basics/buttons/BackButton'

interface TopBarProps {
  children: ReactElement
  pageName?: string
  leftButton?: JSX.Element
  rightButton?: JSX.Element
  style?: object
}

export default function HeaderNavigation({
  children,
  pageName,
  leftButton,
  rightButton,
  style
}: TopBarProps) {
  return (
    <>
      <View style={[styles.header, style]}>
        {
          leftButton === undefined ? <BackButton /> : leftButton
        }
        <Text style={styles.headerText}>
          {pageName}
        </Text>
        {
          rightButton === undefined
            ? <View style={styles.buttonPlaceholder} />
            : rightButton
        }
      </View>
      {children}
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    textAlign: "center",
    fontFamily: 'OS-SB',
    fontSize: 17
  },
  buttonPlaceholder: {
    width: 45,
    height: 45,
  }
})