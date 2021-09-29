import httpClient from "../api";
import { MediaPayload } from "../../store/modules/media/action-creators";
// @ts-ignore
import {lookup} from "react-native-mime-types"

export enum MEDIA_TYPE {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO"
}

export type MediaProcessType = {
  uri: string,
  type: MEDIA_TYPE | undefined
}

export type MediaProcessFunction = (option: MediaPayload) => Promise<MediaProcessType>

const defineType = (type: string): MEDIA_TYPE | undefined => {
  switch (type) {
    case "image":
      return MEDIA_TYPE.IMAGE;
    case "video":
      return MEDIA_TYPE.VIDEO;
    default:
      return undefined
  }
}

const presigned = (folder: string) =>
  httpClient.get(`api/media?folder=${folder}`);

const uploadMedia = async (mediaUri: string, pathToUpload: string) => {
  return fetch(pathToUpload, {
    method: "PUT",
    headers: {
      "Content-Type": lookup(mediaUri),
    },
    body: await (await fetch(mediaUri)).blob(),
  });
};

const mediaProcess: MediaProcessFunction = async ({ uri, folder }: MediaPayload): Promise<MediaProcessType> => {
  const response = await presigned(folder);
  await uploadMedia(uri, response.data);
  const fullUri = response.data.split("?")[0];
  const fileType = lookup(uri)
  const type = fileType.split("/").shift()
  return {uri: fullUri.split("/").slice(-2).join("/"), type: defineType(type)};
};

export default {
  mediaProcess,
};
