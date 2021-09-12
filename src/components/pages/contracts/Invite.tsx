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
import {
  requestUsersEmail,
  requestInviteUser,
} from "../../../store/modules/contract/action-creators";
import {
  clearInviteEmails,
  setEmailToInvite,
} from "../../../store/modules/contract/slice";
import { FieldInterface } from "../../features/forms/SignInForm";
import { email } from "../../../validations/default";
import { formFieldFill, validate } from "../../../utils/forms";

export default function Invite(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.profile.user?.avatar);
  const emails = useAppSelector((state) => state.contract.inviteEmailsList);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const contractId = useAppSelector(
    (state) => state.contract.currentContract?.id
  );
  const search = useAppSelector((state) => state.contract.emailToInvite);
  const [listPage, setListPage] = useState("0");

  interface InviteEmailInterface {
    email: FieldInterface;
  }

  const emailInitialValue: InviteEmailInterface = {
    email: {
      value: search,
      error: "",
      displayError: false,
      validators: [email(t("invite_page.error"))],
    },
  };

  const [emailValue, setEmailValue] =
    useState<InviteEmailInterface>(emailInitialValue);

  const getEmails = () => {
    dispatch(requestUsersEmail({ search, listPage }));
  };

  const setInviteEmail = (email: string) => dispatch(setEmailToInvite(email));

  const onChangeHandler = (newValue: string) => {
    setEmailValue(formFieldFill("email", newValue, emailValue));
    setTimeout(() => {
      dispatch(clearInviteEmails());
      dispatch(requestUsersEmail({ search, listPage }));
    }, 500);
  };

  const inviteHandler = () => {
    const emailLocalValue: InviteEmailInterface = {
      email: validate(emailValue.email),
    };
    setEmailValue(emailLocalValue);

    if (emailValue.email.error) {
      return;
    }

    dispatch(requestInviteUser({ contractId, search }));
  };

  useEffect(() => {
    setEmailValue(formFieldFill("email", search, emailValue));
  }, [search]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    setListPage(`${+emails / 20}`);
  }, [emails]);

  return (
    <TopBar pageName={t("invite_page.title")}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {keyboardVisible ? null : <UserAvatar sizeSmall url={url} />}
          <DefaultText text={t("invite_page.invitation")} style={styles.text} />
          <InviteTextField
            value={search}
            placeholder={t("edit_profile.placeholders.email")}
            onChangeFunction={(newValue) => onChangeHandler(newValue)}
            list={emails}
            getEmails={getEmails}
            errorMessage={emailValue.email.error}
            setValue={setInviteEmail}
          />
          <Button
            text={t("invite_page.title")}
            type={"primary"}
            style={styles.button}
            onPress={inviteHandler}
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
    paddingHorizontal: 16,
  },
  text: {
    marginVertical: 10,
    width: "75%",
    textAlign: "center",
  },
  button: {
    width: 300,
    marginTop: 40,
  },
});
