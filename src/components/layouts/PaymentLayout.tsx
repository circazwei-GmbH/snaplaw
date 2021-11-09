import React, { ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../store/modules/contract/constants";
import { CONTRACT_ROLE } from "../../store/modules/contract/contract-roles";
import {
  PaymentScreenInterface,
  PAYMENT_FIELDS,
} from "../../store/modules/contract/types";
import { useI18n } from "../../translator/i18n";
import ErrorBoldMessage from "../basics/typography/ErrorBoldMessage";
import PaymentPrice from "../components/PaymentPrice";

interface PaymentLayoutInterface {
  updateDataHandler: (field: PAYMENT_FIELDS, value: string) => void;
  children?: ReactElement;
}

export default function PaymentLayout({
  updateDataHandler,
  children,
}: PaymentLayoutInterface) {
  const { t } = useI18n();

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

  if (!contract) {
    return null;
  }

  return (
    <View style={styles.container}>
      {contract.meRole === CONTRACT_ROLE.PARTNER &&
      screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] &&
      screenData?.data[PAYMENT_FIELDS.SELLER_PAYMENT_METHOD] ? (
        <ErrorBoldMessage
          text={t(
            `contracts.${contract.type}.${CONTRACT_SCREEN_TYPES.PAYMENT}.partner_text`,
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

      {contract.meRole === CONTRACT_ROLE.OWNER ? (
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
      ) : null}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
