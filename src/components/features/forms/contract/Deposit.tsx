import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import DefaultText from "../../../basics/typography/DefaultText";
import CalendarInput from "../../../basics/inputs/CalendarInput";
import {
  DepositScreenInterface,
  DEPOSIT_FIELDS,
  DEPOSIT_TYPES,
} from "../../../../store/modules/contract/deposit-data";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import PaymentPrice from "../../../components/PaymentPrice";
import { CURRENCY } from "../../../../store/modules/contract/payment";
import { setScreenData } from "../../../../store/modules/contract/slice";

export default function Deposit(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const depositScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.DEPOSIT
      ) as DepositScreenInterface
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.DEPOSIT]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const onChangeAction = (value: string, fieldName: DEPOSIT_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName,
        value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(validateScreen(contractType, CONTRACT_SCREEN_TYPES.DEPOSIT));
    }
  };

  useEffect(() => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.DEPOSIT,
        fieldName: DEPOSIT_FIELDS.CURRENCY,
        value: CURRENCY.EUR,
      })
    );
  }, []);

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkboxes}
        isError={!!screenErrors?.[DEPOSIT_FIELDS.DEPOSIT]}
        isChecked={
          depositScreen?.data[DEPOSIT_FIELDS.DEPOSIT] ===
          DEPOSIT_TYPES.THREE_MONTH
        }
        onChange={() =>
          onChangeAction(DEPOSIT_TYPES.THREE_MONTH, DEPOSIT_FIELDS.DEPOSIT)
        }
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.THREE_MONTH}`
        )}
      />
      <Checkbox
        style={styles.checkboxes}
        isError={!!screenErrors?.[DEPOSIT_FIELDS.DEPOSIT]}
        isChecked={
          depositScreen?.data[DEPOSIT_FIELDS.DEPOSIT] ===
          DEPOSIT_TYPES.TWO_MONTH
        }
        onChange={() =>
          onChangeAction(DEPOSIT_TYPES.TWO_MONTH, DEPOSIT_FIELDS.DEPOSIT)
        }
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.TWO_MONTH}`
        )}
      />
      <Checkbox
        style={styles.checkboxes}
        isError={!!screenErrors?.[DEPOSIT_FIELDS.DEPOSIT]}
        isChecked={
          depositScreen?.data[DEPOSIT_FIELDS.DEPOSIT] === DEPOSIT_TYPES.OTHER
        }
        onChange={() =>
          onChangeAction(DEPOSIT_TYPES.OTHER, DEPOSIT_FIELDS.DEPOSIT)
        }
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.checkboxes.${DEPOSIT_TYPES.OTHER}`
        )}
      />
      <View style={styles.inputContainer}>
        <PaymentPrice
          defaultText={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.priceText`
          )}
          cost={depositScreen?.data[DEPOSIT_FIELDS.COST]}
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.price`
          )}
          currentCurrency={depositScreen?.data[DEPOSIT_FIELDS.CURRENCY]}
          errorMessage={screenErrors?.[DEPOSIT_FIELDS.COST]}
          onValueChange={(value) =>
            onChangeAction(value, DEPOSIT_FIELDS.CURRENCY)
          }
          onChangeFunction={(test) => onChangeAction(test, DEPOSIT_FIELDS.COST)}
        />
        <View style={styles.dateContainer}>
          <DefaultText
            style={styles.text}
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.dateText`
            )}
          />
          <CalendarInput
            dateHandler={(text) => onChangeAction(text, DEPOSIT_FIELDS.DATE)}
            errorMessage={screenErrors?.[DEPOSIT_FIELDS.DATE]}
            date={depositScreen?.data[DEPOSIT_FIELDS.DATE] || ""}
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.DEPOSIT}.date`
            )}
            testID={DEPOSIT_FIELDS.DATE}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  dateContainer: {
    paddingTop: 16,
  },
  inputContainer: {
    paddingTop: 16,
  },
  text: {
    fontSize: 16,
  },
  checkboxes: {
    marginTop: 10,
  },
});
