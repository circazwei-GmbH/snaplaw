import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  AUTH_ROUTE,
} from "../../../router/AuthRouterTypes";
import AuthLayout from "../../layouts/AuthLayout";
import MainHeadline from "../../basics/typography/MainHeadline";
import SignUpForm, {
  SignUpFormInterface,
} from "../../features/forms/SignUpForm";
import MessageAndLink from "../../features/MessageAndLink";
import { formFieldFill, validate } from "../../../utils/forms";
import { email, length } from "../../../validations/default";
import ActionBlock from "../../features/Auth/ActionsBlock";
import { requestSignUp } from "../../../store/modules/auth/action-creators";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { clearSignUpErrors } from "../../../store/modules/auth/slice";
import { useI18n } from "../../../translator/i18n";

type SignUpProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
};

export default function SignUp({ navigation }: SignUpProps) {
  const { t } = useI18n();
  let form: SignUpFormInterface = {
    name: {
      value: "",
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.name_required"), 1)],
    },
    email: {
      value: "",
      error: "",
      displayError: false,
      validators: [email(t("sign_up.errors.email_not_valid"))],
    },
    password: {
      value: "",
      error: "",
      displayError: false,
      validators: [length(t("sign_up.errors.password_length"), 6)],
    },
  };
  let setForm: (form: SignUpFormInterface) => void;
  [form, setForm] = useState(form);
  const dispatch = useAppDispatch();
  const emailError = useAppSelector((state) => state.auth.signUp.error.email);

  useEffect(() => {
    if (emailError) {
      setForm({
        ...form,
        email: {
          ...form.email,
          error: emailError,
        },
      });
    }
  }, [emailError]);

  useEffect(
    () => () => {
      dispatch(clearSignUpErrors());
    },
    []
  );

  const fieldChangeHandler = (
    fieldName: "name" | "email" | "password",
    text: string
  ) => {
    setForm(formFieldFill(fieldName, text, form));
  };

  const submitHandler = () => {
    const localForm = {
      name: validate(form.name),
      email: validate(form.email),
      password: validate(form.password),
    };
    setForm(localForm);

    if (
      localForm.email.error ||
      localForm.name.error ||
      localForm.password.error
    ) {
      return;
    }

    dispatch(
      requestSignUp(
        localForm.name.value,
        localForm.email.value,
        localForm.password.value
      )
    );
  };

  const linkHandler = () => {
    navigation.replace(AUTH_ROUTE.SIGNIN);
  };

  return (
    <View style={styles.mainContainer}>
      <AuthLayout>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          accessible={false}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.container}>
            <View style={styles.width100}>
              <View style={styles.headline}>
                <MainHeadline text={t("sign_up.headline")} />
              </View>
              <View style={styles.width100}>
                <SignUpForm
                  navigation={navigation}
                  form={form}
                  fieldChangeHandler={fieldChangeHandler}
                />
              </View>
              <ActionBlock
                submitHandler={submitHandler}
                buttonTextKey="sign_up.submit"
                underButtonTextKey="sign_up.alternative"
              />
            </View>
            <View style={[styles.width100, styles.actions]}>
              <MessageAndLink
                linkHandler={linkHandler}
                linkText={t("sign_up.log_in")}
                messageTextKey={t("sign_up.to_login")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </AuthLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    alignSelf: "stretch",
  },
  width100: {
    width: "100%",
  },
  headline: {
    marginBottom: 10,
  },
  actions: {
    marginBottom: 30,
  },
});
