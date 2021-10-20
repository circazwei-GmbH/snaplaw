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
import MemberType from "../../../components/features/forms/contract/MemberType";
import { BaseScreenDataInterface } from "./base-types";
import { checkMemberTypeCommercial, checkMemberTypePrivat } from "./exclusions-checkers";
import CompanyDataForm from "../../../components/features/forms/contract/CompanyDataForm";
import PassportDataForm from "../../../components/features/forms/contract/PassportDataForm";

export interface ContractScreenConfigType {
  component: React.ElementType;
  title: string;
  type: CONTRACT_SCREEN_TYPES;
  granted: Array<CONTRACT_ROLE>;
  exclusionChecker?: (screens : BaseScreenDataInterface[]) => boolean;
}

export const getContractScreensConfig = (
  contractType: CONTRACT_TYPES,
  contractRole: CONTRACT_ROLE,
  screens: BaseScreenDataInterface[] | undefined,
): Array<ContractScreenConfigType> => contractScreensConfig[contractType].filter((screen) => {
    let flag = screen.granted.includes(contractRole);
    if (flag && typeof screen.exclusionChecker === "function" && screens) {
        return screen.exclusionChecker(screens);
    }
    return flag;
});

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
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.titleSeller`,
      type: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: MemberType,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.MEMBER_TYPE}.titleBuyer`,
      type: CONTRACT_SCREEN_TYPES.MEMBER_TYPE,
      granted: [CONTRACT_ROLE.PARTNER],
    },
    {
      component: CompanyDataForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.COMPANY_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.COMPANY_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      exclusionChecker: checkMemberTypeCommercial,
    },
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      exclusionChecker: checkMemberTypePrivat,
    },
    {
      component: PassportDataForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PASSPORT_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.PASSPORT_DATA ,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      exclusionChecker: checkMemberTypePrivat,
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
  ],
  [CONTRACT_TYPES.FREE]: [],
  [CONTRACT_TYPES.WORK]: [],
  [CONTRACT_TYPES.RENTAL]: [],
};
