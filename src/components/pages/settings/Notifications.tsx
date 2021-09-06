import React from "react";
import { FlatList, StyleSheet } from "react-native";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import NotificationListItem from "../../components/NotificationListItem";

export interface NotificationListInterface {
  isNew: boolean;
  _id: string;
  type: string;
  userIdTo: string;
  userIdFrom: string;
  notification: string;
  createdAt: string;
  locale: string;
}

const LIST_ITEM_HEIGHT = 77;

const notification: NotificationListInterface = {
  isNew: true,
  _id: `${Math.random() * 123456789}`,
  type: "user_invited_to_contract",
  userIdTo: "610919f420584a9d1b635dc5",
  userIdFrom: "610919f420584a9d1b635dc5",
  notification:
    "Ochen mnogo kakoy to vsyakoy raznoy chepuhi ot Alekseya s beckenda fdfsghsdfghsfghsdfgh)))",
  createdAt: `${Date.now()}`,
  locale: "en",
};
const notification2: NotificationListInterface = {
  isNew: false,
  _id: `${Math.random() * 987654321}`,
  type: "user_invited_to_contract",
  userIdTo: "610919f420584a9d1b635dc5",
  userIdFrom: "610919f420584a9d1b635dc5",
  notification: "Kakaya to chepuha ot Alekseya - 2",
  createdAt: `${Date.now()}`,
  locale: "en",
};

export default function Notifications(): JSX.Element {
  const { t } = useI18n();
  const list = [notification, notification2];

  return (
    <TopBar pageName={t("notifications.title")}>
      <FlatList
        style={styles.container}
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NotificationListItem style={styles.itemHeight} item={item} />
        )}
        onEndReached={() => {}}
        onEndReachedThreshold={0.0001}
        getItemLayout={(data, index) => ({
          length: LIST_ITEM_HEIGHT,
          offset: LIST_ITEM_HEIGHT * index,
          index,
        })}
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
  itemHeight: {
    height: LIST_ITEM_HEIGHT,
  },
});
