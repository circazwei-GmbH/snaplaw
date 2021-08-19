import { UserType } from "../../store/modules/profile/slice";
import { UserDataScreenInterface } from "../../store/modules/contract/types";
import { CONTRACT_SCREEN_TYPES } from "../../store/modules/contract/constants";

export const prefillUserData = (user: UserType): UserDataScreenInterface => ({
  type: CONTRACT_SCREEN_TYPES.USER_DATA,
  data: {
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
    address: user.address || "",
    phone: user.phone || "",
    postCode: user.postCode || "",
    dateOfBirth: user.dateOfBirth || "",
  },
});
