import React, { useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import VerticalDivider from "../dividers/VerticalDivieder";
import DefaultText from "../typography/DefaultText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DatePickerModalCustom from "../../features/Modals/DatePickerModalCustom";
import dayjs from "dayjs";

type CalendarInputProps = {
  style?: StyleProp<TextStyle>;
  date: string;
  dateHandler: (date: string) => void;
  placeholder?: string;
  errorMessage?: string;
};

export default function CalendarInput({
  style,
  date,
  dateHandler,
  placeholder = "",
  errorMessage,
}: CalendarInputProps) {
  const [datePickerOpened, setDatePickerOpened] = useState(false);

  const onConfirmDate = (date: string) => {
    dateHandler(date);
    setDatePickerOpened(false);
  };

  return (
    <>
      <View
        style={[styles.container, style, errorMessage ? styles.error : null]}
      >
        <View style={styles.signContainer}>
          {dayjs(date).isValid() ? (
            <DefaultText
              text={dayjs(date).format("DD.MM.YYYY")}
              testID="CalendarInputDate"
            />
          ) : (
            <Text testID="CalendarInputDate" style={styles.placeholder}>{placeholder}</Text>
          )}
        </View>
        <View style={styles.rightPart}>
          <View style={styles.dividerContainer}>
            <VerticalDivider />
          </View>
          <Pressable
            onPress={() => setDatePickerOpened(true)}
            style={styles.iconContainer}
            testID="DataPickerPressabelAreaID"
          >
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={22}
              color="#668395"
            />
          </Pressable>
        </View>
        <DatePickerModalCustom
          onConfirmDate={onConfirmDate}
          onCancelDate={() => setDatePickerOpened(false)}
          datePickerOpened={datePickerOpened}
          setDatePickerOpened={setDatePickerOpened}
          setedDate={date}
        />
      </View>
      <Text
        style={[styles.errorText, errorMessage ? null : styles.displayNone]}
      >
        {errorMessage}
      </Text>
    </>
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
  placeholder: {
    color: "#909090",
    fontSize: 15,
    width: "100%",
    paddingLeft: 16,
  },
  error: {
    borderWidth: 1,
    borderColor: "#FA7171",
  },
  errorText: {
    paddingTop: 5,
    color: "#FA7171",
  },
  displayNone: {
    display: "none",
  },
});
