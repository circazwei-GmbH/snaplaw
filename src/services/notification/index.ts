import httpClient from "../api";
import { translateNotificationList } from "./translator";

const requestNotifications = async (page: string): Promise<any> => {
  const response = await httpClient.get(`api/notifications?page=${page}`);
  return translateNotificationList(response.data);
};

export default {
  requestNotifications,
};
