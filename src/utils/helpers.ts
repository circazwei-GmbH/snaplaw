import { MEDIA_HOST } from "../env/env";
import BaseApi from "../services/api";
import { BaseScreenDataInterface } from "../store/modules/contract/base-types";
import { CONTRACT_SCREEN_TYPES } from "../store/modules/contract/constants";

type Source = {
  uri: string;
  headers: Record<string, string>;
};

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

export const findScreentByType = (
  screens: BaseScreenDataInterface[],
  type: CONTRACT_SCREEN_TYPES
): BaseScreenDataInterface | undefined => {
  const screen = screens.find((screen) => screen.type === type);
  return screen || undefined;
};
