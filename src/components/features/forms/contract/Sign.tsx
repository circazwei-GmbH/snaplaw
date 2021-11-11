import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../store/modules/contract/constants";
import SignInput from "../../../basics/inputs/SignInput";
import InviteInput from "../../../basics/inputs/InviteInput";
import SignModal from "../../Modals/SignModal";
import { orientationChange } from "../../../../store/modules/main/action-creators";
import { OrientationLock } from "expo-screen-orientation";
import { SIGN_LOADER } from "../../../../store/modules/contract/purchase/sign";
import {
  removeFromWaiter,
  setModal,
} from "../../../../store/modules/main/slice";
import { contractValidator } from "../../../../store/modules/contract/validation";
import { ContractDataType } from "../../../../store/modules/contract/types";
import { useNavigation } from "@react-navigation/native";
import {
  requestModalSign,
  validateAllScreens,
  validateScreen,
} from "../../../../store/modules/contract/action-creators";
import { clearErrors } from "../../../../store/modules/contract/slice";
import {
  countToPopLength,
  getTypeByContractAndScreen,
} from "../../../../store/modules/contract/helper";
import * as RootNavigation from "../../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../../router/HomeRouterType";
import { CONTRACT_ROLE } from "../../../../store/modules/contract/contract-roles";
import { BUTTON_COLORTYPE } from "../../../../store/modules/main/types";

export default function Sign() {
  const { t } = useI18n();
  const contract = useAppSelector((state) => state.contract.currentContract);
  const sign = useAppSelector((state) => state.contract.currentContract?.sign);
  const dispatch = useAppDispatch();
  const navigator = useNavigation();

  const signVisible = useAppSelector((state) => state.contract.signModal);

  const signModalHandler = (currentContract: ContractDataType) => {
    dispatch(clearErrors());
    dispatch(validateAllScreens(currentContract.type));
    const emptyScreen = contractValidator(currentContract);

    if (emptyScreen !== null) {
      // @ts-ignore
      navigator.pop(countToPopLength(currentContract, emptyScreen));
      dispatch(
        validateScreen(
          currentContract.type,
          getTypeByContractAndScreen(currentContract, emptyScreen)
        )
      );
      return;
    }

    if (contract?.type === CONTRACT_TYPES.WORK && !signVisible) {
      dispatch(
        setModal({
          message: t("contracts.confirmation_modal.confirm_contract_sign"),
          actions: [
            {
              name: t("contracts.confirmation_modal.buttons.check"),
              colortype: BUTTON_COLORTYPE.ERROR,
            },
            {
              name: t("contracts.confirmation_modal.buttons.sign"),
              action: requestModalSign(true),
            },
          ],
        })
      );
      return;
    }

    dispatch(requestModalSign(!signVisible));
  };

  const inviteHandler = () => {
    if (!contract) {
      return;
    }
    RootNavigation.navigate(HOME_ROUTER.INVITE, { contractId: contract.id });
  };

  useEffect(() => {
    if (!signVisible) {
      return () => {};
    }
    dispatch(requestModalSign(false));
    dispatch(removeFromWaiter({ event: SIGN_LOADER }));
  }, [sign]);

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <DefaultText
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.SIGN}.signature`
          )}
        />
        <SignInput
          style={styles.inputInBlock}
          signUri={sign}
          signHandler={() => signModalHandler(contract)}
        />
      </View>
      {contract.meRole === CONTRACT_ROLE.OWNER ? (
        <View style={styles.block}>
          <DefaultText
            text={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.SIGN}.invite`
            )}
          />
          <InviteInput
            style={styles.inputInBlock}
            invitedName={contract.partnerName || ""}
            inviteHandler={inviteHandler}
          />
        </View>
      ) : null}
      <SignModal
        visible={signVisible}
        onClose={() => signModalHandler(contract)}
      />
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
