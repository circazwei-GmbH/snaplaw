import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { NotificationListInterface } from "../pages/settings/Notifications";

interface NotificationListItemPropsInterface {
  item: NotificationListInterface;
  style: object;
}

export default function NotificationListItem({
  item,
  style,
}: NotificationListItemPropsInterface): JSX.Element {
  const [isNew, setIsNew] = useState(item.isNew);

  return (
    <TouchableOpacity style={style} activeOpacity={0.7}>
      <View style={styles.container}>
        {isNew ? (
          <View style={styles.pinkDotBox}>
            <View style={styles.pinkDot} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
});
