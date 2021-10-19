import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useI18n } from "../../../../translator/i18n";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import {
  MEMBER_TYPE_VALUE,
  MEMBER_TYPES,
  MemberTypeScreenInterface,
} from "../../../../store/modules/contract/types";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../store/modules/contract/constants";
import { MEMBER_TYPE_FIELD_NAME } from "../../../../store/modules/contract/carSales/member-type";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import AbstractErrorMessage from "../../../basics/typography/AbstractErrorMessage";
import DefaultText from "../../../basics/typography/DefaultText";
import { CONTRACT_ROLE } from "../../../../store/modules/contract/contract-roles";
import ErrorBoldMessage from "../../../basics/typography/ErrorBoldMessage";

export default function MemberType() {
  const dispatch = useAppDispatch();
  const { t } = useI18n();
  const contract = useAppSelector((state) => state.contract.currentContract);
  const currentValue = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.MEMBER_TYPE
      ) as MemberTypeScreenInterface | undefined
  );
  const price = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT
      )?.data.price as string
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.MEMBER_TYPE]
  );

  const setSelected = (value: MEMBER_TYPE_VALUE) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
        fieldName: MEMBER_TYPE_FIELD_NAME,
        value,
      })
    );
    if (screenErrors?.[MEMBER_TYPE_FIELD_NAME] && contractType) {
      dispatch(validateScreen(contractType, CONTRACT_SCREEN_TYPES.MEMBER_TYPE));
    }
  };

  useEffect(() => {
    if (currentValue) {
      return () => {};
    }

    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
        fieldName: MEMBER_TYPE_FIELD_NAME,
        value: MEMBER_TYPE_VALUE.COMMERCIAL,
      })
    );
  }, [currentValue]);

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DefaultText
        style={styles.title}
        text={t(
          `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.secondTitle`
        )}
      />
      {MEMBER_TYPES.map((type, index) => (
        <Checkbox
          style={index === 0 ? undefined : styles.checkbox}
          key={type}
          isError={!!screenErrors?.[MEMBER_TYPE_FIELD_NAME]}
          text={t(
            `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.checkboxes.${type}`
          )}
          isChecked={currentValue?.data[MEMBER_TYPE_FIELD_NAME] === type}
          onChange={() => setSelected(type)}
        />
      ))}
      <AbstractErrorMessage message={screenErrors?.[MEMBER_TYPE_FIELD_NAME]} />
      {contract.meRole === CONTRACT_ROLE.PARTNER &&
      currentValue?.data[MEMBER_TYPE_FIELD_NAME] ===
        MEMBER_TYPE_VALUE.COMMERCIAL ? (
        <View style={styles.buyerMessage}>
          <ErrorBoldMessage
            text={`${t(`contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.buyerWarning.fee`)}${price ? t(`contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.buyerWarning.calculation`, {
                sum: price,
                total: Math.round((+price * 1.19) * 100) / 100,
              }) : ""}`}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    paddingBottom: 23,
  },
  checkbox: {
    marginTop: 10,
  },
  errorContainer: {
    flexDirection: "row",
    marginTop: 18,
  },
  dot: {
    paddingRight: 10,
    color: "#FA7171",
    fontSize: 16,
  },
  errorText: {
    fontFamily: "OS-SB",
  },
  buyerMessage: {
    paddingTop: 16,
    paddingRight: 16,
  }
});
