import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { NotificationInterface } from "./types";

interface NotificationsState {
  notifications: NotificationInterface[];
  notificationsPagination: {
    page: number;
    isNextPage: boolean;
  };
}

const initialState: NotificationsState = {
  notifications: [],
  notificationsPagination: {
    page: 0,
    isNextPage: true,
  },
};

const setNotificationsListAction = createAction<
  { list: NotificationInterface[]; page: string },
  "setNotifications"
>("setNotifications");

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    [setNotificationsListAction.type]: (
      state: Draft<NotificationsState>,
      action: PayloadAction<{
        list: NotificationInterface[];
        page: string;
      }>
    ) => {
      if (action.payload.list !== undefined) {
        state.notifications = [...state.notifications, ...action.payload.list];
      }
      state.notificationsPagination.page = +action.payload.page;
      state.notificationsPagination.isNextPage = !!action.payload.list.length;
    },
  },
});

export const { setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
