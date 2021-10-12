import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";
import VerticalDivider from "../dividers/VerticalDivieder";
import DefaultText from "../typography/DefaultText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CalendarInputProps = {
  style?: StyleProp<TextStyle>;
  date: string;
  dateHandler: (event: GestureResponderEvent) => void;
};

export default function CalendarInput({
  style,
  date,
  dateHandler,
}: CalendarInputProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.signContainer}>
        <DefaultText text={date} testID="CalendarInputDate" />
      </View>
      <View style={styles.rightPart}>
        <View style={styles.dividerContainer}>
          <VerticalDivider />
        </View>
        <Pressable onPress={dateHandler} style={styles.iconContainer} testID="InvitePressabelAreaID">
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={22}
            color="#668395"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EFF7FD",
    height: 44,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 29,
  },
  dividerContainer: {
    paddingVertical: 7,
  },
  signContainer: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
