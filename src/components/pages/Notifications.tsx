import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setModal } from "../../store/modules/main/slice";
import NotificationListItem from "../components/NotificationListItem";
import DefaultText from "../basics/typography/DefaultText";
import { notificationConfig } from "../../services/notification/notificationsConfig";
import AbstractList from "../components/lists/AbstractList";

export interface NotificationListInterface {
  isNew: boolean;
  _id: string;
  type: string;
  contractName: string;
  userNameFrom: string;
  notification: string;
  createdAt: string;
}

const LIST_ITEM_HEIGHT = 77;

export default function Notifications(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.notifications.notifications);

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

  return (
    <TopBar pageName={t("notifications.title")}>
      <AbstractList
        messageOnEmpty={t("notifications.empty_list")}
        elements={list}
        listItem={({ item }) => (
          <NotificationListItem
            style={styles.itemHeight}
            item={item}
            onPress={modalHandler}
            onEndReached={() => {}}
          />
        )}
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
  emptyListBox: {
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.7,
    paddingHorizontal: 16,
  },
  emptyListText: {
    textAlign: "center",
  },
});

//<FlatList
//  style={styles.container}
//  data={list}
//  keyExtractor={(item) => item._id}
//  renderItem={({ item }) => (
//    <NotificationListItem
//      style={styles.itemHeight}
//      item={item}
//      onPress={modalHandler}
//    />
//  )}
//  ListEmptyComponent={EmptyListComponent}
//  onEndReached={() => {}}
//  onEndReachedThreshold={0.0001}
//  em
//  getItemLayout={(data, index) => ({
//    length: LIST_ITEM_HEIGHT,
//    offset: LIST_ITEM_HEIGHT * index,
//    index,
//  })}
///>
