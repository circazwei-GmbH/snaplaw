import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import MultilineTextField from "../../../components/MultilineTextField";
import { useI18n } from "../../../../translator/i18n";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import IconButton from "../../../basics/buttons/IconButton";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Menu, { ButtonType } from "../../Modals/Menu";
import { toggleBoolValue } from "../../../../utils/toggleBoolValue";
import DescriptionPhotos from "../../../components/DescriptionPhotos";
import { uploadMedia } from "../../../../store/modules/media/action-creators";
import { cameraWay, libraryWay } from "../../../../services/media/media-picker";
import { PermissionNotGranted } from "../../../../services/media/errors";
import { setMessage } from "../../../../store/modules/main/slice";
import { MEDIA_FOLDERS } from "../../../../store/modules/media/constants";
import {
  ProductDescriptionScreenInterface,
  PRODUCT_DESCRIPTION_FIELDS,
  PRODUCT_DESCRIPTION,
} from "../../../../store/modules/contract/types";

export default function ProductDescriptionForm() {
  const { t } = useI18n();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );
  const productDescription = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION
      ) as ProductDescriptionScreenInterface | undefined
  );
  const [checked, setChecked] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useAppDispatch();
  const checkboxHandler = () => toggleBoolValue(checked, setChecked);
  const photos: string[] = [];

  return (
    <View style={styles.container}>
      <ScrollView>
        <DefaultText
          text={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.titleTwo`
          )}
          style={styles.titleTwo}
        />
        <MultilineTextField
          placeholder={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
          )}
        />
        <IconButton
          text={t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.button`
          )}
          onPress={() => {}}
        />
        <DescriptionPhotos photos={photos} />
        <Checkbox
          isChecked={checked}
          onChange={checkboxHandler}
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
              placeholder={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.placeholder`
              )}
            />
          </>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    height: 500,
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
