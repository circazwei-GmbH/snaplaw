import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
    CURRENCY,
  PaymentScreenInterface,
  PAYMENT_FIELDS,
} from "../../../../store/modules/contract/payment";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import ErrorBoldMessage from "../../../basics/typography/ErrorBoldMessage";
import PaymentPrice from "../../../components/PaymentPrice";

export default function OperatingCosts() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const screenErrors = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.OPERATING_COSTS]
  );
  const operatingCostsScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.OPERATING_COSTS
      ) as PaymentScreenInterface
  );

  const updateDataHandler = (fieldName: PAYMENT_FIELDS, value: string) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.OPERATING_COSTS,
        fieldName,
        value,
      })
    );
    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.OPERATING_COSTS)
      );
    }
  };

  useEffect(() => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.OPERATING_COSTS,
        fieldName: PAYMENT_FIELDS.CURRENCY,
        value: CURRENCY.EUR,
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      <PaymentPrice
        defaultText={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.product_price`
        )}
        cost={operatingCostsScreen?.data[PAYMENT_FIELDS.COST]}
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.fields.cost`
        )}
        currentCurrency={operatingCostsScreen?.data[PAYMENT_FIELDS.CURRENCY]}
        errorMessage={screenErrors?.[PAYMENT_FIELDS.COST]}
        onValueChange={(value) =>
          updateDataHandler(PAYMENT_FIELDS.CURRENCY, value)
        }
        onChangeFunction={(test) =>
          updateDataHandler(PAYMENT_FIELDS.COST, test)
        }
      />
      <ErrorBoldMessage
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.OPERATING_COSTS}.warning`
        )}
        style={styles.warning}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  warning: {
    paddingTop: 20,
  },
});
