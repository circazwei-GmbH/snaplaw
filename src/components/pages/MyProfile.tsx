import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import ProfileButton from '../basics/buttons/ProfileButton'

export default function MyProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>MyProfile Screen</Text>
      <ProfileButton
        text="My profile"
        onPress={() => alert('Hi')}
        type="link"
      />
      <ProfileButton
        text="Language"
        onPress={() => alert('Hi')}
        type="link"
      />
      <ProfileButton
        text="Notifications"
        onPress={() => alert('Hi')}
        type="link"
      />
      <ProfileButton
        text="Invite friends"
        onPress={() => alert('Hi')}
        type="link"
      />
      <ProfileButton
        text="Privacy Policy"
        onPress={() => alert('Hi')}
        type="link"
      />
      <ProfileButton
        text="Change password"
        onPress={() => alert('Hi')}
        type="link"
      />
      <ProfileButton
        text="Sign out"
        onPress={() => alert('Hi')}
      />
      <ProfileButton
        text="Delete profile"
        onPress={() => alert('Hi')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
  },
  placeholder: {
    height: 250,
    marginTop: 25,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#F8FCFF',
    elevation: 2
  }
})