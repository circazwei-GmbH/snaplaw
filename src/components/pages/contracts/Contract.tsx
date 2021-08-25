import React from "react";
import TopBar from "../../layouts/TopBar";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ContractNavigationProps,
  HOME_ROUTER,
} from "../../../router/HomeRouterType";
import { contractScreensConfig } from "../../../store/modules/contract/contract-screens-types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useI18n } from "../../../translator/i18n";
import ContractNextButton from "../../basics/buttons/ContractNextButton";
import ContractBackButton from "../../basics/buttons/ContractBackButton";
import ContractScreenCounter from "../../basics/ContractScreenCounter";
import ContractFormTitle from "../../basics/typography/ContractFormTitle";
import { requestScreenData } from "../../../store/modules/contract/action-creators";
import TextButton from "../../basics/buttons/TextButton";
import { navigationPopToTop } from "../../../store/modules/main/action-creators";
import { setModal } from "../../../store/modules/main/slice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type ContractProps = {
  route: {
    params: ContractNavigationProps;
  };
};

export default function Contract({
  route: {
    params: { screenCount },
  },
}: ContractProps) {
  const navigation = useNavigation();
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const { t } = useI18n();
  const dispatch = useAppDispatch();

  const nextHandler = () => {
    dispatch(requestScreenData(screenCount));
    // @ts-ignore
    navigation.push(HOME_ROUTER.CONTRACT, { screenCount: screenCount + 1 });
  };

  const backButton = () => {
    // @ts-ignore
    navigation.pop();
  };

  const cancelHandler = () => {
    dispatch(
      setModal({
        message: t("contracts.confirmation_modal.message"),
        actions: [
          {
            name: t("contracts.confirmation_modal.buttons.cancel"),
          },
          {
            name: t("contracts.confirmation_modal.buttons.ok"),
            action: navigationPopToTop(),
          },
        ],
      })
    );
  };

  if (!contractType) {
    return null;
  }

  return (
    <TopBar
      leftButton={
        <TextButton
          text={t("contracts.buttons.cancel")}
          onPress={cancelHandler}
          type="left"
        />
      }
      pageName={t(`contracts.${contractType}.title`)}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            <ContractScreenCounter
              total={contractScreensConfig[contractType].length}
              current={screenCount + 1}
            />
          </View>
          <View style={styles.titleContainer}>
            <ContractFormTitle
              title={t(contractScreensConfig[contractType][screenCount].title)}
            />
          </View>
          <View style={styles.dynamicComponentContainer}>
            {React.createElement(
              contractScreensConfig[contractType][screenCount].component
            )}
          </View>
        </KeyboardAwareScrollView>
        <View
          style={[
            styles.buttonContainer,
            screenCount === 0 ? styles.flexEnd : null,
          ]}
        >
          {screenCount > 0 ? <ContractBackButton onPress={backButton} /> : null}
          {screenCount < contractScreensConfig[contractType].length - 1 ? (
            <ContractNextButton onPress={nextHandler} />
          ) : null}
        </View>
      </View>
    </TopBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 29,
    marginTop: 10,
    marginBottom: 35,
  },
  dynamicComponentContainer: {
    flex: 1,
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  titleContainer: {
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
});
