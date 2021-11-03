import React from "react";
import { StyleSheet, View } from "react-native";
import * as RootNavigation from "../../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../../router/HomeRouterType";
import { useI18n } from "../../../../translator/i18n";
import { useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import DefaultText from "../../../basics/typography/DefaultText";
import InviteInput from "../../../basics/inputs/InviteInput";

export default function InviteUserForm() {
  const { t } = useI18n();
  const contract = useAppSelector((state) => state.contract.currentContract);

  const inviteHandler = () => {
    if (!contract) {
      return;
    }
    RootNavigation.navigate(HOME_ROUTER.INVITE, { contractId: contract.id });
  };

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.container}>
        <View style={styles.block}>
          <DefaultText
            text={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.INVITE_USER}.titleTwo`
            )}
          />
          <InviteInput
            style={styles.inputInBlock}
            invitedName={contract.partnerName || ""}
            inviteHandler={inviteHandler}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  block: {
    marginTop: 24,
  },
  inputInBlock: {
    marginTop: 16,
  },
});
