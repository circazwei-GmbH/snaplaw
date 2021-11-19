import React, { useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";
import { NotificationListItemInterface } from "../../../../store/modules/notifications/types";
import {
  NOTIFICATION_TYPE,
  notificationConfig,
} from "../../../../services/notification/notificationsConfig";
import { useI18n } from "../../../../translator/i18n";
import { setModal } from "../../../../store/modules/main/slice";
import { useAppDispatch } from "../../../../store/hooks";
import { requestChangeNotificationStatus } from "../../../../store/modules/notifications/action-creators";

interface NotificationListItemPropsInterface {
  item: NotificationListItemInterface;
  changeStatus: Function;
}

export default function NotificationListItem({
  item,
  changeStatus,
}: NotificationListItemPropsInterface): JSX.Element {
  const { id, type, contractName, usernameFrom, createdAt, isNew, contractId } =
    item;
  const { t } = useI18n();
  const swipeable: any = useRef();
  const dispatch = useAppDispatch();
  const isToday = require("dayjs/plugin/isToday");
  dayjs.extend(isToday);
  const onClose = () => {
    changeStatus(id);
    swipeable.current.close();
  };

  const modalHandler = (
    type: NOTIFICATION_TYPE,
    partner: string,
    contract: string
  ) => {
    dispatch(requestChangeNotificationStatus({ id }));
    dispatch(
      setModal({
        message: t(notificationConfig[type]["message"], { contract, partner }),
        actions: notificationConfig[type]["actions"].map((item) => ({
          name: t(item.name),
          colortype: item.colortype,
          action: item.actionHandler
            ? item.actionHandler(contractId)
            : undefined,
        })),
      })
    );
  };

  const showNotification = (partner: string, contract: string) =>
    t(notificationConfig[type]["message"], { contract, partner });

  const RightSwipeAction = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ): JSX.Element => {
    const transition = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [30, 60],
    });
    return (
      <Animated.View style={{ transform: [{ translateX: transition }] }}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.rightSwipe}
          activeOpacity={0.7}
        >
          <AntDesign name="checksquareo" size={24} color="#fff" />
          <DefaultText
            text={t("notifications.read_button")}
            style={styles.rightSwipeText}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      renderRightActions={RightSwipeAction}
      friction={1}
      overshootRight={false}
      ref={swipeable}
    >
      <TouchableOpacity
        testID="notificationItem.openModal"
        style={styles.container}
        activeOpacity={1}
        onPress={() => modalHandler(type, usernameFrom, contractName)}
      >
        <View
          style={[
            styles.notification,
            isNew ? styles.containerBackgroundNew : styles.containerBackground,
          ]}
        >
          {isNew ? (
            <View style={styles.pinkDotBox}>
              <View style={styles.pinkDot} />
            </View>
          ) : null}
          <View style={styles.notificationBox}>
            <View style={styles.notificationHeader}>
              <DefaultText
                text={usernameFrom}
                style={isNew ? null : styles.fontColorNotNew}
              />
              <DefaultText
                text={dayjs(createdAt).format(
                  // @ts-ignore
                  dayjs(createdAt).isToday() ? "HH:mm" : "DD MMM"
                )}
                style={styles.notificationDate}
              />
            </View>
            <View style={styles.notificationBody}>
              <DefaultText
                text={showNotification(usernameFrom, contractName)}
                style={[
                  styles.notificationText,
                  isNew ? null : styles.fontColorNotNew,
                ]}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  notification: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 80,
    paddingHorizontal: 16,
    elevation: 1,
  },
  containerBackgroundNew: {
    backgroundColor: "#EDF8FE",
  },
  containerBackground: {
    backgroundColor: "#F8FCFF",
  },
  pinkDotBox: {
    justifyContent: "center",
    width: 30,
    height: "100%",
  },
  pinkDot: {
    width: 12,
    height: 12,
    backgroundColor: "#FF79CA",
    borderRadius: 15,
  },
  notificationBox: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  notificationBody: {
    overflow: "hidden",
  },
  notificationDate: {
    color: "#909090",
    fontSize: 11,
  },
  notificationText: {
    fontSize: 14,
  },
  fontColorNotNew: {
    color: "#909090",
  },
  rightSwipe: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    width: 100,
    height: 80,
    paddingTop: 10,
    backgroundColor: "#1696E2",
  },
  rightSwipeText: {
    fontSize: 14,
    color: "#fff",
  },
});
