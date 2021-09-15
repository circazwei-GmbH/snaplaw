import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import React from "react";
import UserDataForm from "../../../components/features/forms/contract/UserDataForm";
import ProductDataForm from "../../../components/features/forms/contract/ProductDataForm";
import ProductCondition from "../../../components/features/forms/contract/ProductCondition";
import ProductDescriptionForm from "../../../components/features/forms/contract/ProductDescriptionForm";
import Confirmation from "../../../components/features/forms/contract/Confirmation";
import Payment from "../../../components/features/forms/contract/Payment";
import Sign from "../../../components/features/forms/contract/Sign";

export interface ContractScreenConfigType {
  component: React.ElementType;
  title: string;
  type: CONTRACT_SCREEN_TYPES;
  granted: Array<CONTRACT_ROLE>
}

export enum CONTRACT_ROLE {
  OWNER = "OWNER",
  PARTNER = "PARTNER"
}

export const getContractScreensConfig = (contractType: CONTRACT_TYPES, contractRole: CONTRACT_ROLE): Array<ContractScreenConfigType> => contractScreensConfig[contractType].filter(screen => screen.granted.includes(contractRole))

export const contractScreensConfig: Record<
  CONTRACT_TYPES,
  ContractScreenConfigType[]
> = {
  [CONTRACT_TYPES.PURCHASE]: [
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER]
    },
    {
      component: ProductDataForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
      granted: [CONTRACT_ROLE.OWNER]
    },
    {
      component: ProductCondition,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_CONDITION,
      granted: [CONTRACT_ROLE.OWNER]
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      granted: [CONTRACT_ROLE.OWNER]
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER]
    },
    {
      component: Payment,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PAYMENT}.title`,
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER]
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER]
    },
  ],
};
