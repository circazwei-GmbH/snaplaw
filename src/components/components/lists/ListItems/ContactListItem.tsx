import React, {useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ListItemProps} from "./list-item-type";
import {Entypo} from "@expo/vector-icons";
import Menu, {ButtonType} from "../../../features/Modals/Menu";
import {useI18n} from "../../../../translator/i18n";
import dayjs from "dayjs";
import {useAppDispatch} from "../../../../store/hooks";
import {navigate} from "../../../../store/modules/main/action-creators";
import {ROUTER_TABS} from "../../../../router/TabRouterTypes";
import {HOME_ROUTER} from "../../../../router/HomeRouterType";
import {requestDeleteContract} from "../../../../store/modules/contract/action-creators";
import {setModal} from "../../../../store/modules/main/slice";
import {BUTTON_COLORTYPE} from "../../../../store/modules/main/types";
import {useNavigation} from "@react-navigation/native";
import {MY_CONTRACT_ROUTE} from "../../../../router/MyContractRouterTypes";
import {CONTRACT_ROLE} from "../../../../store/modules/contract/types";

export default function ContractListItem({ item }: ListItemProps) {
  const [inProgressMenuVisible, setInProgressMenuVisible] =
    useState<boolean>(false);
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const navigator = useNavigation();
  const isContractorIncludeAndIOwner = () => !!item.partnerId && item.meRole === CONTRACT_ROLE.OWNER;
  const inProgressMenuButtons: Array<ButtonType> = [
    {
      title: t("my_contracts.actions.edit"),
      handler: () => {
        dispatch(
          navigate({
            [ROUTER_TABS.HOMEPAGE]: {},
            [HOME_ROUTER.CONTRACT]: { screenCount: 0, id: item.id },
          })
        );
        setInProgressMenuVisible(false);
      },
    },
    {
      title: t("my_contracts.actions.delete"),
      handler: () => {
        setInProgressMenuVisible(false);
        dispatch(
          setModal({
            message: t("my_contracts.delete_modal.message"),
            actions: [
              {
                name: t("my_contracts.delete_modal.no"),
                colortype: BUTTON_COLORTYPE.ERROR,
              },
              {
                name: t("my_contracts.delete_modal.yes"),
                action: requestDeleteContract(item.id),
              },
            ],
          })
        );
      },
    },
  ];
  if (isContractorIncludeAndIOwner()) {
    inProgressMenuButtons.push({
      title: t("my_contracts.actions.see_partner"),
      handler: () => {},
    });
    inProgressMenuButtons.push({
      title: t("my_contracts.actions.delete_partner"),
      handler: () => {},
    });
  } else {
    inProgressMenuButtons.push({
      title: t("my_contracts.actions.invite_partner"),
      handler: () => {
        setInProgressMenuVisible(false);
        navigator.navigate(MY_CONTRACT_ROUTE.INVITE, {contractId: item.id})
      },
    });
  }
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.type}>{t(`contracts.${item.type}.title`)}</Text>
          <Text style={styles.date}>
            {dayjs(item.createdAt).format("DD/MM/YYYY")}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setInProgressMenuVisible(true)}>
          <View style={styles.action}>
            <Entypo name="dots-three-vertical" size={16} color="#668395" />
          </View>
        </TouchableOpacity>
      </View>
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
