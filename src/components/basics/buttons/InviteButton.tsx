import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as RootNavigation from "../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../router/HomeRouterType";

type InviteButtonProps = {
  contractId: string
}

export default function InviteButton({ contractId }: InviteButtonProps): JSX.Element {
  const inviteHandler = () => {
    if (!contractId) {
      return;
    }
    RootNavigation.navigate(HOME_ROUTER.INVITE, {contractId});
  };

  return (
    <TouchableOpacity
      testID={"InviteButton"}
      onPress={inviteHandler}
      style={styles.container}
    >
      <Feather name="user-plus" size={24} color="#668395" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
    width: Dimensions.get("window").width * 0.28,
    height: 45,
  },
});
