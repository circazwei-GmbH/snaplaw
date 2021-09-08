import React, {useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListItemProps } from "./list-item-type";
import { Entypo } from "@expo/vector-icons";
import Menu, {ButtonType} from "../../../features/Modals/Menu";
import {useI18n} from "../../../../translator/i18n";
import dayjs from "dayjs";
import {useAppDispatch} from "../../../../store/hooks";
import {navigate} from "../../../../store/modules/main/action-creators";
import {ROUTER_TABS} from "../../../../router/TabRouterTypes";
import {HOME_ROUTER} from "../../../../router/HomeRouterType";

export default function ContractListItem({ item }: ListItemProps) {
  const [inProgressMenuVisible, setInProgressMenuVisible] = useState<boolean>(false)
  const { t } = useI18n()
  const dispatch = useAppDispatch();
  const isContractorInclude = () => !!item.contractor
  const inProgressMenuButtons: Array<ButtonType> = [
    {
      title: t('my_contracts.actions.edit'),
      handler: () => {
        dispatch(navigate({
          [ROUTER_TABS.HOMEPAGE]: {},
          [HOME_ROUTER.CONTRACT]: { screenCount: 0, id: item.id }
        }))
        setInProgressMenuVisible(false)
      }
    },
    {
      title: t('my_contracts.actions.delete'),
      handler: () => {}
    }
  ]
  if (isContractorInclude()) {
    inProgressMenuButtons.push({
      title: t('my_contracts.actions.see_partner'),
      handler: () => {}
    })
    inProgressMenuButtons.push({
      title: t('my_contracts.actions.delete_partner'),
      handler: () => {}
    })
  } else {
    inProgressMenuButtons.push({
      title: t('my_contracts.actions.invite_partner'),
      handler: () => {}
    })
  }
  return (
  <>
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.type}>{t(`contracts.${item.type}.title`)}</Text>
        <Text style={styles.date}>{ dayjs(item.createdAt).format('DD/MM/YYYY') }</Text>
      </View>
      <TouchableOpacity onPress={() => setInProgressMenuVisible(true)}>
        <Entypo name="dots-three-vertical" size={16} color="#668395" />
      </TouchableOpacity>
    </View>
    <Menu visible={inProgressMenuVisible} onClose={() => setInProgressMenuVisible(false)} buttons={inProgressMenuButtons} />
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
});
