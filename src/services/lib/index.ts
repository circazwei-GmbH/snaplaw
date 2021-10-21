import httpClient from "../api";

const requestCarInformation = () =>
  httpClient.get(`api/lib/car-info`);

export default {
  requestCarInformation,
};
