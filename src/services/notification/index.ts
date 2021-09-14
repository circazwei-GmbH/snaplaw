import httpClient from "../api";

const requestNotifications = async (page: string): Promise<any> => {
  const response = await httpClient.get(`api/notifications?page=${page ?? 0}`);
  return response.data;
};

export default {
  requestNotifications,
};
