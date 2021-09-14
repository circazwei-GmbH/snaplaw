import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setModal } from "../../store/modules/main/slice";
import NotificationListItem from "../components/NotificationListItem";
import { notificationConfig } from "../../services/notification/notificationsConfig";
import AbstractList from "../components/lists/AbstractList";
import { requestNotifications } from "../../store/modules/notifications/action-creators";

export default function Notifications(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.notifications.notifications);

  const getNotifications = () => dispatch(requestNotifications());

  const modalHandler = (
    isNew: boolean,
    type: string,
    partner: string,
    contract: string
  ) => {
    const isActionNew =
      type === "user_invited_to_contract" && isNew ? "actionsNew" : "actions";

    dispatch(
      setModal({
        message: t(notificationConfig[type]["message"], { contract, partner }),
        actions: notificationConfig[type][isActionNew].map((item) => ({
          name: t(item.name),
          colortype: item.colortype,
        })),
      })
    );
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <TopBar pageName={t("notifications.title")}>
      <AbstractList
        messageOnEmpty={t("notifications.empty_list")}
        elements={list}
        listItem={({ item }) => (
          <NotificationListItem
            item={item}
            onPress={modalHandler}
            onEndReached={getNotifications}
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
    paddingVertical: 25,
  },
  item: {
    elevation: 2,
  },
});
