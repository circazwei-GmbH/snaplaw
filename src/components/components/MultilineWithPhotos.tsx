import React from "react";
import { StyleSheet } from "react-native";
import { MediaType } from "../../services/media";
import { PRODUCT_DESCRIPTION_FIELDS } from "../../store/modules/contract/types";
import IconButton from "../basics/buttons/IconButton";
import DefaultText from "../basics/typography/DefaultText";
import DescriptionPhotos from "./DescriptionPhotos";
import MultilineTextField from "./MultilineTextField";

interface MultilineWithPhotosInterface {
  text: string;
  description?: string;
  errorMessage?: string;
  placeholder: string;
  onChangeFunction: (newValue: string) => void;
  choosePhotoHandler: () => void;
  checked?: boolean;
  iconText: string;
  fieldName: PRODUCT_DESCRIPTION_FIELDS;
  photos: MediaType[];
  removePhoto: (id: string, fieldName: PRODUCT_DESCRIPTION_FIELDS) => void;
}

export default function MultilineWithPhotos({
  text,
  description,
  errorMessage,
  placeholder,
  onChangeFunction,
  checked,
  iconText,
  choosePhotoHandler,
  fieldName,
  photos,
  removePhoto,
}: MultilineWithPhotosInterface) {
  return (
    <>
      <DefaultText text={text} style={styles.titleTwo} />
      <MultilineTextField
        value={description}
        errorMessage={errorMessage}
        placeholder={placeholder}
        onChangeFunction={onChangeFunction}
        checked={checked}
      />
      <IconButton
        text={iconText}
        onPress={choosePhotoHandler}
      />
      <DescriptionPhotos
        photos={photos}
        onPressDelete={removePhoto}
        fieldName={fieldName}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
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
