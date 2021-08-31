export enum HOME_ROUTER {
  HOMEPAGE = "Homepage",
  CONTRACT = "Contract",
  INVITE = "Invite",
}

export type ContractNavigationProps = {
  screenCount: number;
};

export type HomeStackParamList = {
  [HOME_ROUTER.HOMEPAGE]: undefined;
  [HOME_ROUTER.CONTRACT]: ContractNavigationProps;
  [HOME_ROUTER.INVITE]: undefined;
};
