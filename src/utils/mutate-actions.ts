import { PayloadAction } from "@reduxjs/toolkit";

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
    payload: {
      ...action.payload,
      [mutationPath]: [
        ...action.payload[mutationPath],
        { url: uri, id: Date.now() + action.payload[mutationPath].length },
      ],
    },
  };
};
