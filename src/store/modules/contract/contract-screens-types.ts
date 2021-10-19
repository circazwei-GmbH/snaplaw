import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import React from "react";
import UserDataForm from "../../../components/features/forms/contract/UserDataForm";
import ProductDataForm from "../../../components/features/forms/contract/ProductDataForm";
import ProductCondition from "../../../components/features/forms/contract/ProductCondition";
import ProductDescriptionForm from "../../../components/features/forms/contract/ProductDescriptionForm";
import Confirmation from "../../../components/features/forms/contract/Confirmation";
import Payment from "../../../components/features/forms/contract/Payment";
import Sign from "../../../components/features/forms/contract/Sign";
import { CONTRACT_ROLE } from "./contract-roles";
import { PAYMENT_METHODS, MEMBER_TYPE_VALUE } from "./types";
import MemberType from "../../../components/features/forms/contract/MemberType";

export interface ContractScreenConfigType {
  component: React.ElementType;
  title: string;
  type: CONTRACT_SCREEN_TYPES;
  granted: Array<CONTRACT_ROLE>;
  memberType?: Array<MEMBER_TYPE_VALUE>;
  paymentType?: Array<PAYMENT_METHODS>
}

export const getContractScreensConfig = (
  contractType: CONTRACT_TYPES,
  contractRole: CONTRACT_ROLE,
  memberType?: MEMBER_TYPE_VALUE,
  paymentType?: PAYMENT_METHODS,
): Array<ContractScreenConfigType> => {
  let resultScreens = contractScreensConfig[contractType].filter((screen) => 
    screen.granted.includes(contractRole));

    if (contractType === CONTRACT_TYPES.CAR && memberType) {
      resultScreens = resultScreens.filter((screen) => 
        screen.memberType?.includes(memberType));

      resultScreens = paymentType
        ? resultScreens.filter((screen) => 
          screen.paymentType?.includes(paymentType))
        : resultScreens.filter((screen) => 
          screen.paymentType?.includes(PAYMENT_METHODS.ALL))
    }

    return resultScreens;
};

export const contractScreensConfig: Record<
  CONTRACT_TYPES,
  ContractScreenConfigType[]
> = {
  [CONTRACT_TYPES.PURCHASE]: [
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: ProductDataForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: ProductCondition,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: Payment,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.title`,
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
  ],
  [CONTRACT_TYPES.CAR]: [
    {
      component: MemberType,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.title`,
      type: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
      granted: [CONTRACT_ROLE.OWNER],
      memberType: [MEMBER_TYPE_VALUE.COMMERCIAL, MEMBER_TYPE_VALUE.PRIVAT],
      paymentType: [PAYMENT_METHODS.ALL, PAYMENT_METHODS.CASH, PAYMENT_METHODS.CASH_ADVANCE, PAYMENT_METHODS.TRANSFER],
    },
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      memberType: [MEMBER_TYPE_VALUE.PRIVAT ],
      paymentType: [PAYMENT_METHODS.ALL, PAYMENT_METHODS.CASH, PAYMENT_METHODS.CASH_ADVANCE, PAYMENT_METHODS.TRANSFER],
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      granted: [CONTRACT_ROLE.OWNER],
      memberType: [MEMBER_TYPE_VALUE.COMMERCIAL, MEMBER_TYPE_VALUE.PRIVAT],
      paymentType: [PAYMENT_METHODS.ALL, PAYMENT_METHODS.CASH, PAYMENT_METHODS.CASH_ADVANCE, PAYMENT_METHODS.TRANSFER],
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      memberType: [MEMBER_TYPE_VALUE.COMMERCIAL, MEMBER_TYPE_VALUE.PRIVAT],
      paymentType: [PAYMENT_METHODS.ALL, PAYMENT_METHODS.CASH, PAYMENT_METHODS.CASH_ADVANCE, PAYMENT_METHODS.TRANSFER],
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      memberType: [MEMBER_TYPE_VALUE.COMMERCIAL, MEMBER_TYPE_VALUE.PRIVAT],
      paymentType: [PAYMENT_METHODS.ALL, PAYMENT_METHODS.CASH, PAYMENT_METHODS.CASH_ADVANCE, PAYMENT_METHODS.TRANSFER],
    },
  ],
};
