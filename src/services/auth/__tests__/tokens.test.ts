import * as API from "../tokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  TOKEN_REFRESH_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
} from "../../../store/modules/auth/constants";
jest.mock("@react-native-async-storage/async-storage", () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {
    TOKEN_STORAGE_KEY,
  } = require("../../../store/modules/auth/constants");
  const token = "token";
  const refresh = "refresh";
  return {
    setItem: jest.fn(),
    getItem: jest.fn().mockImplementation((type) => {
      return type === TOKEN_STORAGE_KEY ? token : refresh;
    }),
    removeItem: jest.fn(),
  };
});
const TOEKN = "token";
const REFRESH = "refresh";
describe("Token service", () => {
  it("setAuthToken", async () => {
    await API.setAuthTokens(TOEKN, REFRESH);
    expect(AsyncStorage.setItem).toBeCalledWith(TOKEN_STORAGE_KEY, TOEKN);
    expect(AsyncStorage.setItem).toBeCalledWith(
      TOKEN_REFRESH_STORAGE_KEY,
      REFRESH
    );
  });
  it("getAuthTokens", async () => {
    const tokens = await API.getAuthTokens();
    expect(tokens).toEqual({
      token: "token",
      refresh: "refresh",
    });
  });
  it("clearAuthTokens", async () => {
    await API.clearAuthTokens();
    expect(AsyncStorage.removeItem).toBeCalledWith(TOKEN_STORAGE_KEY);
    expect(AsyncStorage.removeItem).toBeCalledWith(TOKEN_REFRESH_STORAGE_KEY);
  });
});
