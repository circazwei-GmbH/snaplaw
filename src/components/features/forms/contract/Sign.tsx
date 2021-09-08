import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import SignInput from "../../../basics/inputs/SignInput";
import InviteInput from "../../../basics/inputs/InviteInput";
import SignModal from "../../Modals/SignModal";
import { orientationChange } from "../../../../store/modules/main/action-creators";
import { OrientationLock } from "expo-screen-orientation";
import {
  SIGN_FIELDS,
  SIGN_LOADER,
  SignScreenInterface,
} from "../../../../store/modules/contract/purchase/sign";
import { removeFromWaiter } from "../../../../store/modules/main/slice";
import { contractValidator } from "../../../../store/modules/contract/validation";
import { Contract } from "../../../../store/modules/contract/types";
import { useNavigation } from "@react-navigation/native";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { clearErrors } from "../../../../store/modules/contract/slice";
import {countToPopLength, getTypeByContractAndScreen} from "../../../../store/modules/contract/helper";

export default function Sign() {
  const { t } = useI18n();
  const contract = useAppSelector((state) => state.contract.currentContract);
  const screenData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.SIGN
      ) as SignScreenInterface
  );
  const [name] = useState("Jhon Doue");
  const [signVisible, setSignVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigator = useNavigation();

  const signModalHandler = (currentContract: Contract) => {
    dispatch(clearErrors());
    const emptyScreen = contractValidator(
      currentContract.type,
      currentContract.screens
    );
    if (emptyScreen !== null) {
      // @ts-ignore
      navigator.pop(
        countToPopLength(currentContract.type, emptyScreen)
      );
      dispatch(
        validateScreen(
          currentContract.type,
          getTypeByContractAndScreen(currentContract.type, emptyScreen)
        )
      );
      return;
    }

    setSignVisible(!signVisible);
    dispatch(
      orientationChange(
        !signVisible
          ? OrientationLock.LANDSCAPE_RIGHT
          : OrientationLock.PORTRAIT_UP
      )
    );
  };

  useEffect(() => {
    if (!signVisible) {
      return () => {};
    }
    setSignVisible(false);
    dispatch(orientationChange(OrientationLock.PORTRAIT_UP));
    dispatch(removeFromWaiter(SIGN_LOADER));
  }, [screenData?.data[SIGN_FIELDS.SIGN]]);

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
          signUri={screenData?.data[SIGN_FIELDS.SIGN]}
          signHandler={() => signModalHandler(contract)}
        />
      </View>
      <View style={styles.block}>
        <DefaultText
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.SIGN}.invite`
          )}
        />
        <InviteInput
          style={styles.inputInBlock}
          invitedName={name}
          inviteHandler={() => {}}
        />
      </View>
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
