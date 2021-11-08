import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import {
  CommonRoomsScreenInterface,
  COMMON_ROOMS_FIELDS,
  COMMON_ROOMS_FIELDS_ARR,
} from "../../../../store/modules/contract/common-rooms-data";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { getCheckboxesList } from "../../../../store/modules/contract/helper";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import CheckboxesList from "../../../components/CheckboxesList";

export default function CommonRooms() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const commonRoomsScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.COMMON_ROOMS
      ) as CommonRoomsScreenInterface | undefined
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.COMMON_ROOMS]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const onChangeAction = (
    value: string | boolean,
    fieldName: COMMON_ROOMS_FIELDS = COMMON_ROOMS_FIELDS.DESCRIPTION
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.COMMON_ROOMS,
        fieldName,
        value: value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.COMMON_ROOMS)
      );
    }
  };

  const photos = commonRoomsScreen?.data[COMMON_ROOMS_FIELDS.PHOTOS];

  return (
    <CheckboxesList
      list={getCheckboxesList(
        COMMON_ROOMS_FIELDS_ARR,
        CONTRACT_SCREEN_TYPES.COMMON_ROOMS,
        t,
        commonRoomsScreen?.data,
        contractType,
      )}
      updateDataHandler={onChangeAction}
      text={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMMON_ROOMS}.titleMultiline`
      )}
      iconText={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMMON_ROOMS}.uploadFiles`
      )}
      placeholder={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.COMMON_ROOMS}.placeholder`
      )}
      photosFieldName={COMMON_ROOMS_FIELDS.PHOTOS}
      photos={photos ?? []}
      errorMessage={screenErrors?.[COMMON_ROOMS_FIELDS.DESCRIPTION]}
      description={
        commonRoomsScreen?.data[COMMON_ROOMS_FIELDS.DESCRIPTION] ?? ""
      }
      screenType={CONTRACT_SCREEN_TYPES.COMMON_ROOMS}
    />
  );
}
