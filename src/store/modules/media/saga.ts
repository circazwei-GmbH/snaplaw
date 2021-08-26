import { UPLOAD_MEDIA, UploadMediaAction } from "./action-creators";
import { call, put, takeLatest } from "redux-saga/effects";
import { setMessage } from "../main/slice";
import { Translator } from "../../../translator/i18n";
import API from "../../../services/media/index";
import { mutateFileUploadsAction } from "../../../utils/mutate-actions";

function* uploadMedia({ payload }: UploadMediaAction) {
  try {
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
  }
}

function* mediaSaga() {
  yield takeLatest(UPLOAD_MEDIA, uploadMedia);
}

export default mediaSaga;
