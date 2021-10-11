import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  REQEST_CONTRACTS_LIST,
  REQUEST_CONTRACT,
  REQUEST_CONTRACT_DELETE,
  REQUEST_CREATE_CONTRACT,
  REQUEST_SCREEN_DATA,
  SIGN_CONTRACT,
  VALIDATE_ALL_SCREENS,
  VALIDATE_SCREEN,
  validateScreen,
  REQUEST_INVITE_USER,
  REQUEST_USERS_EMAIL,
  REQUEST_ACCEPT_INVITE,
  REQUEST_DELETE_CONTRACT_PARTNER,
  REQUEST_CONTRACT_DETAIL_FOR_PDF,
  REQUEST_LEAVE_CONTRACT,
} from "./action-creators";
import {
  RequestContractAction,
  RequestContractListAction,
  RequestCreateContractAction,
  RequestScreenDataAction,
  ScreenValidateAction,
  SignContractAction,
  ValidateAllScreensAction,
  InviteUserAction,
  RequestGetEmailsAction,
  EmailsListItemInterface,
  ContractDataType,
  RequestAcceptInviteAction,
  RequestDeleteContractPartnerAction,
} from "./types";
import API from "../../../services/contract/index";
import { responseError } from "../auth/action-creators";
import {
  addToWaiter,
  removeFromWaiter,
  setMessage,
  setModal,
} from "../main/slice";
import { CONTRACT_CREATION_WAIT } from "./constants";
import {
  clearErrors,
  CONTRACT_LIST_LOADING_TYPE,
  deleteContract,
  setContractsList,
  setFieldError,
  setInitedContract,
  setListLoading,
  updateContractSign,
  setInviteEmails,
  inviteSelf,
  removeContractPartnerFromList,
  setPdfViewOnListContract,
  setPartnerNameAfterInvite,
  clearAllSign,
} from "./slice";
import * as RootNavigation from "../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../router/HomeRouterType";
import { prefillUserData } from "../../../services/contract/user-data-prefiller";
import { SelectType } from "../../hooks";
import { contractValidationConfig, screenFieldValidator } from "./validation";
import { BaseScreenDataInterface } from "./base-types";
import { Translator } from "../../../translator/i18n";
import { USER_SELF_INVITE } from "../../../services/error-codes";
import { CONTRACT_ROLE } from "./contract-roles";
import { navigatePop } from "../main/action-creators";

function* createContract({ payload }: RequestCreateContractAction) {
  try {
    yield put(addToWaiter({event: CONTRACT_CREATION_WAIT}));
    const response = yield call(API.createContract, payload);
    yield put(
      setInitedContract({
        id: response.data.id,
        type: payload,
        partnerId: undefined,
        meRole: CONTRACT_ROLE.OWNER,
        createdAt: "",
        sign: undefined,
        oponentSign: null,
        partnerName: null,
        screens: [
          prefillUserData(
            yield select<SelectType>((state) => state.profile.user)
          ),
        ],
      })
    );
    yield put(clearErrors());
    RootNavigation.navigate(HOME_ROUTER.CONTRACT, { screenCount: 0 });
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter({event: CONTRACT_CREATION_WAIT}));
  }
}

function* requestScreenData({
  payload,
  additionalPayload,
}: RequestScreenDataAction) {
  const screenData = yield select<SelectType>((state) =>
    state.contract.currentContract?.screens.find(
      (screen) => screen.type === payload
    )
  );
  const contract = yield select<SelectType>(
    (state) => state.contract.currentContract
  );
  if (!screenData) {
    return;
  }
  try {
    yield call(
      API.saveScreenData,
      contract.id,
      screenData,
      contract.meRole,
      additionalPayload.isDropSign
    );
    if (additionalPayload.isDropSign) {
      yield put(clearAllSign());
    }
  } catch (error) {
    yield put(responseError(error));
  }
}

function* screenValidate({
  payload: { contractType, screenType },
}: ScreenValidateAction) {
  const screen = yield select((state) =>
    state.contract.currentContract.screens.find(
      (screen: BaseScreenDataInterface) => screen.type === screenType
    )
  );
  const myRole: CONTRACT_ROLE = yield select(
    (state) => (state.contract.currentContract as ContractDataType).meRole
  );
  // @ts-ignore
  const validationConfig =
    contractValidationConfig[contractType][screenType][myRole];
  if (!validationConfig) {
    return;
  }
  for (let field in validationConfig) {
    const validated = screenFieldValidator(
      field,
      screenType,
      screen,
      contractType,
      myRole
    );
    if (validated) {
      yield put(
        setFieldError({
          screenType,
          message: Translator.getInstance().trans(validated),
          field,
        })
      );
    } else {
      yield put(
        setFieldError({
          screenType,
          message: undefined,
          field,
        })
      );
    }
  }
}

function* validateAllScreens({ payload }: ValidateAllScreensAction) {
  const screens = contractValidationConfig[payload];
  for (const screenName in screens) {
    // @ts-ignore
    yield put(validateScreen(payload, screenName));
  }
}

function* requestContractsList({
  payload: { type, isRefresh },
}: RequestContractListAction) {
  const listPagination = yield select((state) => state.contract.listPagination);
  if (
    listPagination.listType === type &&
    !listPagination.isNextPage &&
    !isRefresh
  ) {
    return;
  }
  const currentContracts = yield select((state) => state.contract.contracts);
  try {
    const requestedPage =
      listPagination.listType === type && !isRefresh
        ? listPagination.page + (currentContracts.length ? 1 : 0)
        : 0;
    if (!requestedPage) {
      yield put(
        setListLoading(
          isRefresh
            ? CONTRACT_LIST_LOADING_TYPE.REFRESH
            : CONTRACT_LIST_LOADING_TYPE.INITIAL
        )
      );
    }
    const filters = yield select((state) => state.contract.smartFilters);
    const contracts = yield call(
      API.requestContractList,
      type,
      requestedPage,
      filters
    );
    yield put(
      setContractsList({
        list: contracts,
        page: requestedPage,
        type: type,
        isRefresh,
      })
    );
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(setListLoading(undefined));
  }
}

function* requestContract({ payload }: RequestContractAction) {
  try {
    const contract = yield call(API.requestContract, payload);
    yield put(setInitedContract(contract));
  } catch (error) {
    yield put(responseError(error));
  }
}

function* requestContractDelete({ payload }: RequestContractAction) {
  try {
    yield put(addToWaiter({event: "requestDeleteContract"}));
    yield call(API.requestDeleteContract, payload);
    yield put(deleteContract(payload));
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter({event: "requestDeleteContract"}));
  }
}

function* signContract({ payload }: SignContractAction) {
  try {
    yield put(updateContractSign(payload));
    const contractId = yield select(
      (state) => state.contract.currentContract.id
    );
    yield call(API.signContract, contractId, payload);
  } catch (error) {
    yield put(responseError(error));
  }
}

function* requestInviteUser({ payload }: InviteUserAction) {
  try {
    yield call(API.inviteUser, payload);
    yield put(
      setModal({
        message: Translator.getInstance().trans("invite_page.successed"),
        actions: [
          {
            name: Translator.getInstance().trans("ok"),
            action: navigatePop(),
          },
        ],
      })
    );
    yield put(
      setPartnerNameAfterInvite({
        contractId: payload.contractId || "",
        partnerName: payload.search,
      })
    );
  } catch (error) {
    if (error.response?.data.code === USER_SELF_INVITE) {
      return yield put(
        inviteSelf(
          Translator.getInstance().trans("invite_page.self_invite_error")
        )
      );
    }
    yield put(responseError(error));
  }
}

function* requestUsersEmail({ payload }: RequestGetEmailsAction) {
  const listPagination = yield select(
    (state) => state.contract.emailsListPagination
  );
  const currentList = yield select((state) => state.contract.inviteEmailsList);
  try {
    const page =
      listPagination.page +
      (currentList.length ? (listPagination === payload ? 1 : 0) : 0);
    const list: EmailsListItemInterface[] = yield call(API.getUserEmails, {
      payload,
      page,
    });
    const resultList = page > 0 ? currentList.concat(list) : list;
    yield put(setInviteEmails({ list: resultList, page, query: payload }));
  } catch (error) {
    yield put(responseError(error));
  }
}

function* requestAcceptInvite({ payload }: RequestAcceptInviteAction) {
  yield put(addToWaiter({event: REQUEST_ACCEPT_INVITE}));
  try {
    yield call(API.acceptInvite, payload);
    yield put(
      setMessage(
        Translator.getInstance().trans(
          "notifications.messages.accepted_invite_success"
        )
      )
    );
  } catch (error) {
    if (error?.response?.status === 403) {
      yield put(
        setMessage(
          Translator.getInstance().trans(
            "notifications.messages.accept_invite_error"
          )
        )
      );
    } else {
      yield put(responseError(error));
    }
  } finally {
    yield put(removeFromWaiter({event: REQUEST_ACCEPT_INVITE}));
  }
}

function* requestDeleteContractPartner({
  payload,
}: RequestDeleteContractPartnerAction) {
  yield put(addToWaiter({event: REQUEST_DELETE_CONTRACT_PARTNER}));
  try {
    yield call(API.deleteContractPartner, payload);
    yield put(removeContractPartnerFromList(payload));
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter({event: REQUEST_DELETE_CONTRACT_PARTNER}));
  }
}

function* requestContractDetailPdf({ payload }: RequestContractAction) {
  yield put(addToWaiter({event: REQUEST_CONTRACT_DETAIL_FOR_PDF}));
  try {
    const contract = yield call(API.requestContract, payload);
    yield put(setPdfViewOnListContract(contract));
    
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter({event: REQUEST_CONTRACT_DETAIL_FOR_PDF}));
  }
}

function* requestLeaveContract({ payload }: RequestContractAction) {
  yield put(addToWaiter({event: REQUEST_LEAVE_CONTRACT}));
  try {
    yield call(API.requestLeaveContract, payload);
    yield put(deleteContract(payload));
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter({event: REQUEST_LEAVE_CONTRACT}));
  }
}

function* contractSaga() {
  yield takeLatest(REQUEST_CREATE_CONTRACT, createContract);
  yield takeLatest(REQUEST_SCREEN_DATA, requestScreenData);
  yield takeLatest(VALIDATE_SCREEN, screenValidate);
  yield takeLatest(REQEST_CONTRACTS_LIST, requestContractsList);
  yield takeLatest(REQUEST_CONTRACT, requestContract);
  yield takeLatest(REQUEST_CONTRACT_DELETE, requestContractDelete);
  yield takeLatest(VALIDATE_ALL_SCREENS, validateAllScreens);
  yield takeLatest(SIGN_CONTRACT, signContract);
  yield takeLatest(REQUEST_INVITE_USER, requestInviteUser);
  yield takeLatest(REQUEST_USERS_EMAIL, requestUsersEmail);
  yield takeLatest(REQUEST_ACCEPT_INVITE, requestAcceptInvite);
  yield takeLatest(
    REQUEST_DELETE_CONTRACT_PARTNER,
    requestDeleteContractPartner
  );
  yield takeLatest(REQUEST_CONTRACT_DETAIL_FOR_PDF, requestContractDetailPdf);
  yield takeLatest(REQUEST_LEAVE_CONTRACT, requestLeaveContract);
}

export default contractSaga;
