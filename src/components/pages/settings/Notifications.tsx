import React from "react";
import TopBar from "../../layouts/TopBar";
import { useI18n } from "../../../translator/i18n";

export default function Notifications(): JSX.Element {
  const { t } = useI18n();

  return <TopBar pageName={t("notifications.title")}></TopBar>;
}
