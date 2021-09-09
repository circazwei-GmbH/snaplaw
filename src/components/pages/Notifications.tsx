import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import TopBar from "../layouts/TopBar";
import { useI18n } from "../../translator/i18n";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setModal } from "../../store/modules/main/slice";
import NotificationListItem from "../components/NotificationListItem";
import DefaultText from "../basics/typography/DefaultText";
import { notificationConfig } from "../../services/notification/index";

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

const notification: NotificationListInterface = {
  isNew: true,
  _id: `${Math.random() * 123456789}`,
  type: "user_invited_to_contract",
  contractName: "Prodam stariy IPhone",
  userNameFrom: "Vasiliy",
  notification:
    "Ochen mnogo kakoy to vsyakoy raznoy chepuhi ot Alekseya s beckenda fdfsghsdfghsfghsdfgh)))",
  createdAt: `${Date.now()}`,
};
const notification2: NotificationListInterface = {
  isNew: false,
  _id: `${Math.random() * 987654321}`,
  type: "invite_to_contract_rejected",
  contractName: "Prodam kalidor",
  userNameFrom: "Genadiy",
  notification: "Kakaya to chepuha ot Alekseya - 2",
  createdAt: `${Date.now()}`,
};

export default function Notifications(): JSX.Element {
  const { t } = useI18n();
  const list = [notification, notification2];
  const dispatch = useAppDispatch();

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

  const EmptyListComponent = () => (
    <View style={styles.emptyListBox}>
      <DefaultText
        text={t("notifications.empty_list")}
        style={styles.emptyListText}
      />
    </View>
  );

  return (
    <TopBar pageName={t("notifications.title")}>
      <FlatList
        style={styles.container}
        data={list}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NotificationListItem
            style={styles.itemHeight}
            item={item}
            onPress={modalHandler}
          />
        )}
        ListEmptyComponent={EmptyListComponent}
        onEndReached={() => {}}
        onEndReachedThreshold={0.0001}
        em
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
  emptyListBox: {
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.7,
    paddingHorizontal: 16,
  },
  emptyListText: {
    textAlign: "center",
  },
});
