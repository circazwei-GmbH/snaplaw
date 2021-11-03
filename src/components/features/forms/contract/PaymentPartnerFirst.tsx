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
import { CURRENCY } from "../../../../store/modules/contract/payment";
import DefaultText from "../../../basics/typography/DefaultText";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import AbstractErrorMessage from "../../../basics/typography/AbstractErrorMessage";
import TextField from "../../../components/TextField";
import PaymentPrice from "../../../components/PaymentPrice";

export default function PaymentPartnerFirst() {
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
      <PaymentPrice
        defaultText={t(
          `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`
        )}
        cost={screenData?.data[PAYMENT_FIELDS.COST]}
        placeholder={t(
          `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
        )}
        currentCurrency={screenData?.data[PAYMENT_FIELDS.CURRENCY]}
        errorMessage={screenErrors?.[PAYMENT_FIELDS.COST]}
        onValueChange={(value) =>
          updateDataHandler(PAYMENT_FIELDS.CURRENCY, value)
        }
        onChangeFunction={(test) =>
          updateDataHandler(PAYMENT_FIELDS.COST, test)
        }
      />
      <DefaultText
        style={[styles.text, styles.secondText]}
        text={t(
          `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.payment_method`
        )}
      />
      <View style={styles.checkboxContainer}>
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
            PAYMENT_METHODS.PAYPAL
          }
          onChange={() =>
            updateDataHandler(
              PAYMENT_FIELDS.PAYMENT_METHOD,
              PAYMENT_METHODS.PAYPAL
            )
          }
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`
          )}
        />
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
      </View>
      <AbstractErrorMessage
        message={screenErrors?.[PAYMENT_FIELDS.PAYMENT_METHOD]}
      />
      {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
      PAYMENT_METHODS.TRANSFER ? (
        <>
          <TextField
            onChangeFunction={(text) =>
              updateDataHandler(PAYMENT_FIELDS.CARD_NAME, text)
            }
            errorMessage={screenErrors?.[PAYMENT_FIELDS.CARD_NAME]}
            value={screenData?.data[PAYMENT_FIELDS.CARD_NAME]}
            placeholder={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
            )}
          />
          <TextField
            onChangeFunction={(text) =>
              updateDataHandler(PAYMENT_FIELDS.CARD_NUMBER, text)
            }
            errorMessage={screenErrors?.[PAYMENT_FIELDS.CARD_NUMBER]}
            value={screenData?.data[PAYMENT_FIELDS.CARD_NUMBER]}
            placeholder={t(
              `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
            )}
          />
        </>
      ) : null}
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
  secondText: {
    marginTop: 24,
  },
});
