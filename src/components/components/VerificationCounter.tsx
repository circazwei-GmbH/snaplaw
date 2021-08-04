import React from 'react'
import { Text, View, StyleSheet } from "react-native"

interface VerificationCounterPropsInterface {
  size: string
}

export default function ProfileHeadline({ size }: VerificationCounterPropsInterface) {
  return (
    <View style={
      size === 'small'
        ? styles.vertical
        : styles.horizontal
    }>
      <Text style={styles.textGray}>
        You have been verified by
      </Text>
      <Text style={styles.textBlack}>
        300 people
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10
  },
  textBlack: {
    width: '30%',
    fontFamily: 'OS-SB',
    fontSize: 16,
    fontWeight: "600",
    color: '#202020',
    textAlign: 'right'
  },
  textGray: {
    width: '60%',
    fontSize: 16,
    fontWeight: "400",
    color: '#909090',
    textAlign: 'left'
  }
})