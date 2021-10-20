import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TextField from "../../../components/TextField";
import { useI18n } from "../../../../translator/i18n";
import { useDispatch } from "react-redux";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { useAppSelector } from "../../../../store/hooks";
import {
  requestCarInformation,
  validateScreen,
} from "../../../../store/modules/contract/action-creators";
import {
  CarDataScreenInterface,
  CAR_DATA_FIELDS,
} from "../../../../store/modules/contract/carSales/car-data";
import DropdownInput from "../../../basics/inputs/DropdownInput";
import { DataListInterface } from "../../../../store/modules/contract/types";

interface DataListsInterface {
  producer: DataListInterface[];
  model: DataListInterface[];
  type: DataListInterface[];
  year: DataListInterface[];
}

const initialsearchListState: DataListsInterface = {
  producer: [
    {
      key: "1aaa",
      value: "aaa",
    },
    {
      key: "2aab",
      value: "aab",
    },
    {
      key: "3bba",
      value: "bba",
    },
  ],
  model: [
    {
      key: "4aaa",
      value: "aaa",
    },
    {
      key: "5aab",
      value: "aab",
    },
    {
      key: "6bba",
      value: "bba",
    },
  ],
  type: [
    {
      key: "aaa",
      value: "aaa",
    },
    {
      key: "aab",
      value: "aab",
    },
    {
      key: "bba",
      value: "bba",
    },
  ],
  year: [
    {
      key: "aaa",
      value: "aaa",
    },
    {
      key: "aab",
      value: "aab",
    },
    {
      key: "bba",
      value: "bba",
    },
  ],
};

export default function ProductDataCarForm(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const [dataLists, setDataLists] = useState<DataListsInterface>(
    initialsearchListState
  );

  const productData = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DATA
      ) as CarDataScreenInterface | undefined
  );

  const contractId = useAppSelector(
    (state) =>
      state.contract.currentContract?.id as string
  );

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.PRODUCT_DATA]
      : undefined
  );

  const onChangeAction = (value: string, fieldName: CAR_DATA_FIELDS) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
        fieldName,
        value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PRODUCT_DATA)
      );
    }
  };

  useEffect(() => {
    dispatch(requestCarInformation(contractId));
  }, []);

  return (
    <View style={styles.inputBox}>
      <DropdownInput
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.producer`
        )}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.producer]}
        value={
          dataLists.producer.find(
            (item) => productData?.data[CAR_DATA_FIELDS.producer] === item.key
          )?.value
        }
        data={dataLists.producer}
        onChangeFunction={(text) =>
          onChangeAction(text, CAR_DATA_FIELDS.producer)
        }
      />
      <DropdownInput
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.model`
        )}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.model]}
        value={
          dataLists.model.find(
            (item) => productData?.data[CAR_DATA_FIELDS.model] === item.key
          )?.value
        }
        data={dataLists.model}
        onChangeFunction={(text) => onChangeAction(text, CAR_DATA_FIELDS.model)}
      />
      <DropdownInput
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.type`
        )}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.type]}
        value={
          dataLists.type.find(
            (item) => productData?.data[CAR_DATA_FIELDS.type] === item.key
          )?.value
        }
        data={dataLists.type}
        onChangeFunction={(text) => onChangeAction(text, CAR_DATA_FIELDS.type)}
      />
      <DropdownInput
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.year`
        )}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.year]}
        value={
          dataLists.year.find(
            (item) => productData?.data[CAR_DATA_FIELDS.year] === item.key
          )?.value
        }
        data={dataLists.year}
        onChangeFunction={(text) => onChangeAction(text, CAR_DATA_FIELDS.year)}
      />
      <TextField
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.prevRegistrationNumber`
        )}
        value={productData?.data[CAR_DATA_FIELDS.prevRegistrationNumber]}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.prevRegistrationNumber]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, CAR_DATA_FIELDS.prevRegistrationNumber)
        }
      />
      <TextField
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.serialNumber`
        )}
        value={productData?.data[CAR_DATA_FIELDS.serialNumber]}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.serialNumber]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, CAR_DATA_FIELDS.serialNumber)
        }
      />
      <TextField
        keyboardType="number-pad"
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.placeholders.run`
        )}
        value={productData?.data[CAR_DATA_FIELDS.run]}
        errorMessage={screenErrors?.[CAR_DATA_FIELDS.run]}
        onChangeFunction={(newValue) =>
          onChangeAction(newValue, CAR_DATA_FIELDS.run)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 16,
  },
  formTitle: {
    fontWeight: "600",
    fontFamily: "OS-SB",
  },
});
