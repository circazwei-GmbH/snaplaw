import { BaseAction } from "../auth/types";
import { PayloadAction } from "@reduxjs/toolkit";

export const UPLOAD_MEDIA = "UPLOAD_MEDIA";

export type MediaPayload = {
  uri: string;
  folder: string;
  successAction: PayloadAction<string>;
};

export interface UploadMediaAction extends BaseAction {
  payload: MediaPayload;
}

export const uploadMedia = (
  uri: string,
  folder: string,
  successAction: PayloadAction<any>
): UploadMediaAction => ({
  type: UPLOAD_MEDIA,
  payload: {
    uri,
    folder,
    successAction,
  },
});
