import React from "react";
import DatePicker from "react-native-date-picker";
import { useI18n } from "../../../translator/i18n";

interface DatePickerModalInterface {
  open: boolean;
  modalHandler: React.Dispatch<React.SetStateAction<boolean>>;
  changeDate?: Function;
  onDateChange?: React.Dispatch<React.SetStateAction<string>>;
  modal?: boolean;
  date?: Date;
}

export default function DatePickerModal({
  open,
  modalHandler,
  changeDate = () => {},
  onDateChange = () => {},
  modal = true,
  date = new Date(),
}: DatePickerModalInterface): JSX.Element | null {
  const { t } = useI18n();
  if (!open) {
    return null
  }

  return (
    <DatePicker
      modal={modal}
      open={open}
      date={date}
      onDateChange={(date) => onDateChange(`${date}`)}
      onConfirm={(newDate) => {
        modalHandler(false);
        changeDate(`${newDate}`, "dateOfBirth");
      }}
      onCancel={() => {
        modalHandler(false);
      }}
      androidVariant="iosClone"
      mode="date"
      title={t("edit_profile.placeholders.dateOfBirth")}
      confirmText={t("edit_profile.modals.save.confirm")}
      cancelText={t("edit_profile.modals.save.cancel")}
    />
  );
}
