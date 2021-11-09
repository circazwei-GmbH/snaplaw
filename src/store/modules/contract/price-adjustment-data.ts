import { CONTRACT_SCREEN_TYPES } from "./constants";
import { BaseScreenDataInterface } from "./base-types";
import { CURRENCY } from "./payment";

export const enum PRICE_ADJUSTMENT_FIELDS {
  DEPOSIT = "deposit",
  GRADUATED_LEASE = "graduatedLease",
  GRADUATED_LEASE_PRICE = "graduatedLeasePrice",
  GRADUATED_LEASE_CURRENCY = "graduatedLeaseCurrency",
  GRADUATED_LEASE_DATE = "graduatedLeaseDate",
}

export interface PriceAdjustmentScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PRICE_ADJUSTMENT;
  data: {
    [PRICE_ADJUSTMENT_FIELDS.DEPOSIT]: boolean;
    [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE]: boolean;
    [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_PRICE]: string;
    [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_CURRENCY]: CURRENCY;
    [PRICE_ADJUSTMENT_FIELDS.GRADUATED_LEASE_DATE]: string;
  };
}

