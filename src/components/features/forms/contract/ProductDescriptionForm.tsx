import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import MultilineTextField from "../../../components/MultilineTextField";
import { useI18n } from "../../../../translator/i18n";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import IconButton from "../../../basics/buttons/IconButton";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import DescriptionPhotos from "../../../components/DescriptionPhotos";
import { setScreenData } from "../../../../store/modules/contract/slice";
import Menu, { ButtonType } from "../../Modals/Menu";
import { uploadMedia } from "../../../../store/modules/media/action-creators";
import { cameraWay, libraryWay } from "../../../../services/media/media-picker";
import { PermissionNotGranted } from "../../../../services/media/errors";
import { setMessage } from "../../../../store/modules/main/slice";
import { MEDIA_FOLDERS } from "../../../../store/modules/media/constants";
import {
  PRODUCT_DESCRIPTION_FIELDS,
  ProductDescriptionScreenInterface,
} from "../../../../store/modules/contract/types";
import { validateScreen } from "../../../../store/modules/contract/action-creators";

export default function ProductDescriptionForm() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentField, setCurrentField] = useState(
    PRODUCT_DESCRIPTION_FIELDS.productPhotos
  );

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

  console.log(photosProduct, photosAccessories);

  const removePhoto = (id: string, fieldName: PRODUCT_DESCRIPTION_FIELDS) => {
    const currentArray =
      fieldName === "productPhotos" ? photosProduct : photosAccessories;
    const newValue = currentArray?.filter((item) => item !== id);
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
        fieldName,
        value: newValue,
      })
    );
  };

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

  const postChooseFileHandler = (uri: string) => {
    const currentArray =
      currentField === PRODUCT_DESCRIPTION_FIELDS.productPhotos
        ? photosProduct
        : photosAccessories;
    let descriptionPhotos = [...(currentArray ?? [])];
    setMenuVisible(false);
    descriptionPhotos.push("");
    dispatch(
      uploadMedia(
        uri,
        MEDIA_FOLDERS.PRODUCT_DESCRIPTION,
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
          fieldName: currentField,
          value: descriptionPhotos,
        }),
        `value.${descriptionPhotos.length - 1}`
      )
    );
  };

  const buttonPickerHandler = (way: Function) => async () => {
    try {
      const uri = await way();
      if (uri) {
        postChooseFileHandler(uri);
      }
    } catch (error) {
      setMenuVisible(false);
      if (error instanceof PermissionNotGranted) {
        dispatch(setMessage(t(error.message)));
      } else {
        dispatch(setMessage(t("errors.abstract")));
      }
    }
  };

  const choosePhotoHandler = (fieldName: PRODUCT_DESCRIPTION_FIELDS) => {
    setCurrentField(fieldName);
    setMenuVisible(true);
  };

  const menuButtons: ButtonType[] = [
    {
      title: t("upload_files.gallary"),
      handler: buttonPickerHandler(libraryWay),
    },
    {
      title: t("upload_files.camera"),
      handler: buttonPickerHandler(cameraWay),
    },
  ];

  return (
    <View style={styles.container}>
      <DefaultText
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleTwo`
        )}
        style={styles.titleTwo}
      />
      <MultilineTextField
        value={description}
        errorMessage={screenError?.[PRODUCT_DESCRIPTION_FIELDS.description]}
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
        )}
        onChangeFunction={(newValue) =>
          onChangeHandler(newValue, PRODUCT_DESCRIPTION_FIELDS.description)
        }
        checked={checked}
      />
      <IconButton
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
        )}
        onPress={() =>
          choosePhotoHandler(PRODUCT_DESCRIPTION_FIELDS.productPhotos)
        }
      />
      <DescriptionPhotos
        photos={photosProduct ?? []}
        onPressDelete={removePhoto}
        fieldName={PRODUCT_DESCRIPTION_FIELDS.productPhotos}
      />
      <Checkbox
        isChecked={checked ?? false}
        onChange={() =>
          onChangeHandler(!checked, PRODUCT_DESCRIPTION_FIELDS.hasAccessories)
        }
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
        )}
        style={styles.checkbox}
      />
      {checked ? (
        <>
          <IconButton
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
            )}
            onPress={() =>
              choosePhotoHandler(PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos)
            }
          />
          <DescriptionPhotos
            photos={photosAccessories ?? []}
            onPressDelete={removePhoto}
            fieldName={PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos}
          />
          <DefaultText
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleThree`
            )}
            style={[styles.titleTwo, styles.titleThree]}
          />
          <MultilineTextField
            value={descriptionAccessories}
            errorMessage={
              screenError?.[PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories]
            }
            placeholder={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
            )}
            onChangeFunction={(newValue) =>
              onChangeHandler(
                newValue,
                PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories
              )
            }
          />
        </>
      ) : null}
      <Menu
        visible={menuVisible}
        buttons={menuButtons}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
  },
  titleTwo: {
    fontSize: 16,
  },
  titleThree: {
    marginTop: 23,
  },
  checkbox: {
    marginVertical: 23,
  },
  checkboxText: {
    width: "85%",
    marginLeft: 18,
    fontSize: 16,
  },
});
