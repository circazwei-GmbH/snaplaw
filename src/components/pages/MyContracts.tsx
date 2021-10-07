import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import TopBar from "../layouts/TopBar";
import NotificationBell from "../components/NotificationBell";
import FiltersModal from "../features/Modals/FiltersModal";
import { useI18n } from "../../translator/i18n";
import FiltersButton from "../basics/buttons/FiltersButton";
import TextSwitch, {
  TEXT_SWITCH_POSITION,
} from "../basics/switches/TextSwitch";
import AbstractList from "../components/lists/AbstractList";
import ContractListItem from "../components/lists/ListItems/ContactListItem";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { requestContractsList } from "../../store/modules/contract/action-creators";
import {
  CONTRACT_LIST_STATE,
  ContractDataType,
} from "../../store/modules/contract/types";
import { CONTRACT_LIST_LOADING_TYPE, setContractsListFilters } from "../../store/modules/contract/slice";

export default function MyContracts() {
  const { t } = useI18n();
  const [switchState, setSwitchState] = useState<CONTRACT_LIST_STATE>(
    CONTRACT_LIST_STATE.FINALIZED
  );
  const [isFiltersModalVisible, setFiltersModalVisibility] = useState(false);
  const contracts = useAppSelector((state) => state.contract.contracts);
  const isLoadingAndLoadingType = useAppSelector(
    (state) => state.contract.isListLoading
  );
  const dispatch = useAppDispatch();
    
  useEffect(() => {
    dispatch(requestContractsList(switchState));
  }, [dispatch, requestContractsList]);

  const listTypeChangeHandler = (state: TEXT_SWITCH_POSITION) => {
    const nextState =
      state === TEXT_SWITCH_POSITION.LEFT
        ? CONTRACT_LIST_STATE.FINALIZED
        : CONTRACT_LIST_STATE.IN_PROGRESS;
    setSwitchState(nextState);
    dispatch(requestContractsList(nextState));
    dispatch(setContractsListFilters({
      types: [],
      date: "",
    }));
  };
  return (
    <>
    <TopBar
      leftButton={<NotificationBell />}
      pageName={t("my_contracts.tab_name")}
      rightButton={
        <FiltersButton onPress={() => setFiltersModalVisibility(true)}/>
      }
      bottomElement={
        <TextSwitch
          left={t("my_contracts.lists.finalized")}
          right={t("my_contracts.lists.in_progress")}
          currentPosition={
            switchState === CONTRACT_LIST_STATE.FINALIZED
              ? TEXT_SWITCH_POSITION.LEFT
              : TEXT_SWITCH_POSITION.RIGHT
          }
          onChange={listTypeChangeHandler}
        />
      }
      withBackground
    >
      <AbstractList
        messageOnEmpty={t("my_contracts.empty_list")}
        elements={contracts}
        listItem={({ item }: { item: ContractDataType }) => (
          <ContractListItem item={item} />
        )}
        isLoading={
          isLoadingAndLoadingType === CONTRACT_LIST_LOADING_TYPE.INITIAL
        }
        isRefreshing={
          isLoadingAndLoadingType === CONTRACT_LIST_LOADING_TYPE.REFRESH
        }
        onEndReached={() => dispatch(requestContractsList(switchState))}
        onRefresh={() => dispatch(requestContractsList(switchState, true))}
      />
    </TopBar>
    <FiltersModal 
      visible={isFiltersModalVisible} 
      onClose={() => setFiltersModalVisibility(false)}
      switchState={switchState}
    />
    </>
  );
}

const styles = StyleSheet.create({
  test: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 30,
  },
});
