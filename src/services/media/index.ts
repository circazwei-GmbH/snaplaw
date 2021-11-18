import httpClient from "../api";
import { MediaPayload } from "../../store/modules/media/action-creators";
// @ts-ignore
import { lookup } from "react-native-mime-types";

export enum MEDIA_TYPE {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export type MediaType = {
  uri: string;
  type?: MEDIA_TYPE;
};

export type MediaProcessFunction = (option: MediaPayload) => Promise<MediaType>;

const defineType = (type: string): MEDIA_TYPE | undefined => {
  switch (type) {
    case "image":
      return MEDIA_TYPE.IMAGE;
    case "video":
      return MEDIA_TYPE.VIDEO;
    default:
      return undefined;
  }
};

const presigned = (folder: string) =>
  httpClient.get(`api/media?folder=${folder}`);

const uploadMedia = async (
  mediaUri: string,
  pathToUpload: string,
  fileType: string
) => {
  return fetch(pathToUpload, {
    method: "PUT",
    headers: {
      "Content-Type": fileType,
    },
    body: await (await fetch(mediaUri)).blob(),
  });
};

const mediaProcess: MediaProcessFunction = async ({
  uri,
  folder,
}: MediaPayload): Promise<MediaType> => {
  const response = await presigned(folder);
  const fileType = lookup(uri);
  await uploadMedia(uri, response.data, fileType);
  const fullUri = response.data.split("?")[0];
  const type = fileType.split("/").shift();
  return {
    uri: fullUri.split("/").slice(-2).join("/"),
    type: defineType(type),
  };
};

export default {
  mediaProcess,
};
