import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import DefaultSwitch from "../../../basics/switches/DefaultSwitch";
import {
  PriceAdjustmentScreenInterface,
  PRICE_ADJUSTMENT_FIELDS,
} from "../../../../store/modules/contract/price-adjustment-data";
import PaymentPrice from "../../../components/PaymentPrice";
import { CURRENCY } from "../../../../store/modules/contract/payment";
import DefaultText from "../../../basics/typography/DefaultText";
import CalendarInput from "../../../basics/inputs/CalendarInput";

const initialState = {
  [PRICE_ADJUSTMENT_FIELDS.DEPOSIT]: false,
  [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE]: false,
};

export default function PriceAdjustment(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const [priceAdjustment, setPriceAdjustment] = useState(initialState);

  const priceAdjustmentScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT
      ) as PriceAdjustmentScreenInterface
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const onToggleSpecification = (fieldName: PRICE_ADJUSTMENT_FIELDS) => {
    setPriceAdjustment({
      ...priceAdjustment,
      [fieldName]: !priceAdjustment[fieldName],
    });

    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName,
        value: !priceAdjustment[fieldName],
      })
    );
  };

  const onChangeAction = (
    value: string,
    fieldName: PRICE_ADJUSTMENT_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName,
        value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT)
      );
    }
  };

  useEffect(() => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT,
        fieldName: PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_CURRENCY,
        value: CURRENCY.EUR,
      })
    );
  }, []);

  useEffect(() => {
    if (priceAdjustmentScreen) setPriceAdjustment(priceAdjustmentScreen.data);
  }, [priceAdjustmentScreen]);

  return (
    <View style={styles.container}>
      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.fields.deposit`
        )}
        onChange={() => onToggleSpecification(PRICE_ADJUSTMENT_FIELDS.DEPOSIT)}
        value={priceAdjustment[PRICE_ADJUSTMENT_FIELDS.DEPOSIT]}
      />

      <DefaultSwitch
        title={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.fields.graduatedLease`
        )}
        onChange={() =>
          onToggleSpecification(PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE)
        }
        value={priceAdjustment[PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE]}
      />
      {priceAdjustment[PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE] ? (
        <View style={styles.inputContainer}>
          <PaymentPrice
            defaultText={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.priceText`
            )}
            cost={
              priceAdjustmentScreen?.data[
                PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_PRICE
              ]
            }
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.price`
            )}
            currentCurrency={
              priceAdjustmentScreen?.data[
                PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_CURRENCY
              ]
            }
            errorMessage={
              screenErrors?.[PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_PRICE]
            }
            onValueChange={(value) =>
              onChangeAction(
                value,
                PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_CURRENCY
              )
            }
            onChangeFunction={(test) =>
              onChangeAction(
                test,
                PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_PRICE
              )
            } 
          />
          <View style={styles.dateContainer}>
            <DefaultText
              style={styles.text}
              text={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.dateText`
              )}
            />
            <CalendarInput
              dateHandler={(text) =>
                onChangeAction(
                  text,
                  PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE
                )
              }
              errorMessage={
                screenErrors?.[PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE]
              }
              date={
                priceAdjustmentScreen?.data[
                  PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE
                ] || ""
              }
              placeholder={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT}.graduatedLease.date`
              )}
              testID={PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dateContainer: {
    paddingTop: 16,
  },
  inputContainer: {
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
});
