import { PayloadAction } from "@reduxjs/toolkit";

export const mutateFileUploadsAction = (
  action: PayloadAction<string>,
  uri: string
): PayloadAction<string> => {
  return {
    ...action,
    payload: uri,
  };
};
