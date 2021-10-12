import { UPLOAD_MEDIA, UploadMediaAction } from "./action-creators";
import { call, put, takeLatest } from "redux-saga/effects";
import { addToWaiter, removeFromWaiter, setMessage } from "../main/slice";
import { Translator } from "../../../translator/i18n";
import API from "../../../services/media/index";
import { mutateFileUploadsAction } from "../../../utils/mutate-actions";
import { PHOTO_LOADING_WAIT } from "../contract/constants";

function* uploadMedia({ payload }: UploadMediaAction) {
  try {
    yield put(
      addToWaiter({
        event: PHOTO_LOADING_WAIT,
        message: "Don’t close the application while images are being uploaded",
      })
    );
    const mediaPath = yield call(API.mediaProcess, payload);
    yield put(
      mutateFileUploadsAction(
        payload.successAction,
        mediaPath,
        payload.mutationPath
      )
    );
  } catch (error) {
    yield put(setMessage(Translator.getInstance().trans("errors.abstract")));
  } finally {
    yield put(removeFromWaiter({ event: PHOTO_LOADING_WAIT }));
  }
}

function* mediaSaga() {
  yield takeLatest(UPLOAD_MEDIA, uploadMedia);
}

export default mediaSaga;
