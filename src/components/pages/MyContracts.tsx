import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import TopBar from "../layouts/TopBar";
import NotificationBell from "../components/NotificationBell";
import { useI18n } from "../../translator/i18n";
import { Octicons } from "@expo/vector-icons";
import TextSwitch, {
  TEXT_SWITCH_POSITION,
} from "../basics/switches/TextSwitch";
import AbstractList from "../components/lists/AbstractList";
import ContractListItem from "../components/lists/ListItems/ContactListItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { requestContractsList } from "../../store/modules/contract/action-creators";

enum LIST_STATE {
  FINALIZED = "FINALIZED",
  IN_PROGRESS = "IN_PROGRESS",
}

export default function MyContracts() {
  const { t } = useI18n();
  const [switchState, setSwitchState] = useState<LIST_STATE>(
    LIST_STATE.FINALIZED
  );
  const contracts = useAppSelector((state) => state.contract.contracts);
  const isLoading = useAppSelector((state) => state.contract.isListLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestContractsList());
  }, [dispatch, requestContractsList]);

  const listTypeChangeHandler = (state: TEXT_SWITCH_POSITION) => {
    setSwitchState(
      state === TEXT_SWITCH_POSITION.LEFT
        ? LIST_STATE.FINALIZED
        : LIST_STATE.IN_PROGRESS
    );
    dispatch(requestContractsList());
  };
  return (
    <TopBar
      leftButton={<NotificationBell />}
      pageName={t("my_contracts.tab_name")}
      rightButton={
        <Octicons
          style={styles.settings}
          name="settings"
          size={24}
          color="#668395"
        />
      }
      bottomElement={
        <TextSwitch
          left={t("my_contracts.lists.finalized")}
          right={t("my_contracts.lists.in_progress")}
          currentPosition={
            switchState === LIST_STATE.FINALIZED
              ? TEXT_SWITCH_POSITION.LEFT
              : TEXT_SWITCH_POSITION.RIGHT
          }
          onChange={listTypeChangeHandler}
        />
      }
      withBackbround
    >
      <AbstractList
        messageOnEmpty={t("my_contracts.empty_list")}
        elements={contracts}
        listItem={ContractListItem}
        isLoading={isLoading}
      />
    </TopBar>
  );
}

const styles = StyleSheet.create({
  test: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 30,
  },
  settings: {
    marginRight: 16,
  },
});
