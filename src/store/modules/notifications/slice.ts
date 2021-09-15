import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import { NotificationListItemInterface, NotificationInterface } from "./types";

interface NotificationsState {
  notifications: NotificationListItemInterface[];
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

const changeNotificationStatusAction = createAction<
  { id: string },
  "changeNotificationStatus"
>("changeNotificationStatus");

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    [setNotificationsListAction.type]: (
      state: Draft<NotificationsState>,
      action: PayloadAction<{
        list: NotificationListItemInterface[];
        page: string;
      }>
    ) => {
      if (action.payload.list !== undefined) {
        state.notifications = [...state.notifications, ...action.payload.list];
      }
      state.notificationsPagination.page = +action.payload.page;
      state.notificationsPagination.isNextPage = !!action.payload.list.length;
    },
    [changeNotificationStatusAction.type]: (
      state: Draft<NotificationsState>,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      for (let i = 0; i < state.notifications?.length - 1; i++) {
        if (state.notifications[i].id === action.payload.id) {
          state.notifications[i].isNew = false;
        }
      }
    },
  },
});

export const { setNotifications, changeNotificationStatus } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
