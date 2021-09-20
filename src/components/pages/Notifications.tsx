import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import NotificationListItem from "../components/lists/ListItems/NotificationListItem";
import AbstractList from "../components/lists/AbstractList";
import {
  requestNotifications,
  requestChangeNotificationStatus,
} from "../../store/modules/notifications/action-creators";
import {NotificationListItemInterface} from "../../store/modules/notifications/types";

export default function Notifications(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.notifications.notifications);

  const getNotifications = () => dispatch(requestNotifications());
  const changeStatus = (id: string) =>
    dispatch(requestChangeNotificationStatus({ id }));

  useEffect(() => {
    // TODO: remove on soket functionality created
    getNotifications();
  }, []);

  return (
    <TopBar pageName={t("notifications.title")}>
      <AbstractList
        messageOnEmpty={t("notifications.empty_list")}
        elements={list}
        onEndReached={getNotifications}
        listItem={({ item }: {item: NotificationListItemInterface}) => (
          <NotificationListItem
            item={item}
            changeStatus={changeStatus}
          />
        )}
        style={styles.container}
      />
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  item: {
    elevation: 2,
  },
});
