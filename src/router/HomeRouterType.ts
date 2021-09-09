export enum HOME_ROUTER {
  HOMEPAGE = "Homepage",
  CONTRACT = "Contract",
}

export type ContractNavigationProps = {
  screenCount: number;
  id: undefined | string;
};

export type HomeStackParamList = {
  [HOME_ROUTER.HOMEPAGE]: undefined;
  [HOME_ROUTER.CONTRACT]: ContractNavigationProps;
};
