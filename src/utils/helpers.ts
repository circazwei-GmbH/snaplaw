import { MEDIA_HOST } from "../env/env";
import BaseApi from "../services/api";
import { ImageURISource } from "react-native";

export const buildMediaPath = (src: string): string => {
  return `${MEDIA_HOST}/${src}`;
};

export const buildMediaSource = (uri: string): ImageURISource => {
  const token = BaseApi.getToken();
  console.log({
    uri: buildMediaPath(uri),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    uri: buildMediaPath(uri),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
