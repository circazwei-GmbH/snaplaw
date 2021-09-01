import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useI18n } from "../../../translator/i18n";
import TopBar from "../../layouts/TopBar";
import DefaultText from "../../basics/typography/DefaultText";
import InviteTextField from "../../components/InviteTextField";
import Button from "../../basics/buttons/Button";
import UserAvatar from "../../components/UserAvatar";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { requestUsersEmail } from "../../../store/modules/contract/action-creators";

export default function Invite(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.profile.user?.avatar);
  const users = useAppSelector((state) => state.contract.inviteEmailsList);
  const emails = [];
  users?.forEach((item) => {
    emails.push({
      email: item.email,
      id: item.id,
    });
  });

  useEffect(() => {
    dispatch(requestUsersEmail());
  }, []);

  return (
    <TopBar pageName={t("invite_page.title")}>
      <View style={styles.container}>
        <UserAvatar sizeSmall url={url} />
        <DefaultText text={t("invite_page.invitation")} style={styles.text} />
        <InviteTextField
          placeholder={t("edit_profile.placeholders.email")}
          onChangeFunction={() => {}}
          list={emails}
        />
        <Button
          text={t("invite_page.title")}
          type={"primary"}
          style={styles.button}
          onPress={() => {}}
        />
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    marginVertical: 10,
    width: "75%",
    textAlign: "center",
  },
  button: {
    width: "80%",
    marginTop: 40,
  },
});

//<TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
//</TouchableWithoutFeedback>
