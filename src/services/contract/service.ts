import { CONTRACT_ROLE } from "../../store/modules/contract/contract-roles";

export const detectContractRole = (
  partnerId: string,
  ownerId: string,
  myId: string | undefined
): CONTRACT_ROLE => {
  if (ownerId === myId) {
    return CONTRACT_ROLE.OWNER;
  }
  return CONTRACT_ROLE.PARTNER;
};
