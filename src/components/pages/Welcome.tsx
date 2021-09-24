import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Button from "../basics/buttons/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, AUTH_ROUTE } from "../../router/AuthRouterTypes";
import { useI18n } from "../../translator/i18n";
import {LANGUAGE_GERMANY} from "../../store/modules/profile/constants";

type WelcomeProp = {
  navigation: StackNavigationProp<RootStackParamList, "Welcome">;
};

export default function Welcome({ navigation }: WelcomeProp) {
  const { t, currentLanguage } = useI18n();
  return (
    <View style={styles.container}>
      <Text accessibilityLabel="welcome-to-snaplaw" style={styles.headline}>
        {t("welcome.headline")}
      </Text>
      <Image
        accessibilityLabel="welcome-image"
        source={currentLanguage === LANGUAGE_GERMANY ? require("../../../assets/welcome-de.png") : require("../../../assets/welcome-en.png")}
      />
      <View style={styles.actions} accessibilityLabel="actions">
        <Button
          text={t("welcome.sign_in")}
          onPress={() => navigation.navigate(AUTH_ROUTE.SIGNIN)}
          style={styles.signInButton}
          type="primary"
        />
        <Button
          text={t("welcome.sign_up")}
          onPress={() => navigation.navigate(AUTH_ROUTE.SIGNUP)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF7FD",
    flex: 1,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  headline: {
    fontSize: 32,
    width: 240,
    color: "#1696E2",
    textAlign: "center",
    textAlignVertical: "center",
    marginBottom: -40,
    marginTop: 40,
    fontFamily: "OS-B",
  },
  actions: {
    width: "85%",
  },
  signInButton: {
    marginBottom: 20,
  },
});
