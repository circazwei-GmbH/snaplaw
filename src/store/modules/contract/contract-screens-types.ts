import {CONTRACT_TYPES} from "./constants";
import React from "react";
import UserDataForm from "../../../components/features/forms/contract/UserDataForm";
import ProductDataForm from "../../../components/features/forms/contract/ProductDataForm";

export interface ContractScreenConfigType {
    component: React.ElementType,
    title: string
}

export const contractScreensConfig: Record<CONTRACT_TYPES, ContractScreenConfigType[]> = {
    [CONTRACT_TYPES.PURCHASE]: [
        {
            component: UserDataForm,
            title: `contracts.${CONTRACT_TYPES.PURCHASE}.user_data.title`
        },
        {
            component: ProductDataForm,
            title: `contracts.${CONTRACT_TYPES.PURCHASE}.product_data.title`
        }
    ]
}