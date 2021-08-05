import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { t } from 'i18n-js'
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
      pageName={t('my_profile.headline')}
      leftButton={<NotificationBell />}
      style={styles.topBarBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <MyProfileAvatarBox />
        <ProfileButton
          text={t('my_profile.buttons_text.my_profile')}
          onPress={() => alert('Hi')}
          type="link"
        />
        <ProfileButton
          text={t('my_profile.buttons_text.language')}
          onPress={() => alert('Hi')}
          type="link"
        />
        <ProfileButton
          text={t('my_profile.buttons_text.notifications')}
          onPress={() => alert('Hi')}
          type="link"
        />
        <ProfileButton
          text={t('my_profile.buttons_text.invite_friends')}
          onPress={() => alert('Hi')}
          type="link"
        />
        <ProfileButton
          text={t('my_profile.buttons_text.private_policy')}
          onPress={() => alert('Hi')}
          type="link"
        />
        <ProfileButton
          text={t('my_profile.buttons_text.change_password')}
          onPress={() => alert('Hi')}
          type="link"
        />
        <ProfileButton
          text={t('my_profile.buttons_text.sign_out')}
          onPress={killTokenHandler}
        />
        <ProfileButton
          text={t('my_profile.buttons_text.delete_profile')}
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