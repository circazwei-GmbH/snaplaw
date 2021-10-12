import {
  CONTRACT_STATUS,
  ContractDataListType,
} from "../../store/modules/contract/types";
import { CONTRACT_ROLE } from "../../store/modules/contract/contract-roles";
import { navigate } from "../../store/modules/main/action-creators";
import { ROUTER_TABS } from "../../router/TabRouterTypes";
import { HOME_ROUTER } from "../../router/HomeRouterType";
import { setMessage, setModal } from "../../store/modules/main/slice";
import { BUTTON_COLORTYPE } from "../../store/modules/main/types";
import {
  requestContractDetailForPdfView,
  requestDeleteContract,
  requestDeleteContractPartner,
  requestLeaveContract,
} from "../../store/modules/contract/action-creators";
import { TType } from "../../translator/i18n";
import { MY_CONTRACT_ROUTE } from "../../router/MyContractRouterTypes";
import { AnyAction } from "@reduxjs/toolkit";

type ListActionType = {
  contractRole: CONTRACT_ROLE;
  contractStatus: string[];
  action: {
    title: string;
    handler: (item: ContractDataListType, t: TType) => AnyAction;
  };
};

const listActionConfig: ListActionType[] = [
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [
      CONTRACT_STATUS.WITH_PARTNER,
      CONTRACT_STATUS.WITHOUT_PARTNER,
    ],
    action: {
      title: "my_contracts.actions.edit",
      handler: (item) =>
        navigate({
          [ROUTER_TABS.HOMEPAGE]: {},
          [HOME_ROUTER.CONTRACT]: { screenCount: 0, id: item.id },
        }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.PARTNER,
    contractStatus: [CONTRACT_STATUS.WITH_PARTNER, CONTRACT_STATUS.FINNALIZED],
    action: {
      title: "my_contracts.actions.view_pdf",
      handler: (item) => requestContractDetailForPdfView(item.id),
    },
  },
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [CONTRACT_STATUS.FINNALIZED],
    action: {
      title: "my_contracts.actions.view_pdf",
      handler: (item) => requestContractDetailForPdfView(item.id),
    },
  },
  {
    contractRole: CONTRACT_ROLE.PARTNER,
    contractStatus: [CONTRACT_STATUS.WITH_PARTNER],
    action: {
      title: "my_contracts.actions.edit",
      handler: (item) =>
        navigate({
          [ROUTER_TABS.HOMEPAGE]: {},
          [HOME_ROUTER.CONTRACT]: { screenCount: 0, id: item.id },
        }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.PARTNER,
    contractStatus: [CONTRACT_STATUS.WITH_PARTNER],
    action: {
      title: "my_contracts.actions.decline",
      handler: (item) => requestLeaveContract(item.id),
    },
  },
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [
      CONTRACT_STATUS.WITH_PARTNER,
      CONTRACT_STATUS.WITHOUT_PARTNER,
    ],
    action: {
      title: "my_contracts.actions.delete",
      handler: (item, t) =>
        setModal({
          message: t("my_contracts.delete_modal.message"),
          actions: [
            {
              name: t("my_contracts.delete_modal.no"),
              colortype: BUTTON_COLORTYPE.ERROR,
            },
            {
              name: t("my_contracts.delete_modal.yes"),
              action: requestDeleteContract(item.id),
            },
          ],
        }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [CONTRACT_STATUS.WITH_PARTNER, CONTRACT_STATUS.FINNALIZED],
    action: {
      title: "my_contracts.actions.see_partner",
      handler: (item) =>
        navigate({ [MY_CONTRACT_ROUTE.PROFILE]: { id: item.partnerId } }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [CONTRACT_STATUS.WITH_PARTNER],
    action: {
      title: "my_contracts.actions.delete_partner",
      handler: (item, t) =>
        setModal({
          message: t("my_contracts.delete_partner.message"),
          actions: [
            {
              name: t("my_contracts.delete_partner.no"),
              colortype: BUTTON_COLORTYPE.ERROR,
            },
            {
              name: t("my_contracts.delete_partner.yes"),
              action: requestDeleteContractPartner(item.id),
            },
          ],
        }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.PARTNER,
    contractStatus: [CONTRACT_STATUS.FINNALIZED],
    action: {
      title: "my_contracts.actions.see_partner",
      handler: (item) =>
        navigate({ [MY_CONTRACT_ROUTE.PROFILE]: { id: item.partnerId } }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [CONTRACT_STATUS.WITHOUT_PARTNER],
    action: {
      title: "my_contracts.actions.invite_partner",
      handler: (item) =>
        navigate({ [MY_CONTRACT_ROUTE.INVITE]: { contractId: item.id } }),
    },
  },
  {
    contractRole: CONTRACT_ROLE.OWNER,
    contractStatus: [CONTRACT_STATUS.FINNALIZED],
    action: {
      title: "my_contracts.actions.contract_history",
      handler: (item, t) => setMessage(t("contracts.messages.coming_soon")),
    },
  },
];

export const getListItemAction = (item: ContractDataListType) => {
  return listActionConfig.filter((listAction) => {
    let currentStatus = item.partnerId
      ? CONTRACT_STATUS.WITH_PARTNER
      : CONTRACT_STATUS.WITHOUT_PARTNER;
    if (item.finalizedAt) {
      currentStatus = CONTRACT_STATUS.FINNALIZED;
    }
    return (
      item.meRole === listAction.contractRole &&
      listAction.contractStatus.includes(currentStatus)
    );
  });
};
