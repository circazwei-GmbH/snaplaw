import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  REQUEST_CREATE_CONTRACT,
  REQUEST_SCREEN_DATA,
  REQUEST_INVITE_USER,
  REQUEST_USERS_EMAIL,
} from "./action-creators";
import {
  RequestCreateContractAction,
  RequestScreenDataAction,
  InviteUserAction,
  RequestGetEmailsAction,
} from "./types";
import API from "../../../services/contract/index";
import { responseError } from "../auth/action-creators";
import { addToWAiter, removeFromWaiter } from "../main/slice";
import { CONTRACT_CREATION_WAIT } from "./constants";
import { setInitedContract } from "./slice";
import * as RootNavigation from "../../../router/RootNavigation";
import { HOME_ROUTER } from "../../../router/HomeRouterType";
import { prefillUserData } from "../../../services/contract/user-data-prefiller";
import { SelectType } from "../../hooks";
import { Translator } from "../../../translator/i18n";
import { setMessage } from "../main/slice";
import { setInviteEmails } from "./slice";

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
    RootNavigation.navigate(HOME_ROUTER.CONTRACT, { screenCount: 0 });
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

function* requestInviteUser({ payload }: InviteUserAction) {
  try {
    yield call(API.inviteUser, payload);
    RootNavigation.pop();
  } catch (error) {
    yield put(responseError(error));
  }
}

function* requestUsersEmail({ payload }: RequestGetEmailsAction) {
  try {
    const result = yield call(API.getUserEmails, payload);
    yield put(setInviteEmails(result));
  } catch (error) {
    console.log(error);
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  }
}

function* contractSaga() {
  yield takeLatest(REQUEST_CREATE_CONTRACT, createContract);
  yield takeLatest(REQUEST_SCREEN_DATA, requestScreenData);
  yield takeLatest(REQUEST_INVITE_USER, requestInviteUser);
  yield takeLatest(REQUEST_USERS_EMAIL, requestUsersEmail);
}

export default contractSaga;
