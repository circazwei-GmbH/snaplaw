export interface ProfileRouterConst {
    MY_PROFILE: 'MyProfile',
    CHANGE_LANGUAGE: 'ChangeLanguage',
    EDIT_PROFILE: 'EditProfile'
}

export const PROFILE_ROUTER: ProfileRouterConst = {
    MY_PROFILE: 'MyProfile',
    CHANGE_LANGUAGE: 'ChangeLanguage',
    EDIT_PROFILE: 'EditProfile'
}

export type ProfileStackParamList = {
    [PROFILE_ROUTER.MY_PROFILE]: undefined,
    [PROFILE_ROUTER.CHANGE_LANGUAGE]: undefined
    [PROFILE_ROUTER.EDIT_PROFILE]: undefined
}