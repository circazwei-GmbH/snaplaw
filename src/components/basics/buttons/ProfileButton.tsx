import React, { useState } from 'react'
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native'
//import { TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons'

interface ButtonPropsInterface {
  text: string
  onPress: (() => void)
  style?: object
  type?: 'link'
}

export default function ProfileButton({ text, onPress, style, type }: ButtonPropsInterface) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          {text}
        </Text>
        {
          type === 'link'
            ? <MaterialIcons
              name="arrow-forward-ios"
              size={16}
              color="#668395"
            />
            : null
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 45,
    paddingHorizontal: 16,
    backgroundColor: '#F8FCFF',
    elevation: 2
  },
  buttonText: {
    fontSize: 17,
    color: '#202020'
  }
})