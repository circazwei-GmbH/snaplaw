import httpClient from "../api";
import { translateNotificationList } from "./translator";

const requestNotifications = async (page: string): Promise<unknown> => {
  const response = await httpClient.get(`api/notifications?page=${page}`);
  return translateNotificationList(response.data);
};

const requestChangeStatus = async (id: string): Promise<unknown> => {
  const response = await httpClient.patch(`api/notifications/${id}/read`, {});
  return response.status;
};

export default {
  requestNotifications,
  requestChangeStatus,
};
