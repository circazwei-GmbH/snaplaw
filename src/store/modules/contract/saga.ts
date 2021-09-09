import { call, put, takeLatest, select } from "redux-saga/effects";
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
} from "./action-creators";
import {
  RequestContractAction,
  RequestContractListAction,
  RequestCreateContractAction,
  RequestScreenDataAction,
  ScreenValidateAction,
  SignContractAction,
  ValidateAllScreensAction,
} from "./types";
import API from "../../../services/contract/index";
import { responseError } from "../auth/action-creators";
import { addToWAiter, removeFromWaiter } from "../main/slice";
import { CONTRACT_CREATION_WAIT } from "./constants";
import {
  clearErrors,
  deleteContract,
  setContractsList,
  setFieldError,
  setInitedContract,
  setListLoading,
  updateContractSign,
} from "./slice";
import * as RootHavigation from "../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../router/HomeRouterType";
import { prefillUserData } from "../../../services/contract/user-data-prefiller";
import { SelectType } from "../../hooks";
import { contractValidationConfig, screenFieldValidator } from "./validation";
import { BaseScreenDataInterface } from "./base-types";
import { Translator } from "../../../translator/i18n";

function* createContract({ payload }: RequestCreateContractAction) {
  try {
    yield put(addToWAiter(CONTRACT_CREATION_WAIT));
    const response = yield call(API.createContract, payload);
    yield put(
      setInitedContract({
        id: response.data.id,
        type: payload,
        contractor: undefined,
        createdAt: "",
        sign: undefined,
        screens: [
          prefillUserData(
            yield select<SelectType>((state) => state.profile.user)
          ),
        ],
      })
    );
    yield put(clearErrors());
    RootHavigation.navigate(HOME_ROUTER.CONTRACT, { screenCount: 0 });
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter(CONTRACT_CREATION_WAIT));
  }
}

function* requestScreenData({ payload }: RequestScreenDataAction) {
  const screenData = yield select<SelectType>((state) =>
    state.contract.currentContract?.screens.find(
      (screen) => screen.type === payload
    )
  );
  const contractId = yield select<SelectType>(
    (state) => state.contract.currentContract?.id
  );
  if (!screenData) {
    return;
  }
  try {
    yield call(API.saveScreenData, contractId, screenData);
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
  const validationConfig = contractValidationConfig[contractType][screenType];
  for (let field in validationConfig) {
    const validated = screenFieldValidator(
      field,
      screenType,
      screen,
      contractType
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

function* requestConreactsList({ payload }: RequestContractListAction) {
  const listPagination = yield select((state) => state.contract.listPagination);
  if (listPagination.listType === payload && !listPagination.isNextPage) {
    return;
  }
  const currentContracts = yield select((state) => state.contract.contracts);
  try {
    const requestedPage =
      listPagination.listType === payload
        ? listPagination.page + (currentContracts.length ? 1 : 0)
        : 0;
    if (!requestedPage) {
      yield put(setListLoading(true));
    }
    const contracts = yield call(
      API.requestContractList,
      payload,
      requestedPage
    );
    yield put(
      setContractsList({
        list: contracts,
        page: requestedPage,
        type: payload,
      })
    );
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(setListLoading(false));
  }
}

function* requestContract({ payload }: RequestContractAction) {
  try {
    const contract = yield call(API.requestContract, payload);
    yield put(
      setInitedContract({
        id: contract.id,
        type: contract.type,
        screens: contract.screens,
        contractor: undefined,
        sign: contract.sign,
        createdAt: contract.createdAt,
      })
    );
  } catch (error) {
    yield put(responseError(error));
  }
}

function* requestContractDelete({ payload }: RequestContractAction) {
  try {
    yield put(addToWAiter("requestDeleteContract"));
    yield call(API.requestDeleteContract, payload);
    yield put(deleteContract(payload));
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter("requestDeleteContract"));
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

function* contractSaga() {
  yield takeLatest(REQUEST_CREATE_CONTRACT, createContract);
  yield takeLatest(REQUEST_SCREEN_DATA, requestScreenData);
  yield takeLatest(VALIDATE_SCREEN, screenValidate);
  yield takeLatest(REQEST_CONTRACTS_LIST, requestConreactsList);
  yield takeLatest(REQUEST_CONTRACT, requestContract);
  yield takeLatest(REQUEST_CONTRACT_DELETE, requestContractDelete);
  yield takeLatest(VALIDATE_ALL_SCREENS, validateAllScreens);
  yield takeLatest(SIGN_CONTRACT, signContract);
}

export default contractSaga;
