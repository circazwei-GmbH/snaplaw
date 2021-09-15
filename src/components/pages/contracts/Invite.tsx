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
import TextFieldWithDropdown from "../../components/TextFieldWithDropdown";
import Button from "../../basics/buttons/Button";
import UserAvatar from "../../components/UserAvatar";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import {
  requestUsersEmail,
  requestInviteUser,
} from "../../../store/modules/contract/action-creators";
import { clearInviteEmails } from "../../../store/modules/contract/slice";
import { FieldInterface } from "../../features/forms/SignInForm";
import { email } from "../../../validations/default";
import { formFieldFill, validate } from "../../../utils/forms";

type InviteProps = {
  route: {
    params: {
      contractId: string
    }
  }
}

export default function Invite({ route: { params: { contractId } } }: InviteProps): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const url = useAppSelector((state) => state.profile.user?.avatar);
  const emails = useAppSelector((state) => state.contract.inviteEmailsList);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  interface InviteEmailInterface {
    email: FieldInterface;
  }

  let emailInitialValue: InviteEmailInterface = {
    email: {
      value: "",
      error: "",
      displayError: false,
      validators: [email(t("invite_page.error"))],
    },
  };

  const [emailValue, setEmailValue] =
    useState<InviteEmailInterface>(emailInitialValue);

  const getEmails = () => {
    return dispatch(requestUsersEmail(emailInitialValue.email.value));
  };

  const searchHandler = (email: string) => {
    return (emailInitialValue = {
      ...emailInitialValue,
      email: {
        ...emailInitialValue.email,
        value: email,
      },
    });
  };

  const onChangeHandler = (newValue: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    setEmailValue(formFieldFill("email", newValue, emailValue));
    const timeout = setTimeout(() => {
      dispatch(clearInviteEmails());
      dispatch(requestUsersEmail(emailInitialValue.email.value));
    }, 1500);
    setTimer(timeout);
  };

  const inviteHandler = () => {
    const emailLocalValue: InviteEmailInterface = {
      email: validate(emailValue.email),
    };
    setEmailValue(emailLocalValue);

    if (emailValue.email.error) {
      return;
    }

    dispatch(requestInviteUser(emailInitialValue.email.value, contractId));
  };

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
          <TextFieldWithDropdown
            value={emailInitialValue.email.value}
            placeholder={t("edit_profile.placeholders.email")}
            onChangeFunction={(newValue) => onChangeHandler(newValue)}
            list={emails}
            getList={getEmails}
            errorMessage={emailValue.email.error}
            setValue={searchHandler}
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
