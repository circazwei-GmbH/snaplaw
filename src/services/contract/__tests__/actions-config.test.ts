import * as ActionConfig from '../actions-config'
import {CONTRACT_TYPES} from "../../../store/modules/contract/constants";
import {CONTRACT_ROLE} from "../../../store/modules/contract/contract-roles";
import {ListActionType} from "../actions-config";
import {
  requestContractDetailForPdfView,
  requestDeleteContract, requestDeleteContractPartner,
  requestLeaveContract
} from "../../../store/modules/contract/action-creators";
import {navigate} from "../../../store/modules/main/action-creators";
import {MY_CONTRACT_ROUTE} from "../../../router/MyContractRouterTypes";
import {setMessage, setModal} from "../../../store/modules/main/slice";
import {ROUTER_TABS} from "../../../router/TabRouterTypes";
import {HOME_ROUTER} from "../../../router/HomeRouterType";
import {BUTTON_COLORTYPE} from "../../../store/modules/main/types";

const getlistElementByPosition = (actions: Array<ListActionType>, position: number): ListActionType => actions[position];

describe("ActionConfig finalized for partner", () => {
  let actions: Array<ListActionType> = [];
  const contract = {
    id: "contractId",
    type: CONTRACT_TYPES.PURCHASE,
    createdAt: 'createdAt',
    title: "title",
    partnerId: "partnerId",
    ownerId: "ownerId",
    meRole: CONTRACT_ROLE.PARTNER,
    finalizedAt: "finalizedDateTime",
  };
  beforeEach(() => {
    actions = ActionConfig.getListItemAction(contract)
  })
  it("Should truthy elements count", () => {
    expect(actions.length).toEqual(3)
  })
  it("Should view pdf action with handler", () => {
    const currentAction = getlistElementByPosition(actions, 0);
    expect(currentAction.action.title).toEqual("my_contracts.actions.view_pdf")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(requestContractDetailForPdfView(contract.id))
  })
  it("Should see partner with handler", () => {
    const currentAction = getlistElementByPosition(actions, 1);
    expect(currentAction.action.title).toEqual("my_contracts.actions.see_partner")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(navigate({[MY_CONTRACT_ROUTE.PROFILE]: {id: contract.ownerId}}))
  })
  it("Should see contract history with handler", () => {
    const translator = jest.fn().mockImplementation(t => t)
    const currentAction = getlistElementByPosition(actions, 2);
    expect(currentAction.action.title).toEqual("my_contracts.actions.contract_history")
    expect(currentAction.action.handler(contract, translator)).toEqual(setMessage("contracts.messages.coming_soon"))
    expect(translator).toBeCalledWith("contracts.messages.coming_soon")
  })
})

describe("ActionConfig finalized for owner", () => {
  let actions: Array<ListActionType> = [];
  const contract = {
    id: "contractId",
    type: CONTRACT_TYPES.PURCHASE,
    createdAt: 'createdAt',
    title: "title",
    partnerId: "partnerId",
    ownerId: "ownerId",
    meRole: CONTRACT_ROLE.OWNER,
    finalizedAt: "finalizedDateTime",
  };
  beforeEach(() => {
    actions = ActionConfig.getListItemAction(contract)
  })
  it("Should truthy elements count", () => {
    expect(actions.length).toEqual(3)
  })
  it("Should view pdf action with handler", () => {
    const currentAction = getlistElementByPosition(actions, 0);
    expect(currentAction.action.title).toEqual("my_contracts.actions.view_pdf")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(requestContractDetailForPdfView(contract.id))
  })
  it("Should see partner with handler", () => {
    const currentAction = getlistElementByPosition(actions, 1);
    expect(currentAction.action.title).toEqual("my_contracts.actions.see_partner")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(navigate({[MY_CONTRACT_ROUTE.PROFILE]: {id: contract.partnerId}}))
  })
  it("Should see contract history with handler", () => {
    const translator = jest.fn().mockImplementation(t => t)
    const currentAction = getlistElementByPosition(actions, 2);
    expect(currentAction.action.title).toEqual("my_contracts.actions.contract_history")
    expect(currentAction.action.handler(contract, translator)).toEqual(setMessage("contracts.messages.coming_soon"))
    expect(translator).toBeCalledWith("contracts.messages.coming_soon")
  })
})

describe("ActionConfig without partner for owner", () => {
  let actions: Array<ListActionType> = [];
  const contract = {
    id: "contractId",
    type: CONTRACT_TYPES.PURCHASE,
    createdAt: 'createdAt',
    title: "title",
    partnerId: undefined,
    ownerId: "ownerId",
    meRole: CONTRACT_ROLE.OWNER,
    finalizedAt: undefined,
  };
  beforeEach(() => {
    actions = ActionConfig.getListItemAction(contract)
  })
  it("Should truthy elements count", () => {
    expect(actions.length).toEqual(3)
  })
  it("Should edit action with handler", () => {
    const currentAction = getlistElementByPosition(actions, 0);
    expect(currentAction.action.title).toEqual("my_contracts.actions.edit")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(navigate({
      [ROUTER_TABS.HOMEPAGE]: {},
      [HOME_ROUTER.CONTRACT]: { screenCount: 0, id: contract.id },
    }))
  })
  it("Should see delete action with handler", () => {
    const translator = jest.fn().mockImplementation(t => t)
    const currentAction = getlistElementByPosition(actions, 1);
    expect(currentAction.action.title).toEqual("my_contracts.actions.delete")
    expect(currentAction.action.handler(contract, translator)).toEqual(setModal({
      message: "my_contracts.delete_modal.message",
      actions: [
        {
          name: "my_contracts.delete_modal.no",
          colortype: BUTTON_COLORTYPE.ERROR
        },
        {
          name: "my_contracts.delete_modal.yes",
          action: requestDeleteContract(contract.id)
        }
      ]
    }));
  })
  it("Should see invite actions with handler", () => {
    const translator = jest.fn().mockImplementation(t => t)
    const currentAction = getlistElementByPosition(actions, 2);
    expect(currentAction.action.title).toEqual("my_contracts.actions.invite_partner")
    expect(currentAction.action.handler(contract, translator)).toEqual(navigate({[MY_CONTRACT_ROUTE.INVITE]: { contractId: contract.id }}))
  })
})

describe("ActionConfig for partner with handler", () => {
  let actions: Array<ListActionType> = [];
  const contract = {
    id: "contractId",
    type: CONTRACT_TYPES.PURCHASE,
    createdAt: 'createdAt',
    title: "title",
    partnerId: "partnerId",
    ownerId: "ownerId",
    meRole: CONTRACT_ROLE.PARTNER,
    finalizedAt: undefined,
  };
  beforeEach(() => {
    actions = ActionConfig.getListItemAction(contract)
  })
  it("Should truthy elements count", () => {
    expect(actions.length).toEqual(4)
  })
  it("Should see edit action with handler", () => {
    const currentAction = getlistElementByPosition(actions, 1);
    expect(currentAction.action.title).toEqual("my_contracts.actions.edit")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(navigate({
      [ROUTER_TABS.HOMEPAGE]: {},
      [HOME_ROUTER.CONTRACT]: { screenCount: 0, id: contract.id },
    }))
  })
  it("Should see decline action with handler", () => {
    const currentAction = getlistElementByPosition(actions, 2);
    expect(currentAction.action.title).toEqual("my_contracts.actions.decline")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(requestLeaveContract(contract.id))
  })
})

describe("ActionConfig for owner with partner with handler", () => {
  let actions: Array<ListActionType> = [];
  const contract = {
    id: "contractId",
    type: CONTRACT_TYPES.PURCHASE,
    createdAt: 'createdAt',
    title: "title",
    partnerId: "partnerId",
    ownerId: "ownerId",
    meRole: CONTRACT_ROLE.OWNER,
    finalizedAt: undefined,
  };
  beforeEach(() => {
    actions = ActionConfig.getListItemAction(contract)
  })
  it("Should truthy elements count", () => {
    expect(actions.length).toEqual(4)
  })
  it("Should see edit action with handler", () => {
    const currentAction = getlistElementByPosition(actions, 3);
    expect(currentAction.action.title).toEqual("my_contracts.actions.delete_partner")
    expect(currentAction.action.handler(contract, (t) => t)).toEqual(setModal({
      message: "my_contracts.delete_partner.message",
      actions: [
        {
          name: "my_contracts.delete_partner.no",
          colortype: BUTTON_COLORTYPE.ERROR
        },
        {
          name: "my_contracts.delete_partner.yes",
          action: requestDeleteContractPartner(contract.id)
        }
      ]
    }))
  })
})
