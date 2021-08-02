import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useAppDispatch } from "../../store/hooks"
import { killToken } from '../../store/modules/auth/slice'
import ProfileButton from '../basics/buttons/ProfileButton'
import MyProfileAvatarBox from '../features/MyProfileAvatarBox'

export default function MyProfile() {
  const dispatch = useAppDispatch()
  const killTokenHandler = () => {
    dispatch(killToken())
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <MyProfileAvatarBox />
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
          onPress={killTokenHandler}
        />
        <ProfileButton
          text="Delete profile"
          onPress={() => alert('Hi')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
})