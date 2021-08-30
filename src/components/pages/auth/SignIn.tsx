import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import MainHeadline from "../../basics/typography/MainHeadline";
import AuthLayout from "../../layouts/AuthLayout";
import SignInForm, {
  SignInFormInterface,
} from "../../features/forms/SignInForm";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  AUTH_ROUTE,
} from "../../../router/AuthRouterTypes";
import { email, length } from "../../../validations/default";
import MessageAndLink from "../../features/MessageAndLink";
import { formFieldFill, validate } from "../../../utils/forms";
import ActionBlock from "../../features/Auth/ActionsBlock";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { requestSignIn } from "../../../store/modules/auth/action-creators";
import { clearSignInErrors } from "../../../store/modules/auth/slice";
import { useI18n } from "../../../translator/i18n";

type SignInProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignIn">;
};

export default function SignIn({ navigation }: SignInProps) {
  const { t } = useI18n();
  let form: SignInFormInterface = {
    email: {
      value: "",
      error: "",
      displayError: false,
      validators: [email(t("sign_in.errors.email_not_valid"))],
    },
    password: {
      value: "",
      error: "",
      displayError: false,
      validators: [length(t("sign_in.errors.password_length"), 6)],
    },
  };
  let setForm: (form: SignInFormInterface) => void;
  [form, setForm] = useState(form);
  const dispatch = useAppDispatch();
  const emailError = useAppSelector((state) => state.auth.signIn.error.email);
  const passwordError = useAppSelector(
    (state) => state.auth.signIn.error.password
  );

  useEffect(() => {
    setForm({
      ...form,
      email: {
        ...form.email,
        error: emailError,
      },
    });
  }, [emailError]);

  useEffect(() => {
    setForm({
      ...form,
      password: {
        ...form.password,
        error: passwordError,
      },
    });
  }, [passwordError]);

  useEffect(() => {
    return () => {
      dispatch(clearSignInErrors());
    };
  }, []);

  const fieldChangeHandler = (
    fieldName: "email" | "password",
    text: string
  ) => {
    setForm(formFieldFill(fieldName, text, form));
  };

  const submitHandler = () => {
    const localForm = {
      email: validate(form.email),
      password: validate(form.password),
    };
    setForm(localForm);

    if (localForm.email.error || localForm.password.error) {
      return;
    }

    dispatch(requestSignIn(localForm.email.value, localForm.password.value));
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
                <MainHeadline text={t("sign_in.headline")} />
              </View>
              <View style={styles.width100}>
                <SignInForm
                  navigation={navigation}
                  form={form}
                  fieldChangeHandler={fieldChangeHandler}
                />
              </View>
              <ActionBlock
                submitHandler={submitHandler}
                buttonTextKey="sign_in.headline"
                underButtonTextKey="sign_in.alternative"
              />
            </View>
            <View style={[styles.width100, styles.actions]}>
              <MessageAndLink
                linkHandler={() => navigation.replace(AUTH_ROUTE.SIGNUP)}
                linkText={t("sign_in.sign_up")}
                messageTextKey="sign_in.to_sign_up"
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
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    alignSelf: "stretch",
  },
  headline: {
    marginBottom: 10,
  },
  width100: {
    width: "100%",
  },
  actions: {
    paddingHorizontal: 21,
    marginBottom: 30,
  },
});
