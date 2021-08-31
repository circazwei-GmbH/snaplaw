import { MEDIA_HOST } from "../env/env";
import BaseApi from "../services/api";
import {Source} from "react-native-fast-image";

export const buildMediaPath = (src: string): string => {
  return `${MEDIA_HOST}/${src}`;
};

export const buildMediaSource = (uri: string): Source => {
  const token = BaseApi.getToken();
  return {
    uri: buildMediaPath(uri),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
