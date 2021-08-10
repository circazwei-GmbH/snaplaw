import {BaseAction} from "../auth/types";

export const UPLOAD_MEDIA = 'UPLOAD_MEDIA'

export type MediaPayload = {
    uri: string,
    folder: string
}

export interface UploadMediaAction extends BaseAction {
    payload: MediaPayload;
}

export const uploadMedia = (uri: string, folder: string): UploadMediaAction => ({
    type: UPLOAD_MEDIA,
    payload: {
        uri,
        folder
    }
})