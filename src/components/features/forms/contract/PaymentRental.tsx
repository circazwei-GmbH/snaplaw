import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  PaymentScreenInterface,
} from "../../../../store/modules/contract/types";
import DefaultText from "../../../basics/typography/DefaultText";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import AbstractErrorMessage from "../../../basics/typography/AbstractErrorMessage";
import CalendarInput from "../../../basics/inputs/CalendarInput";
import { CURRENCY } from "../../../../store/modules/contract/payment";
import ErrorBoldMessage from "../../../basics/typography/ErrorBoldMessage";
import { CONTRACT_ROLE } from "../../../../store/modules/contract/contract-roles";
import MultilineTextField from "../../../components/MultilineTextField";
import { PRICE_ADJUSTMENT_FIELDS } from "../../../../store/modules/contract/price-adjustment-data";

export default function PaymentRental() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const contract = useAppSelector((state) => state.contract.currentContract);
  const screenData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT
      ) as PaymentScreenInterface
  );
  const screenErrors = useAppSelector(
    (state) => state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.PAYMENT]
  );
  const isDeposit = useAppSelector(
    (state) =>
      !!state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT
      )?.data[PRICE_ADJUSTMENT_FIELDS.DEPOSIT]
  );

  const updateDataHandler = (fieldName: PAYMENT_FIELDS, value: string) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName,
        value,
      })
    );

    if (screenErrors?.[fieldName] && contract) {
      dispatch(validateScreen(contract.type, CONTRACT_SCREEN_TYPES.PAYMENT));
    }
  };

  useEffect(() => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENCY.EUR,
      })
    );
  }, []);

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.container}>
      {contract.meRole === CONTRACT_ROLE.OWNER && isDeposit ? (
        <ErrorBoldMessage
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.owner_warning`,
            {
              method: t(
                `contracts.${contract.type}.${
                  CONTRACT_SCREEN_TYPES.PAYMENT
                }.payment_methods.${
                  screenData?.data[PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]
                }`
              ),
            }
          )}
        />
      ) : null}
      {contract.meRole === CONTRACT_ROLE.PARTNER &&
      screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] &&
      screenData?.data[PAYMENT_FIELDS.SELLER_PAYMENT_METHOD] ? (
        <ErrorBoldMessage
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.partner_warning`,
            {
              method: t(
                `contracts.${contract.type}.${
                  CONTRACT_SCREEN_TYPES.PAYMENT
                }.payment_methods.${
                  screenData?.data[PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]
                }`
              ),
            }
          )}
        />
      ) : null}
      {contract.meRole === CONTRACT_ROLE.PARTNER ? (
        <DefaultText
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.partner_text`
          )}
          style={styles.text}
        />
      ) : null}

      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkboxes}
          isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
          isChecked={
            screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
            PAYMENT_METHODS.TRANSFER
          }
          onChange={() =>
            updateDataHandler(
              PAYMENT_FIELDS.PAYMENT_METHOD,
              PAYMENT_METHODS.TRANSFER
            )
          }
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
          )}
        />
        <Checkbox
          style={styles.checkboxes}
          isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
          isChecked={
            screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
            PAYMENT_METHODS.CASH
          }
          onChange={() =>
            updateDataHandler(
              PAYMENT_FIELDS.PAYMENT_METHOD,
              PAYMENT_METHODS.CASH
            )
          }
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
          )}
        />
        <Checkbox
          style={styles.checkboxes}
          isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
          isChecked={
            screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
            PAYMENT_METHODS.BANK_GUARANTEE
          }
          onChange={() =>
            updateDataHandler(
              PAYMENT_FIELDS.PAYMENT_METHOD,
              PAYMENT_METHODS.BANK_GUARANTEE
            )
          }
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.bank_guarantee`
          )}
          disabled={isDeposit}
        />
        {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
        PAYMENT_METHODS.BANK_GUARANTEE ? (
          <View style={styles.additionalDataContainer}>
            <DefaultText
              text={t(
                `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.bank_guarantee_text`
              )}
              style={styles.text}
            />
            <CalendarInput
              dateHandler={(text) =>
                updateDataHandler(PAYMENT_FIELDS.PAYMENT_DATE, text)
              }
              errorMessage={screenErrors?.[PAYMENT_FIELDS.PAYMENT_DATE]}
              date={screenData?.data[PAYMENT_FIELDS.PAYMENT_DATE] || ""}
              placeholder={t(
                `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.payment_date`
              )}
              testID={PAYMENT_FIELDS.PAYMENT_DATE}
            />
          </View>
        ) : null}
        <Checkbox
          style={styles.checkboxes}
          isError={!!screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
          isChecked={
            screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
            PAYMENT_METHODS.OTHER
          }
          onChange={() =>
            updateDataHandler(
              PAYMENT_FIELDS.PAYMENT_METHOD,
              PAYMENT_METHODS.OTHER
            )
          }
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.other`
          )}
        />
        {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
        PAYMENT_METHODS.OTHER ? (
          <View style={styles.additionalDataContainer}>
            <DefaultText
              text={t(
                `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.other_text`
              )}
              style={styles.text}
            />
            <MultilineTextField
              value={screenData?.data[PAYMENT_FIELDS.OTHER_DESCRIPTION]}
              errorMessage={screenErrors?.[PAYMENT_FIELDS.OTHER_DESCRIPTION]}
              placeholder={t(
                `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.other_description`
              )}
              onChangeFunction={(text: string) =>
                updateDataHandler(PAYMENT_FIELDS.OTHER_DESCRIPTION, text)
              }
            />
          </View>
        ) : null}
      </View>
      <AbstractErrorMessage
        message={screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  checkboxContainer: {
    marginTop: 14,
  },
  checkboxes: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  additionalDataContainer: {
    paddingVertical: 16,
  },
});
