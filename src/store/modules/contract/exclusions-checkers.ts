import { BaseScreenDataInterface } from "./base-types";
import { MEMBER_TYPE_FIELD_NAME } from "./carSales/member-type";
import { CONTRACT_SCREEN_TYPES } from "./constants";
import { CONTRACT_ROLE } from "./contract-roles";
import {
  ContractDataType,
  MEMBER_TYPE_VALUE,
  PAYMENT_FIELDS,
  PAYMENT_METHODS,
} from "./types";

export const checkMemberTypePrivat = ({
  screens,
}: {
  screens: BaseScreenDataInterface[];
}) => {
  const screen = screens.find(
    (screen) => screen.type === CONTRACT_SCREEN_TYPES.MEMBER_TYPE
  );
  return screen
    ? screen.data[MEMBER_TYPE_FIELD_NAME] === MEMBER_TYPE_VALUE.PRIVAT
    : true;
};

export const checkMemberTypeCommercial = ({
  screens,
}: {
  screens: BaseScreenDataInterface[];
}) => {
  const screen = screens.find(
    (screen) => screen.type === CONTRACT_SCREEN_TYPES.MEMBER_TYPE
  );
  return screen
    ? screen.data[MEMBER_TYPE_FIELD_NAME] === MEMBER_TYPE_VALUE.COMMERCIAL
    : true;
};

export const checkByPaymentType = ({
  screens,
}: {
  screens: BaseScreenDataInterface[];
}) => {
  const screen = screens.find(
    (screen) => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT
  );
  return screen
    ? screen.data[PAYMENT_FIELDS.PAYMENT_METHOD] === PAYMENT_METHODS.TRANSFER
    : false;
};

export const checkPartnerSign = (contract: ContractDataType) => {
  return contract.meRole === CONTRACT_ROLE.OWNER
    ? !!contract.oponentSign
    : true;
};
