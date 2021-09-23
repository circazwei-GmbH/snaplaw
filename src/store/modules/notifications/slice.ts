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
    isLoading: boolean
  };
}

const initialState: NotificationsState = {
  notifications: [],
  notificationsPagination: {
    page: 0,
    isNextPage: true,
    isLoading: false
  },
};

const setNotificationsListAction = createAction<
  { list: NotificationInterface[]; page: string, isRefresh: boolean },
  "setNotifications"
>("setNotifications");

const changeNotificationStatusAction = createAction<
  { id: string },
  "changeNotificationStatus"
>("changeNotificationStatus");
const setNotificationsLoadingAction = createAction<boolean, "setNotificationsLoading">("setNotificationsLoading");

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    [setNotificationsListAction.type]: (
      state: Draft<NotificationsState>,
      action: PayloadAction<{
        list: NotificationListItemInterface[];
        page: string;
        isRefresh: boolean
      }>
    ) => {
      if (!action.payload.isRefresh) {
        state.notifications = [...state.notifications, ...action.payload.list];
      } else {
        state.notifications = action.payload.list;
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
    [setNotificationsLoadingAction.type]: (
      state: Draft<NotificationsState>,
      action: PayloadAction<boolean>
    ) => {
      state.notificationsPagination.isLoading = action.payload
    }
  },
});

export const { setNotifications, changeNotificationStatus, setNotificationsLoading } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
