import { CONTRACT_ROLE } from "../../store/modules/contract/contract-roles";
import { BaseScreenDataInterface } from "../../store/modules/contract/base-types";
import { CONTRACT_SCREEN_TYPES } from "../../store/modules/contract/constants";
import { PAYMENT_FIELDS } from "../../store/modules/contract/types";

export const screenDataTranslator = (
  screenData: BaseScreenDataInterface,
  meRole: CONTRACT_ROLE
) => {
  const requestBody = {
    ...screenData.data,
    screenType: screenData.type,
  };
  if (
    screenData.type === CONTRACT_SCREEN_TYPES.PAYMENT &&
    meRole === CONTRACT_ROLE.OWNER
  ) {
    // @ts-ignore
    requestBody[PAYMENT_FIELDS.SELLER_PAYMENT_METHOD] =
      requestBody[PAYMENT_FIELDS.PAYMENT_METHOD];
  }
  return requestBody;
};
