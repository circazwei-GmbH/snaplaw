import React, { useState, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { NotificationListInterface } from "../pages/Notifications";
import DefaultText from "../basics/typography/DefaultText";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { AntDesign } from "@expo/vector-icons";

interface NotificationListItemPropsInterface {
  item: NotificationListInterface;
  style: { height: number };
  onPress: Function;
}

export default function NotificationListItem({
  item,
  style,
  onPress,
}: NotificationListItemPropsInterface): JSX.Element {
  const { isNew, notification, createdAt, userNameFrom, type, contractName } =
    item;
  const swipeable: any = useRef();
  const isToday = require("dayjs/plugin/isToday");
  dayjs.extend(isToday);
  const [isRead, setIsRead] = useState(isNew);

  const onClose = () => {
    setIsRead(false);
    swipeable.current.close();
  };

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
          <DefaultText text={"Read"} style={styles.rightSwipeText} />
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
        style={style}
        activeOpacity={1}
        onPress={() => onPress(isRead, type, userNameFrom, contractName)}
      >
        <View
          style={[
            styles.container,
            isRead ? styles.containerBackgroundNew : styles.containerBackground,
          ]}
        >
          {isRead ? (
            <View style={styles.pinkDotBox}>
              <View style={styles.pinkDot} />
            </View>
          ) : null}
          <View style={styles.notificationBox}>
            <View style={styles.notificationHeader}>
              <DefaultText
                text={userNameFrom}
                style={isRead ? null : styles.fontColorNotNew}
              />
              <DefaultText
                text={dayjs(createdAt).format(
                  dayjs().isToday(createdAt) ? "HH:MM" : "DD MMM"
                )}
                style={styles.notificationDate}
              />
            </View>
            <View style={styles.notificationBody}>
              <DefaultText
                text={notification}
                style={[
                  styles.notificationText,
                  isRead ? null : styles.fontColorNotNew,
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
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 70,
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
  fontColorNotNew: {
    color: "#909090",
  },
  rightSwipe: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 70,
    paddingTop: 10,
    backgroundColor: "#1696E2",
  },
  rightSwipeText: {
    fontSize: 14,
    color: "#fff",
  },
});
