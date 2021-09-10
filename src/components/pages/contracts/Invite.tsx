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
import { FieldInterface } from "../../features/forms/SignInForm";
import { email } from "../../../validations/default";
import { formFieldFill, validate } from "../../../utils/forms";

export default function Invite(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) => state.profile.user?.avatar);
  const emails = useAppSelector((state) => state.contract.inviteEmailsList);
  const [fakeStoreEmailValue, setFakeEmailStoreValue] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  interface InviteEmailInterface {
    email: FieldInterface;
  }

  const emailInitialValue: InviteEmailInterface = {
    email: {
      value: fakeStoreEmailValue,
      error: "",
      displayError: false,
      validators: [email(t("invite_page.error"))],
    },
  };
  const [emailValue, setEmailValue] =
    useState<InviteEmailInterface>(emailInitialValue);

  const getEmails = () => {
    dispatch(requestUsersEmail());
  };

  const onChangeHandler = (newValue: string) => {
    setEmailValue(formFieldFill("email", newValue, emailValue));
    setTimeout(() => {
      dispatch(clearInviteEmails());
      dispatch(requestUsersEmail());
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

    alert("Yo, user is invited!");
  };

  useEffect(() => {
    setEmailValue(formFieldFill("email", fakeStoreEmailValue, emailValue));
  }, [fakeStoreEmailValue]);

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

  return (
    <TopBar pageName={t("invite_page.title")}>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {keyboardVisible ? null : <UserAvatar sizeSmall url={url} />}
          <DefaultText text={t("invite_page.invitation")} style={styles.text} />
          <InviteTextField
            value={fakeStoreEmailValue}
            placeholder={t("edit_profile.placeholders.email")}
            onChangeFunction={(newValue) => onChangeHandler(newValue)}
            list={emails}
            getEmails={getEmails}
            errorMessage={emailValue.email.error}
            setValue={setFakeEmailStoreValue}
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
