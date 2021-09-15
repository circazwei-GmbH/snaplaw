import { Base64 } from "./base64";

export const getUserFromToken = (
  token: string
): Record<string, string> | undefined => {
  try {
    return JSON.parse(Base64.atob(token.split(".")[1]));
  } catch (error) {
    return undefined;
  }
};
