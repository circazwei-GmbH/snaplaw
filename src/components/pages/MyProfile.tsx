import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { useAppDispatch } from "../../store/hooks"
import { killToken } from '../../store/modules/auth/slice'
import TopBar from '../layouts/TopBar'
import ProfileButton from '../basics/buttons/ProfileButton'
import MyProfileAvatarBox from '../features/MyProfileAvatarBox'
import NotificationBell from '../components/NotificationBell'

export default function MyProfile(): JSX.Element {
  const dispatch = useAppDispatch()
  const killTokenHandler = () => {
    dispatch(killToken())
  }

  return (
    <TopBar
      pageName="My Profile"
      leftButton={<NotificationBell />}
      style={styles.topBarBackground}
    >
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
    </TopBar>
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
  topBarBackground: {
    backgroundColor: '#F8FCFF'
  }
})