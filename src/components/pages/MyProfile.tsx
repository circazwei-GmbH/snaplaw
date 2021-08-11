import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useAppDispatch } from "../../store/hooks";
import TopBar from "../layouts/TopBar";
import ProfileButton from "../basics/buttons/ProfileButton";
import MyProfileAvatarBox from "../features/MyProfileAvatarBox";
import NotificationBell from "../components/NotificationBell";
import * as RootNavigation from "../../router/RootNavigation";
import { PROFILE_ROUTER } from "../../router/ProfileRouterTypes";
import { useI18n } from "../../translator/i18n";
import {clearToken} from "../../store/modules/auth/action-creators";

export default function MyProfile(): JSX.Element {
  const dispatch = useAppDispatch();
  const killTokenHandler = () => {
    dispatch(clearToken());
  };

  const { t } = useI18n();

  return (
    <TopBar
      pageName={t("my_profile.headline")}
      leftButton={<NotificationBell />}
      style={styles.topBarBackground}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <MyProfileAvatarBox />
        <ProfileButton
          testID="MyProfile.my_profile"
          text={t("my_profile.buttons_text.my_profile")}
          onPress={() => RootNavigation.navigate(PROFILE_ROUTER.EDIT_PROFILE)}
          type="link"
        />
        <ProfileButton
          testID="MyProfile.language"
          text={t("my_profile.buttons_text.language")}
          onPress={() =>
            RootNavigation.navigate(PROFILE_ROUTER.CHANGE_LANGUAGE)
          }
          type="link"
        />
        <ProfileButton
          text={t("my_profile.buttons_text.notifications")}
          onPress={() => alert("Hi")}
          type="link"
        />
        <ProfileButton
          text={t("my_profile.buttons_text.invite_friends")}
          onPress={() => alert("Hi")}
          type="link"
        />
        <ProfileButton
          text={t("my_profile.buttons_text.private_policy")}
          onPress={() => alert("Hi")}
          type="link"
        />
        <ProfileButton
          text={t("my_profile.buttons_text.change_password")}
          onPress={() => alert("Hi")}
          type="link"
        />
        <ProfileButton
          text={t("my_profile.buttons_text.sign_out")}
          onPress={killTokenHandler}
        />
        <ProfileButton
          text={t("my_profile.buttons_text.delete_profile")}
          onPress={() => alert("Hi")}
        />
      </ScrollView>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  topBarBackground: {
    backgroundColor: "#F8FCFF",
  },
});
