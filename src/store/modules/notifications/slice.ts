import {
  createAction,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";

interface notificationInterface {
  _id: string;
  type: string;
  contractorId: string;
  usernameFrom: string;
  createdAt: string;
  isNew: boolean;
  userId: string;
}

interface NotificationsState {
  notifications: notificationInterface[];
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
  { list: notificationInterface[]; page: string },
  "setNotifications"
>("setNotifications");

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    [setNotificationsListAction.type]: (
      state: Draft<NotificationsState>,
      action: PayloadAction<{
        list: notificationInterface[];
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
