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
import { clearInviteEmails } from "../../../store/modules/contract/slice";

export default function Invite(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.profile.user?.avatar);
  const emails = useAppSelector((state) => state.contract.inviteEmailsList);

  const getEmails = () => {
    dispatch(requestUsersEmail());
  };

  const onChangeHandler = () => {
    setTimeout(() => {
      dispatch(clearInviteEmails());
      dispatch(requestUsersEmail());
    }, 500);
  };

  useEffect(() => {
    getEmails();
  }, []);

  return (
    <TopBar pageName={t("invite_page.title")}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <UserAvatar sizeSmall url={url} />
          <DefaultText text={t("invite_page.invitation")} style={styles.text} />
          <InviteTextField
            placeholder={t("edit_profile.placeholders.email")}
            onChangeFunction={onChangeHandler}
            list={emails}
            getEmails={getEmails}
          />
          <Button
            text={t("invite_page.title")}
            type={"primary"}
            style={styles.button}
            onPress={() => {}}
          />
        </View>
      </TouchableWithoutFeedback>
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
