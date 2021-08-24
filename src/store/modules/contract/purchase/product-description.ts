import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum PRODUCT_DESCRIPTION_FIELDS {
  description = "description",
  productPhotos = "productPhotos",
  hasAccessories = "hasAccessories",
  descriptionAccessories = "descriptionAccessories",
  accessoriesPhotos = "accessoriesPhotos",
}

export interface ProductDescriptionScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION;
  data: {
    [PRODUCT_DESCRIPTION_FIELDS.description]: string;
    [PRODUCT_DESCRIPTION_FIELDS.productPhotos]: string[];
    [PRODUCT_DESCRIPTION_FIELDS.hasAccessories]: boolean;
    [PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories]: string;
    [PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos]: string[];
  };
}

export const PRODUCT_DESCRIPTION: Array<PRODUCT_DESCRIPTION_FIELDS> = [
  PRODUCT_DESCRIPTION_FIELDS.description,
  PRODUCT_DESCRIPTION_FIELDS.productPhotos,
  PRODUCT_DESCRIPTION_FIELDS.hasAccessories,
  PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories,
  PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos,
];
