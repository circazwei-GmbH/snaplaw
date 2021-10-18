import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItemProps } from "./list-item-type";
import { Entypo } from "@expo/vector-icons";
import Menu, { ButtonType } from "../../../features/Modals/Menu";
import { useI18n } from "../../../../translator/i18n";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ContractDataListType } from "../../../../store/modules/contract/types";
import { getListItemAction } from "../../../../services/contract/actions-config";
import ContractView from "../../../features/Modals/ContractView";
import { setPdfViewOnListContract } from "../../../../store/modules/contract/slice";

export default function ContractListItem({
  item,
}: ListItemProps<ContractDataListType>) {
  const [inProgressMenuVisible, setInProgressMenuVisible] =
    useState<boolean>(false);
  const { t } = useI18n();
  const currentContractForPdf = useAppSelector(
    (state) => state.contract.pdfViewOnListContract
  );
  const dispatch = useAppDispatch();
  const inProgressMenuButtons: Array<ButtonType> = getListItemAction(item).map(
    ({ action }) => ({
      title: t(action.title),
      handler: () => {
        setInProgressMenuVisible(false);
        dispatch(action.handler(item, t));
      },
    })
  );  

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.type}>{t(`contracts.${item.type}.title`)}</Text>
          <Text style={styles.date}>
            {dayjs(item.finalizedAt ?? item.createdAt).format("DD/MM/YYYY")}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setInProgressMenuVisible(true)}>
          <View style={styles.action}>
            <Entypo name="dots-three-vertical" size={16} color="#668395" />
          </View>
        </TouchableOpacity>
      </View>
      <ContractView
        visible={currentContractForPdf?.id === item.id}
        onClose={() => dispatch(setPdfViewOnListContract(undefined))}
        contractId={item.id}
        screens={currentContractForPdf?.screens}
        viewerRole={item.meRole}
      />
      <Menu
        visible={inProgressMenuVisible}
        onClose={() => setInProgressMenuVisible(false)}
        buttons={inProgressMenuButtons}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: "#F8FCFF",
    elevation: 1,
    shadowColor: "rgba(196, 211, 220, 0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  title: {
    fontFamily: "P",
    fontSize: 17,
    color: "#202020",
  },
  type: {
    fontFamily: "P",
    paddingTop: 3,
    fontSize: 12,
    color: "#202020",
  },
  date: {
    fontFamily: "P",
    fontSize: 11,
    color: "#909090",
  },
  action: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 40,
    width: 40,
  },
});
