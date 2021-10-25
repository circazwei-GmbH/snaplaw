import React from "react";
import { StyleSheet, View } from "react-native";
import {
  CURRENCIES,
  CURRENSY,
} from "../../store/modules/contract/payment";
import Select from "../basics/selects/Select";
import DefaultText from "../basics/typography/DefaultText";
import TextField from "./TextField";

interface PaymentPriceInterface {
  defaultText: string;
  cost: string;
  placeholder: string;
  currentCurrency: CURRENSY;
  errorMessage?: string;
  onChangeFunction: (value: string) => void;
  onValueChange: (text: string) => void;
}

export default function PaymentPrice({
  defaultText,
  cost,
  placeholder,
  currentCurrency,
  errorMessage,
  onChangeFunction,
  onValueChange,
}: PaymentPriceInterface) {
    
  return (
    <>
      <DefaultText style={styles.text} text={defaultText} />
      <View style={styles.priceBlock}>
        <TextField
          keyboardType="numeric"
          errorMessage={errorMessage}
          containerStyle={styles.costField}
          value={cost}
          onChangeFunction={onChangeFunction}
          placeholder={placeholder}
        />
        <View
          style={[styles.select, errorMessage ? styles.paddingForError : null]}
        >
          <Select
            items={CURRENCIES}
            selectedValue={CURRENCIES.find(
              (currency) => currentCurrency === currency.value
            )}
            onValueChange={(item) => onValueChange(item.value)}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
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
  paddingForError: {
    marginBottom: 22,
  },
});
