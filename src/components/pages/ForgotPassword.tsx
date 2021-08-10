import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../basics/buttons/Button";
import HeaderNavigation from "../layouts/HeaderNavigation";
import ImageAndText from "../features/Auth/ImageAndText";
import TextField from "../components/TextField";
import { email } from "../../validations/default";
import { formFieldFill, validate } from "../../utils/forms";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { requestForgotPassword } from "../../store/modules/auth/action-creators";
import { forgotPasswordFailed } from "../../store/modules/auth/slice";
import { useI18n } from "../../translator/i18n";

export default function ForgotPassword() {
  const { t } = useI18n();
  const [form, setForm] = useState({
    email: {
      value: "",
      error: "",
      displayError: false,
      validators: [email(t("forgot_password.errors.email_not_valid"))],
    },
  });
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(
    (state) => state.auth.forgotPassword.error
  );

  useEffect(() => {
    setForm({
      email: {
        ...form.email,
        error: errorMessage,
      },
    });
  }, [errorMessage]);

  useEffect(
    () => () => {
      dispatch(forgotPasswordFailed(""));
    },
    []
  );

  const enterEmailHandler = (text: string) => {
    setForm(formFieldFill("email", text, form));
  };

  const sendHandler = () => {
    const localForm = {
      email: validate(form.email),
    };

    setForm(localForm);

    if (localForm.email.error) {
      return;
    }

    dispatch(requestForgotPassword(localForm.email.value));
  };

  return (
    <HeaderNavigation pageName={t("forgot_password.title")}>
      <View style={styles.container}>
        <View>
          <ImageAndText
            image={require("../../../assets/forgot_password.png")}
            text={t("forgot_password.description")}
          />
          <View style={styles.inputArea}>
            <TextField
              fixed
              keyboardType="email-address"
              onChangeFunction={enterEmailHandler}
              errorMessage={form.email.error}
              placeholder={t("forgot_password.input")}
            />
          </View>
        </View>
        <View style={styles.emptySpace} />
        <View style={styles.actionArea}>
          <Button
            text={t("forgot_password.send")}
            onPress={sendHandler}
            type="primary"
          />
        </View>
      </View>
    </HeaderNavigation>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
  },
  text: {
    fontSize: 48,
    marginTop: 50,
    textAlign: "center",
  },
  inputArea: {
    marginTop: 40,
  },
  emptySpace: {
    height: 250,
  },
  actionArea: {
    marginBottom: 80,
    marginHorizontal: 17,
  },
});
