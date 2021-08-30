import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import { useI18n } from "../../../../translator/i18n";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import TextField from "../../../components/TextField";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import {
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
  PaymentScreenInterface,
} from "../../../../store/modules/contract/types";
import { setScreenData } from "../../../../store/modules/contract/slice";
import Select from "../../../basics/selects/Select";
import {
  CURRENSIES,
  CURRENSY,
} from "../../../../store/modules/contract/purchase/payment";

export default function Payment() {
  const { t } = useI18n();

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT
      ) as PaymentScreenInterface
  );
  const dispatch = useAppDispatch();
  const updateDataHandler = (fieldName: PAYMENT_FIELDS, value: string) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName,
        value,
      })
    );
  };

  useEffect(() => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENSY.EUR,
      })
    );
  }, []);

  if (!contractType) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DefaultText
        style={styles.text}
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`
        )}
      />
      <View style={styles.priceBlock}>
        <TextField
          keyboardType="numeric"
          containerStyle={styles.costField}
          value={screenData?.data[PAYMENT_FIELDS.COST]}
          onChangeFunction={(test) =>
            updateDataHandler(PAYMENT_FIELDS.COST, test)
          }
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`
          )}
        />
        <View style={styles.select}>
          <Select
            items={CURRENSIES}
            selectedValue={CURRENSIES.find(
              (currency) =>
                screenData?.data[PAYMENT_FIELDS.CURRENCY] === currency.value
            )}
            onValueChange={(item) =>
              updateDataHandler(PAYMENT_FIELDS.CURRENCY, item.value)
            }
          />
        </View>
      </View>
      <DefaultText
        style={[styles.text, styles.secondText]}
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.payment_method`
        )}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkboxes}
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
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`
          )}
        />
        <Checkbox
          style={styles.checkboxes}
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
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`
          )}
        />
        <Checkbox
          style={styles.checkboxes}
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
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`
          )}
        />
      </View>
      {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] ===
      PAYMENT_METHODS.TRANSFER ? (
        <>
          <TextField
            onChangeFunction={(text) =>
              updateDataHandler(PAYMENT_FIELDS.CARD_NAME, text)
            }
            value={screenData?.data[PAYMENT_FIELDS.CARD_NAME]}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`
            )}
          />
          <TextField
            onChangeFunction={(text) =>
              updateDataHandler(PAYMENT_FIELDS.CARD_NUMBER, text)
            }
            value={screenData?.data[PAYMENT_FIELDS.CARD_NUMBER]}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`
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
  priceBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  select: {
    width: "33%",
  },
  costField: {
    width: "65%",
  },
});
