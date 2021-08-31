import { PayloadAction } from "@reduxjs/toolkit";

const recursionWalk = (payload: any, key: string, targetUrl: string) => {
  const splitedPath = key.split(".");
  const [currentKey] = splitedPath.splice(0, 1);
  if (String(Number(currentKey)) !== "NaN") {
    if (splitedPath.length === 0) {
      payload[currentKey] = targetUrl;
      return payload;
    }
    const mutatablePayload = payload;
    mutatablePayload[currentKey] = recursionWalk(
      mutatablePayload[currentKey],
      splitedPath.join("."),
      targetUrl
    );
    return mutatablePayload;
  }
  if (splitedPath.length === 0) {
    return {
      ...payload,
      [currentKey]: targetUrl,
    };
  }
  return {
    ...payload,
    [currentKey]: recursionWalk(
      payload[currentKey],
      splitedPath.join("."),
      targetUrl
    ),
  };
};

export const mutateFileUploadsAction = (
  action: PayloadAction<any>,
  uri: string,
  mutationPath?: string
): PayloadAction<string> => {
  if (!mutationPath) {
    return {
      ...action,
      payload: uri,
    };
  }
  return {
    ...action,
    payload: recursionWalk(action.payload, mutationPath, uri),
  };
};
