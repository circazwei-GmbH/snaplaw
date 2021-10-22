import React, { useState } from "react";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { MediaType } from "../../services/media";
import { useAppDispatch } from "../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../store/modules/contract/constants";
import { setScreenData } from "../../store/modules/contract/slice";
import IconButton from "../basics/buttons/IconButton";
import DefaultText from "../basics/typography/DefaultText";
import PhotoMenuModal from "../features/Modals/PhotoMenuModal";
import DescriptionPhotos from "./DescriptionPhotos";
import MultilineTextField from "./MultilineTextField";

interface MultilineWithPhotosInterface {
  text: string;
  placeholder: string;
  iconText: string;
  fieldName: string;
  photosFieldName: string;
  photos: MediaType[];
  onChangeFunction: (newValue: string) => void;
  screenType?: CONTRACT_SCREEN_TYPES;
  checked?: boolean;
  errorMessage?: string;
  description?: string;
  isDirectionReverse?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}

export default function MultilineWithPhotos({
  text,
  placeholder,
  iconText,
  fieldName,
  photosFieldName,
  photos,
  onChangeFunction,
  checked,
  errorMessage,
  description,
  isDirectionReverse,
  titleStyle,
  screenType,
}: MultilineWithPhotosInterface) {
  const dispatch = useAppDispatch();

  const [menuVisible, setMenuVisible] = useState(false);

  const removePhoto = (id: string, fieldName: string) => {
    const newValue = photos?.filter((item) => item.uri !== id);

    dispatch(
      setScreenData({
        screenType: screenType,
        fieldName,
        value: newValue,
      })
    );
  };

  return (
    <View style={isDirectionReverse ? styles.directionReverse : null}>
      <View>
        <DefaultText text={text} style={[styles.titleTwo, titleStyle]} />
        <MultilineTextField
          value={description}
          errorMessage={errorMessage}
          placeholder={placeholder}
          onChangeFunction={onChangeFunction}
          checked={checked}
        />
      </View>
      <View>
        <IconButton text={iconText} onPress={() => setMenuVisible(true)} />
        <DescriptionPhotos
          photos={photos}
          onPressDelete={removePhoto}
          fieldName={fieldName}
        />
      </View>
      <PhotoMenuModal
        visible={menuVisible}
        currentArray={photos}
        currentField={photosFieldName}
        screenType={screenType}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  titleTwo: {
    fontSize: 16,
  },
  checkbox: {
    marginVertical: 23,
  },
  checkboxText: {
    width: "85%",
    marginLeft: 18,
    fontSize: 16,
  },
  directionReverse: {
    flexDirection: "column-reverse",
  },
});
