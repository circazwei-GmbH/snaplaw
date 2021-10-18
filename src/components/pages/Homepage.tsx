import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ContractTypeCard from "../components/ContractTypeCard";
import { useI18n } from "../../translator/i18n";
import TopBar from "../layouts/TopBar";
import NotificationBell from "../components/NotificationBell";
import TextField from "../components/TextField";
import { useAppDispatch } from "../../store/hooks";
import { requestCreateContract } from "../../store/modules/contract/action-creators";
import { CONTRACT_TYPES } from "../../store/modules/contract/constants";

export default function Homepage(): JSX.Element {
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  return (
    <TopBar pageName={t("homepage.tab_name")} leftButton={<NotificationBell />}>
      <>
        <View style={styles.container}>
          <TextField
            onChangeFunction={() => {}}
            placeholder={t("homepage.search")}
            search
          />
        </View>
        <ScrollView>
          <View style={styles.cardContainer}>
            <ContractTypeCard
              image={require("../../../assets/purchase_contract.png")}
              title={t("homepage.contract_types.purchase")}
              onPress={() =>
                dispatch(requestCreateContract(CONTRACT_TYPES.PURCHASE))
              }
            />
            <ContractTypeCard
              image={require("../../../assets/car_contract.png")}
              title={t("homepage.contract_types.car")}
              onPress={() =>
                dispatch(requestCreateContract(CONTRACT_TYPES.CAR))
              }
            />
            <ContractTypeCard
              image={require("../../../assets/work_contract.png")}
              title={t("homepage.contract_types.work")}
            />
            <ContractTypeCard
              image={require("../../../assets/free_contract.png")}
              title={t("homepage.contract_types.free")}
            />
            <ContractTypeCard
              image={require("../../../assets/rental_contract.png")}
              title={t("homepage.contract_types.rental")}
            />
          </View>
        </ScrollView>
      </>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
