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
import {
  checkByPaymentType,
  checkMemberTypeCommercial,
  checkMemberTypePrivat,
  checkPartnerSign,
} from "./exclusions-checkers";
import CompanyDataForm from "../../../components/features/forms/contract/CompanyDataForm";
import PassportDataForm from "../../../components/features/forms/contract/PassportDataForm";
import ProductDataCarForm from "../../../components/features/forms/contract/ProdactDataCarForm";
import Specifications from "../../../components/features/forms/contract/Specifications";
import AdditionalInfo from "../../../components/features/forms/contract/AdditionalInformationCar";
import PaymentInfo from "../../../components/features/forms/contract/PaymentInfo";
import PaymentCar from "../../../components/features/forms/contract/PaymentCar";
import ServicesForm from "../../../components/features/forms/contract/ServicesForm";
import InviteUserForm from "../../../components/features/forms/contract/InviteUserForm";
import { ContractDataType } from "./types";
import PaymentPartnerFirst from "../../../components/features/forms/contract/PaymentPartnerFirst";
import AboutHousing from "../../../components/features/forms/contract/AboutHousingForm";
import SecondaryRooms from "../../../components/features/forms/contract/SecondaryRooms";
import UsableSpaces from "../../../components/features/forms/contract/UsableSpaces";
import CommonRooms from "../../../components/features/forms/contract/CommonRooms";

export interface ContractScreenConfigType {
  component: React.ElementType;
  title: string;
  type: CONTRACT_SCREEN_TYPES;
  granted: Array<CONTRACT_ROLE>;
  exclusionChecker?: (contract: ContractDataType) => boolean;
}

export const getContractScreensConfig = (
  contract: ContractDataType
): Array<ContractScreenConfigType> =>
  contractScreensConfig[contract.type].filter((screen) => {
    let flag = screen.granted.includes(contract.meRole);
    if (
      flag &&
      typeof screen.exclusionChecker === "function" &&
      contract.screens
    ) {
      return screen.exclusionChecker(contract);
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
      type: CONTRACT_SCREEN_TYPES.PASSPORT_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      exclusionChecker: checkMemberTypePrivat,
    },
    {
      component: ProductDataCarForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DATA,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: Specifications,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SPECIFICATIONS}.title`,
      type: CONTRACT_SCREEN_TYPES.SPECIFICATIONS,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: AdditionalInfo,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO}.title`,
      type: CONTRACT_SCREEN_TYPES.ADDITIONAL_INFO,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: PaymentCar,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT}.title`,
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: PaymentInfo,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.PAYMENT_INFO}.title`,
      type: CONTRACT_SCREEN_TYPES.PAYMENT_INFO,
      granted: [CONTRACT_ROLE.OWNER],
      exclusionChecker: checkByPaymentType,
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.CAR}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
  ],
  [CONTRACT_TYPES.WORK]: [
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: ServicesForm,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SERVICES}.title`,
      type: CONTRACT_SCREEN_TYPES.SERVICES,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: ProductDescriptionForm,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION}.title`,
      type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: InviteUserForm,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.INVITE_USER}.title`,
      type: CONTRACT_SCREEN_TYPES.INVITE_USER,
      granted: [CONTRACT_ROLE.OWNER],
      exclusionChecker: (contract) => !checkPartnerSign(contract),
    },
    {
      component: PaymentPartnerFirst,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.PAYMENT}.title`,
      type: CONTRACT_SCREEN_TYPES.PAYMENT,
      granted: [CONTRACT_ROLE.PARTNER],
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.WORK}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
      exclusionChecker: checkPartnerSign,
    },
  ],
  [CONTRACT_TYPES.RENTAL]: [
    {
      component: UserDataForm,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.USER_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.USER_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: PassportDataForm,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.PASSPORT_DATA}.title`,
      type: CONTRACT_SCREEN_TYPES.PASSPORT_DATA,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: Confirmation,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.CONFIRMATION}.title`,
      type: CONTRACT_SCREEN_TYPES.CONFIRMATION,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
    {
      component: AboutHousing,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.ABOUT_HOUSING}.title`,
      type: CONTRACT_SCREEN_TYPES.ABOUT_HOUSING,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: SecondaryRooms,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS}.title`,
      type: CONTRACT_SCREEN_TYPES.SECONDARY_ROOMS,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: UsableSpaces,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.USABLE_SPACES}.title`,
      type: CONTRACT_SCREEN_TYPES.USABLE_SPACES,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: CommonRooms,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.COMMON_ROOMS}.title`,
      type: CONTRACT_SCREEN_TYPES.COMMON_ROOMS,
      granted: [CONTRACT_ROLE.OWNER],
    },
    {
      component: Sign,
      title: `contracts.${CONTRACT_TYPES.RENTAL}.${CONTRACT_SCREEN_TYPES.SIGN}.title`,
      type: CONTRACT_SCREEN_TYPES.SIGN,
      granted: [CONTRACT_ROLE.OWNER, CONTRACT_ROLE.PARTNER],
    },
  ],
  [CONTRACT_TYPES.FREE]: [],
};
