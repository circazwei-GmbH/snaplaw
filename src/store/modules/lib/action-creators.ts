import { RequestCarInformationAction } from "./types";

export const REQUEST_CAR_INFORMATION = "REQUEST_CAR_INFORMATION";

export const requestCarInformation = (
  contractId: string
): RequestCarInformationAction => ({
  type: REQUEST_CAR_INFORMATION,
  payload: contractId,
});
