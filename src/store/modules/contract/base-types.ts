import { CONTRACT_SCREEN_TYPES } from "./constants";

export interface BaseScreenDataInterface {
  type: CONTRACT_SCREEN_TYPES;
  data: unknown;
}
