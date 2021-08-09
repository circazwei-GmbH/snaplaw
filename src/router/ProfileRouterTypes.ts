export interface ProfileRouterConst {
    MY_PROFILE: 'MyProfile',
    CHANGE_LANGUAGE: 'ChangeLanguage'
}

export const PROFILE_ROUTER: ProfileRouterConst = {
    MY_PROFILE: 'MyProfile',
    CHANGE_LANGUAGE: 'ChangeLanguage'
}

export type ProfileStackParamList = {
    [PROFILE_ROUTER.MY_PROFILE]: undefined,
    [PROFILE_ROUTER.CHANGE_LANGUAGE]: undefined
}