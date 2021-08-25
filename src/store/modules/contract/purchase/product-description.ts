import { CONTRACT_SCREEN_TYPES } from "../constants";
import { BaseScreenDataInterface } from "../base-types";

export const enum PRODUCT_DESCRIPTION_FIELDS {
  description = "description",
  productPhotos = "productPhotos",
  hasAccessories = "hasAccessories",
  descriptionAccessories = "descriptionAccessories",
  accessoriesPhotos = "accessoriesPhotos",
}

export interface DescriptionPhotoInterface {
  url: string;
  id: string;
  isLoading: boolean;
}

export interface ProductDescriptionScreenInterface
  extends BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION;
  data: {
    [PRODUCT_DESCRIPTION_FIELDS.description]: string;
    [PRODUCT_DESCRIPTION_FIELDS.productPhotos]: DescriptionPhotoInterface;
    [PRODUCT_DESCRIPTION_FIELDS.hasAccessories]: boolean;
    [PRODUCT_DESCRIPTION_FIELDS.descriptionAccessories]: string;
    [PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos]: DescriptionPhotoInterface;
  };
}
