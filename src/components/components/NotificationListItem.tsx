import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NotificationListInterface } from "../pages/settings/Notifications";
import DefaultText from "../basics/typography/DefaultText";
import dayjs from "dayjs";

interface NotificationListItemPropsInterface {
  item: NotificationListInterface;
  style: object;
}

export default function NotificationListItem({
  item,
  style,
}: NotificationListItemPropsInterface): JSX.Element {
  const { isNew, notification, createdAt, userIdFrom } = item;
  const isToday = require("dayjs/plugin/isToday");
  dayjs.extend(isToday);

  return (
    <TouchableOpacity style={style} activeOpacity={0.7}>
      <View style={styles.container}>
        {isNew ? (
          <View style={styles.pinkDotBox}>
            <View style={styles.pinkDot} />
          </View>
        ) : null}
        <View style={styles.notificationBox}>
          <View style={styles.notificationHeader}>
            <DefaultText text={userIdFrom} />
            <DefaultText
              text={dayjs(createdAt).format(
                dayjs().isToday(createdAt) ? "HH:MM" : "DD MMM"
              )}
              style={styles.notificationDate}
            />
          </View>
          <View style={styles.notificationBody}>
            <DefaultText text={notification} style={styles.notificationText} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "#EDF8FE",
    elevation: 1,
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
    height: "30%",
    marginTop: 6,
  },
  notificationBody: {
    height: "55%",
    marginBottom: 5,
    overflow: "hidden",
  },
  notificationDate: {
    color: "#909090",
    fontSize: 11,
  },
  notificationText: {
    fontSize: 14,
  },
});
