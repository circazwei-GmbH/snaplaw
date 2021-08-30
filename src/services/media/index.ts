import httpClient from "../api";
import { MediaPayload } from "../../store/modules/media/action-creators";
const presigned = (folder: string) =>
  httpClient.get(`api/media?folder=${folder}`);

const uploadMedia = async (mediaUri: string, pathToUpload: string) => {
  return fetch(pathToUpload, {
    method: "PUT",
    headers: {
      "Content-Type": "application/octet-stream",
    },
    body: await (await fetch(mediaUri)).blob(),
  });
};

const mediaProcess = async ({ uri, folder }: MediaPayload) => {
  const response = await presigned(folder);
  await uploadMedia(uri, response.data);
  const fullUri = response.data.split("?")[0];
  return fullUri.split("/").slice(-2).join("/");
};

export default {
  mediaProcess,
};
