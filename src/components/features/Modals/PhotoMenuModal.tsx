import React from "react";
import { MediaTypeOptions } from "expo-image-picker";
import { useI18n } from "../../../translator/i18n";
import { MediaType, MEDIA_TYPE } from "../../../services/media";
import { PermissionNotGranted } from "../../../services/media/errors";
import { cameraWay, libraryWay } from "../../../services/media/media-picker";
import { useAppDispatch } from "../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../store/modules/contract/constants";
import { setScreenData } from "../../../store/modules/contract/slice";
import { setMessage } from "../../../store/modules/main/slice";
import { uploadMedia } from "../../../store/modules/media/action-creators";
import { MEDIA_FOLDERS } from "../../../store/modules/media/constants";
import Menu, { ButtonType } from "./Menu";

interface PhotoMenuModalInterface {
  visible: boolean;
  currentArray: MediaType[];
  currentField: string;
  screenType?: CONTRACT_SCREEN_TYPES;
  onClose: (newState: boolean) => void;
}

export default function PhotoMenuModal({
  visible,
  currentArray,
  currentField,
  screenType,
  onClose,
}: PhotoMenuModalInterface) {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const postChooseFileHandler = (uri: string) => {
    let descriptionPhotos = [...(currentArray ?? [])];
    
    onClose(false);
    descriptionPhotos.push({ uri: "", type: MEDIA_TYPE.IMAGE });
    dispatch(
      uploadMedia(
        uri,
        MEDIA_FOLDERS[screenType],
        setScreenData({
          screenType,
          fieldName: currentField,
          value: descriptionPhotos,
        }),
        `value.${descriptionPhotos.length - 1}`
      )
    );
  };

  const buttonPickerHandler = (way: Function) => async () => {
    try {
      const uri = await way(MediaTypeOptions.All);
      if (uri) {
        postChooseFileHandler(uri);
      }
    } catch (error) {
      onClose(false);
      if (error instanceof PermissionNotGranted) {
        dispatch(setMessage(t(error.message)));
      } else {
        dispatch(setMessage(t("errors.abstract")));
      }
    }
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
    <Menu
      visible={visible}
      buttons={menuButtons}
      onClose={() => onClose(false)}
    />
  );
}
