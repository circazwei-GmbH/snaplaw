import React from "react";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";
import UserDataForm from "../../features/forms/contract/UserDataForm";

export default function Notifications(): JSX.Element {
  const { t } = useI18n();

  return (
    <TopBar pageName={t("notifications.title")}>
      <UserDataForm />
    </TopBar>
  );
}
