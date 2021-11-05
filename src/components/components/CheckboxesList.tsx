import React from "react";
import { StyleSheet, View } from "react-native";
import { MediaType } from "../../services/media";
import { CONTRACT_SCREEN_TYPES } from "../../store/modules/contract/constants";
import Checkbox from "../basics/checkboxes/Checkbox";
import MultilineWithPhotos from "./MultilineWithPhotos";

export type ItemType = {
  name: string;
  error?: string;
  translate: string;
  checked: boolean;
};

interface CheckboxesListInterface {
  list: ItemType[];
  updateDataHandler: (value: string | boolean, fieldName?: string) => void;
  text: string;
  iconText: string;
  placeholder: string;
  photosFieldName: string;
  photos: MediaType[];
  errorMessage?: string;
  description: string;
  screenType: CONTRACT_SCREEN_TYPES;
}

export default function CheckboxesList({
  list,
  updateDataHandler,
  text,
  iconText,
  placeholder,
  photosFieldName,
  photos,
  errorMessage,
  description,
  screenType,
}: CheckboxesListInterface) {
  return (
    <View style={styles.container}>
      {list.map((item) => (
        <Checkbox
          key={item.name}
          testID={item.name}
          style={styles.checkboxes}
          isError={!!item.error}
          isChecked={item.checked}
          onChange={() => updateDataHandler(!item.checked, item.name)}
          text={item.translate}
        />
      ))}
      <View style={styles.multilineContainer}>
        <MultilineWithPhotos
          text={text}
          placeholder={placeholder}
          iconText={iconText}
          photosFieldName={photosFieldName}
          photos={photos}
          onChangeFunction={updateDataHandler}
          errorMessage={errorMessage}
          description={description}
          screenType={screenType}
          isMultilineHidden={
            !list.find((item) => item.name === "other")?.checked
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 17,
  },
  multilineContainer: {
    paddingTop: 10,
  },
  checkboxes: {
    marginTop: 10,
  },
});
