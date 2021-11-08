import React, { useState } from "react";
import DatePickerModal from "./DatePickerModal";
import { useI18n } from "../../../translator/i18n";
import { Modal, Text, View, StyleSheet, TouchableOpacity } from "react-native";

interface DatePickerModalCustomInterface {
  datePickerOpened: boolean;
  setDatePickerOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onCancelDate: () => void;
  onConfirmDate: (date: string) => void;
  setedDate: string;
  testID?: string;
}

export default function DatePickerModalCustom({
  datePickerOpened,
  setDatePickerOpened,
  onCancelDate,
  onConfirmDate,
  setedDate,
  testID = "",
}: DatePickerModalCustomInterface): JSX.Element {
  const { t } = useI18n();
  const getTodayDate = (date: Date) => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0)
    return date
  }
  const [date, setDate] = useState(setedDate || `${getTodayDate(new Date())}`);

  return (
    <Modal visible={datePickerOpened} transparent={true} animationType="none">
      <View style={[styles.container, styles.datePickerContainerWrapper]}>
        <View style={styles.datePickerContainer}>
          <DatePickerModal
            date={date ? new Date(date) : new Date()}
            modal={false}
            open={datePickerOpened}
            modalHandler={setDatePickerOpened}
            onDateChange={setDate}
          />
          <View style={styles.dataPickerButtonsContainer}>
            <TouchableOpacity onPress={onCancelDate}>
              <View style={styles.dataPickerButton}>
                <Text style={styles.dataPickerButtonText}>
                  {t("menu.cancel")}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onConfirmDate(date)}
              testID={`ConfirmDate${testID}`}
            >
              <View style={styles.dataPickerButton}>
                <Text style={styles.dataPickerButtonText}>
                  {t("menu.confirm")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  datePickerContainerWrapper: {
    justifyContent: "center",
  },
  datePickerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
  dataPickerButtonsContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  dataPickerButton: {
    marginLeft: 20,
  },
  dataPickerButtonText: {
    fontSize: 16,
    textTransform: "uppercase",
  },
});
