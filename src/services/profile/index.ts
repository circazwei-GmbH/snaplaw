import httpClient from "../api";
import { getUserFromToken } from "../../utils";
import { UserType } from "../../store/modules/profile/slice";

const updateUserAvatar = (avatarPath: string | null) => {
  const token = httpClient.getToken();
  if (!token) {
    throw new Error("Trying to update user avatar with empty token");
  }
  const user = getUserFromToken(token);
  return httpClient.put(`api/users/${user._id}`, { avatar: avatarPath });
};

const editProfileSaveChange = (userData: UserType) => {
  const token = httpClient.getToken();
  if (!token) {
    throw new Error("Trying to update user data with empty token");
  }
  const user = getUserFromToken(token);
  return httpClient.put(`api/users/${user._id}`, userData);
};

export default {
  updateUserAvatar,
  requestMe,
  editProfileSaveChange,
};
