import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { validateScreen } from "../../../store/modules/contract/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../store/modules/contract/constants";
import {
  SecondaryRoomsScreenInterface,
  SECONDARY_ROOMS_FIELDS,
  SECONDARY_ROOMS_FIELDS_ARR,
} from "../../../store/modules/contract/secondary-rooms-data";
import { setScreenData } from "../../../store/modules/contract/slice";
import { useI18n } from "../../../translator/i18n";
import CheckboxesList, { ItemType } from "../../components/CheckboxesList";

type FunctionType = () => ItemType[];

export default function SecondaryRooms() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const secondaryRoomsScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS
      ) as SecondaryRoomsScreenInterface | undefined
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const getCheckboxesList: FunctionType = () =>
    SECONDARY_ROOMS_FIELDS_ARR.map((field) => ({
      name: field,
      checked: !!secondaryRoomsScreen?.data?.[field],
      error: screenErrors?.[field],
      translate: t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.checkboxes.${field}`
      ),
    }));

  const onChangeAction = (
    value: string | boolean,
    fieldName: SECONDARY_ROOMS_FIELDS = SECONDARY_ROOMS_FIELDS.DESCRIPTION
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS,
        fieldName,
        value: value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS)
      );
    }
  };

  const photos = secondaryRoomsScreen?.data[SECONDARY_ROOMS_FIELDS.PHOTOS];

  return (
    <CheckboxesList
      list={getCheckboxesList()}
      updateDataHandler={onChangeAction}
      text={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.titleMultiline`
      )}
      iconText={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.uploadFiles`
      )}
      placeholder={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.placeholder`
      )}
      photosFieldName={SECONDARY_ROOMS_FIELDS.PHOTOS}
      photos={photos ?? []}
      errorMessage={screenErrors?.[SECONDARY_ROOMS_FIELDS.DESCRIPTION]}
      description={
        secondaryRoomsScreen?.data[SECONDARY_ROOMS_FIELDS.DESCRIPTION] ?? ""
      }
      screenType={CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}
    />
  );
}
