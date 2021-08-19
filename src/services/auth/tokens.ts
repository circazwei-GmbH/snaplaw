import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TOKEN_REFRESH_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from "../../store/modules/auth/constants";

export const setAuthTokens = async (token: string, refresh: string) => {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  await AsyncStorage.setItem(TOKEN_REFRESH_STORAGE_KEY, refresh);
};

export const getAuthTokens = async (): Promise<{
  token: string | null;
  refresh: string | null;
}> => {
  return {
    token: await AsyncStorage.getItem(TOKEN_STORAGE_KEY),
    refresh: await AsyncStorage.getItem(TOKEN_REFRESH_STORAGE_KEY),
  };
};

export const clearAuthTokens = async () => {
  await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  await AsyncStorage.removeItem(TOKEN_REFRESH_STORAGE_KEY);
};
