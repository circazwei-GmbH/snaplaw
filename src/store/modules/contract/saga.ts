import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  REQUEST_CREATE_CONTRACT,
  REQUEST_SCREEN_DATA, VALIDATE_SCREEN,
} from "./action-creators";
import {Contract, RequestCreateContractAction, RequestScreenDataAction, ScreenValidateAction} from "./types";
import API from "../../../services/contract/index";
import { responseError } from "../auth/action-creators";
import { addToWAiter, removeFromWaiter } from "../main/slice";
import { CONTRACT_CREATION_WAIT } from "./constants";
import {clearErrors, setFieldError, setInitedContract} from "./slice";
import * as RootHavigation from "../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../router/HomeRouterType";
import { prefillUserData } from "../../../services/contract/user-data-prefiller";
import { SelectType } from "../../hooks";
import {contractValidationConfig} from "./validation";
import {BaseScreenDataInterface} from "./base-types";

function* createContract({ payload }: RequestCreateContractAction) {
  try {
    yield put(addToWAiter(CONTRACT_CREATION_WAIT));
    const response = yield call(API.createContract, payload);
    yield put(
      setInitedContract({
        id: response.data.id,
        type: payload,
        screens: [
          prefillUserData(
            yield select<SelectType>((state) => state.profile.user)
          ),
        ],
      })
    );
    yield put(clearErrors())
    RootHavigation.navigate(HOME_ROUTER.CONTRACT, { screenCount: 0 });
  } catch (error) {
    yield put(responseError(error));
  } finally {
    yield put(removeFromWaiter(CONTRACT_CREATION_WAIT));
  }
}

function* requestScreenData({ payload }: RequestScreenDataAction) {
  const screenData = yield select<SelectType>(
    (state) => state.contract.currentContract?.screens[payload]
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

function* contractValidate({ payload: { contractType, screenType } }: ScreenValidateAction) {
  const screen = yield select(state => (state.contract.currentContract.screens.find((screen: BaseScreenDataInterface) => screen.type === screenType)))
  const validationConfig = contractValidationConfig[contractType][screenType]
  for(let field in validationConfig) {
    // @ts-ignore
    for(let i = 0; Object.keys(validationConfig[field]).length > i; i++) {
      // @ts-ignore
      const validated = validationConfig[field][i]('')
      if (validated) {
        yield put(setFieldError({
          screenType,
          message: validated,
          field
        }))
        break
      }
    }
  }
  // console.log('SAGA', validationConfig, screen)
}

function* contractSaga() {
  yield takeLatest(REQUEST_CREATE_CONTRACT, createContract);
  yield takeLatest(REQUEST_SCREEN_DATA, requestScreenData);
  yield takeLatest(VALIDATE_SCREEN, contractValidate)
}

export default contractSaga;
