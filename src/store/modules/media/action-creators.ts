import {BaseAction} from "../auth/types";

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR'

export interface UploadAvatarAction extends BaseAction {
    payload: string;
}

export const uploadAvatar = (payload: string): UploadAvatarAction => ({
    type: UPLOAD_AVATAR,
    payload
})