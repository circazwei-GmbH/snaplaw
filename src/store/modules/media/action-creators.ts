import { BaseAction } from "../auth/types";
import { PayloadAction } from "@reduxjs/toolkit";
import { MEDIA_FOLDERS } from "./constants";

export const UPLOAD_MEDIA = "UPLOAD_MEDIA";

export type MediaPayload = {
  uri: string;
  folder: string;
  successAction: PayloadAction<unknown>;
  mutationPath?: string;
};

export interface UploadMediaAction extends BaseAction {
  payload: MediaPayload;
}

export const uploadMedia = (
  uri: string,
  folder: MEDIA_FOLDERS,
  successAction: PayloadAction<unknown>,
  mutationPath?: string
): UploadMediaAction => ({
  type: UPLOAD_MEDIA,
  payload: {
    uri,
    folder,
    successAction,
    mutationPath,
  },
});
