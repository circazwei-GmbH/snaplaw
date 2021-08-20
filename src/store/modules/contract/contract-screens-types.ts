import { CONTRACT_SCREEN_TYPES, CONTRACT_TYPES } from "./constants";
import React from "react";
import UserDataForm from "../../../components/features/forms/contract/UserDataForm";
import ProductDataForm from "../../../components/features/forms/contract/ProductDataForm";
import ProductDescriptionForm from "../../../components/features/forms/contract/ProductDescriptionForm";

export interface ContractScreenConfigType {
  component: React.ElementType;
  title: string;
  type: CONTRACT_SCREEN_TYPES;
}

export const contractScreensConfig: Record<
  CONTRACT_TYPES,
  ContractScreenConfigType[]
> = {
  [CONTRACT_TYPES.PURCHASE]: [
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
    },
    {
      component: ProductDataForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.PURCHASE}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
    },
  ],
};
