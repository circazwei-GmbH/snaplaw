import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import { getCheckboxesList } from "../../../../store/modules/contract/helper";
import { setScreenData } from "../../../../store/modules/contract/slice";
import {
  UsableSpacesScreenInterface,
  USABLE_SPACES_FIELDS,
  USABLE_SPACES_FIELDS_ARR,
} from "../../../../store/modules/contract/usable-spaces-data";
import { useI18n } from "../../../../translator/i18n";
import CheckboxesList from "../../../components/CheckboxesList";

export default function UsableSpaces() {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const usableSpacesScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.USABLE_SPACES
      ) as UsableSpacesScreenInterface | undefined
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.USABLE_SPACES]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const onChangeAction = (
    value: string | boolean,
    fieldName: USABLE_SPACES_FIELDS = USABLE_SPACES_FIELDS.DESCRIPTION
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.USABLE_SPACES,
        fieldName,
        value: value,
      })
    );

    if (screenErrors?.[fieldName] && contractType) {
      dispatch(
        validateScreen(contractType, CONTRACT_SCREEN_TYPES.USABLE_SPACES)
      );
    }
  };

  const photos = usableSpacesScreen?.data[USABLE_SPACES_FIELDS.PHOTOS];

  return (
    <CheckboxesList
      list={getCheckboxesList(
        USABLE_SPACES_FIELDS_ARR,
        CONTRACT_SCREEN_TYPES.USABLE_SPACES,
        t,
        usableSpacesScreen?.data,
        contractType,
      )}
      updateDataHandler={onChangeAction}
      text={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.USABLE_SPACES}.titleMultiline`
      )}
      iconText={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.USABLE_SPACES}.uploadFiles`
      )}
      placeholder={t(
        `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.USABLE_SPACES}.placeholder`
      )}
      photosFieldName={USABLE_SPACES_FIELDS.PHOTOS}
      photos={photos ?? []}
      errorMessage={screenErrors?.[USABLE_SPACES_FIELDS.DESCRIPTION]}
      description={
        usableSpacesScreen?.data[USABLE_SPACES_FIELDS.DESCRIPTION] ?? ""
      }
      screenType={CONTRACT_SCREEN_TYPES.USABLE_SPACES}
    />
  );
}
