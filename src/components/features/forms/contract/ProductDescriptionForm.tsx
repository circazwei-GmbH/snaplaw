import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../../translator/i18n";
import {
  CONTRACT_SCREEN_TYPES,
  CONTRACT_TYPES,
} from "../../../../store/modules/contract/constants";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setScreenData } from "../../../../store/modules/contract/slice";
import {
  PRODUCT_DESCRIPTION_FIELDS,
  ProductDescriptionScreenInterface,
} from "../../../../store/modules/contract/types";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import MultilineWithPhotos from "../../../components/MultilineWithPhotos";

export default function ProductDescriptionForm() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const productDescription = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION
      ) as ProductDescriptionScreenInterface | undefined
  );
  const screenError = useAppSelector(
    (state) =>
      state.contract.contractErrors?.[CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION]
  );

  const checked =
    productDescription?.data[PRODUCT_DESCRIPTION_FIELDS.hasAccessories];
  const description =
    productDescription?.data[PRODUCT_DESCRIPTION_FIELDS.description];
  const descriptionAccessories =
    productDescription?.data[PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories];
  const photosProduct =
    productDescription?.data[PRODUCT_DESCRIPTION_FIELDS.productPhotos];
  const photosAccessories =
    productDescription?.data[PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos];

  const onChangeHandler = (
    value: string | boolean,
    fieldName: PRODUCT_DESCRIPTION_FIELDS
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
        fieldName,
        value,
      })
    );

    if (screenError?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION)
      );
    }
  };

  return (
    <View style={styles.container}>
      <MultilineWithPhotos
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleTwo`
        )}
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
        )}
        iconText={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
        )}
        screenType={CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}
        fieldName={PRODUCT_DESCRIPTION_FIELDS.description}
        photosFieldName={PRODUCT_DESCRIPTION_FIELDS.productPhotos}
        description={description}
        errorMessage={screenError?.[PRODUCT_DESCRIPTION_FIELDS.description]}
        photos={photosProduct ?? []}
        onChangeFunction={(newValue) =>
          onChangeHandler(newValue, PRODUCT_DESCRIPTION_FIELDS.description)
        }
        checked={checked}
      />
      {contractType === CONTRACT_TYPES.PURCHASE ? (
        <>
          <Checkbox
            isChecked={checked ?? false}
            onChange={() =>
              onChangeHandler(
                !checked,
                PRODUCT_DESCRIPTION_FIELDS.hasAccessories
              )
            }
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
            )}
            style={styles.checkbox}
          />
          {checked ? (
            <MultilineWithPhotos
              text={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleThree`
              )}
              placeholder={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
              )}
              iconText={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
              )}
              fieldName={PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories}
              photosFieldName={PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos}
              description={descriptionAccessories}
              errorMessage={
                screenError?.[PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories]
              }
              photos={photosAccessories ?? []}
              onChangeFunction={(newValue) =>
                onChangeHandler(
                  newValue,
                  PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories
                )
              }
              checked={false}
              isDirectionReverse
              titleStyle={styles.titleThree}
              screenType={CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}
            />
          ) : null}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  titleThree: {
    marginTop: 23,
  },
  checkbox: {
    marginVertical: 23,
  },
});
