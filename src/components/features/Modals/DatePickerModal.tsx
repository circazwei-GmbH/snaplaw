import React from "react";
import DatePicker from "react-native-date-picker";
import { useI18n } from "../../../translator/i18n";

interface DatePickerModalInterface {
  open: boolean;
  modalHandler: React.Dispatch<React.SetStateAction<boolean>>;
  changeDate: Function;
}

export default function DatePickerModal({
  open,
  modalHandler,
  changeDate,
}: DatePickerModalInterface): JSX.Element {
  const { t } = useI18n();

  return (
    <DatePicker
      modal
      open={open}
      date={new Date()}
      onDateChange={() => {}}
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
