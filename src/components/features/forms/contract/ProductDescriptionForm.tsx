import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
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
  ProductDescriptionScreenInterface,
  PRODUCT_DESCRIPTION_FIELDS,
} from "../../../../store/modules/contract/types";

export default function ProductDescriptionForm() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const productDescription = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION
      ) as ProductDescriptionScreenInterface | undefined
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

  const removePhoto = (id: number) => {
    const newValue = photosProduct?.filter((item) => item.id !== id);
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
        fieldName: PRODUCT_DESCRIPTION_FIELDS.productPhotos,
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
  };

  const postChooseFileHandler = (uri: string) => {
    let newArray = [...(photosProduct ?? [])];
    setMenuVisible(false);
    newArray.push({ url: "", id: Date.now() + newArray.length });
    dispatch(
      uploadMedia(
        uri,
        MEDIA_FOLDERS.PRODUCT_DESCRIPTION,
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
          fieldName: PRODUCT_DESCRIPTION_FIELDS.productPhotos,
          value: newArray,
        }),
        `value.${newArray.length - 1}.url`
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

  const choosePhotoHandler = () => setMenuVisible(true);

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
        placeholder={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
        )}
        onChangeFunction={(newValue) =>
          onChangeHandler(newValue, PRODUCT_DESCRIPTION_FIELDS.description)
        }
      />
      <IconButton
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
        )}
        onPress={choosePhotoHandler}
      />
      <DescriptionPhotos
        photos={photosProduct ?? []}
        onPressDelete={removePhoto}
      />
      <Checkbox
        isChecked={checked ?? false}
        onChange={() =>
          onChangeHandler(!checked, PRODUCT_DESCRIPTION_FIELDS.hasAccessories)
        }
        text={t(
          `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.checkbox`
        )}
        textStyle={styles.checkboxText}
        style={styles.checkbox}
      />
      {checked ? (
        <>
          <IconButton
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
            )}
            onPress={() => {}}
          />
          <DefaultText
            text={t(
              `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleThree`
            )}
            style={[styles.titleTwo, styles.titleThree]}
          />
          <MultilineTextField
            value={descriptionAccessories}
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
