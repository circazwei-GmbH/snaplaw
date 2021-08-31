import React from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../router/AuthRouterTypes";
import TextField from "../../components/TextField";
import { FieldInterface } from "./SignInForm";
import PasswordField from "../../components/PasswordField";
import { useI18n } from "../../../translator/i18n";

export interface SignUpFormInterface {
  name: FieldInterface;
  email: FieldInterface;
  password: FieldInterface;
}

type SignUpFormProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
  form: SignUpFormInterface;
  fieldChangeHandler: Function;
};

export default function SignUpForm({
  fieldChangeHandler,
  form,
}: SignUpFormProps) {
  const { t } = useI18n();
  return (
    <View style={styles.container}>
      <View>
        <TextField
          placeholder={t("sign_up.name_field")}
          onChangeFunction={(text: string) => fieldChangeHandler("name", text)}
          value={form.name.value}
          fixed
          errorMessage={form.name.error}
        />
      </View>
      <View style={styles.field}>
        <TextField
          placeholder={t("sign_up.email_field")}
          onChangeFunction={(text: string) => fieldChangeHandler("email", text)}
          value={form.email.value}
          errorMessage={form.email.error}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.field}>
        <PasswordField
          placeholder={t("sign_up.password_field")}
          onChange={(text: string) => fieldChangeHandler("password", text)}
          value={form.password.value}
          errorMessage={form.password.error}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  field: {
    marginTop: 8,
  },
});
