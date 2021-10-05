import React, { useEffect, useState } from "react";
import TopBar from "../../layouts/TopBar";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ContractNavigationProps,
  HOME_ROUTER,
} from "../../../router/HomeRouterType";
import { getContractScreensConfig } from "../../../store/modules/contract/contract-screens-types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useI18n } from "../../../translator/i18n";
import ContractNextButton from "../../basics/buttons/ContractNextButton";
import ContractBackButton from "../../basics/buttons/ContractBackButton";
import ContractScreenCounter from "../../basics/ContractScreenCounter";
import ContractFormTitle from "../../basics/typography/ContractFormTitle";
import {
  requestContract,
  requestScreenData,
} from "../../../store/modules/contract/action-creators";
import TextButton from "../../basics/buttons/TextButton";
import InviteButton from "../../basics/buttons/InviteButton";
import { navigationPopToTop } from "../../../store/modules/main/action-creators";
import { setModal } from "../../../store/modules/main/slice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ContractViewButton from "../../basics/buttons/ContractViewButton";
import ContractView from "../../features/Modals/ContractView";
import { CONTRACT_ROLE } from "../../../store/modules/contract/contract-roles";
import { updateScreenData } from "../../../store/modules/contract/slice";
import { checkIsItChangeRequest } from "../../../store/modules/contract/request-changes-config";
import { BaseScreenDataInterface } from "../../../store/modules/contract/base-types";
import { findScreentByType } from "../../../utils/helpers";
import { BUTTON_COLORTYPE } from "../../../store/modules/main/types";

type ContractProps = {
  route: {
    params: ContractNavigationProps;
  };
};

export default function Contract({
  route: {
    params: { screenCount, id },
  },
}: ContractProps) {
  const navigation = useNavigation();
  const contract = useAppSelector((state) => state.contract.currentContract);
  const [previousVersionOfCurrentScreen, setPreviousVersionOfCurrentScreen] =
    useState<BaseScreenDataInterface | undefined>(undefined);
  const [contractViewVisible, setContractViewVisible] = useState(false);
  const { t } = useI18n();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(requestContract(id));
    }
  }, [id]);

  useEffect(() => {
    if (!contract) {
      return;
    }
    const currentContractScreen = findScreentByType(
      contract.screens,
      currentContractConfig[screenCount].type
    );
    setPreviousVersionOfCurrentScreen(currentContractScreen);
  }, []);

  if (!contract) {
    return null;
  }

  const currentContractConfig = getContractScreensConfig(
    contract.type,
    contract.meRole
  );

  const nextHandler = () => {
    if (!contract) {
      return;
    }
    const isNeedRequestModal = checkIsItChangeRequest(
      contract,
      currentContractConfig[screenCount].type,
      previousVersionOfCurrentScreen
    );

    if (isNeedRequestModal) {
      dispatch(
        setModal({
          message: t("contracts.change_prequest_modal.message"),
          actions: [
            {
              name: t("contracts.change_prequest_modal.no"),
              action: updateScreenData({
                screen: previousVersionOfCurrentScreen,
                type: currentContractConfig[screenCount].type,
              }),
              colortype: BUTTON_COLORTYPE.ERROR,
            },
            {
              name: t("contracts.change_prequest_modal.yes"),
              action: requestScreenData(
                contract.type,
                currentContractConfig[screenCount].type,
                true
              ),
            },
          ],
        })
      );
    } else {
      dispatch(
        requestScreenData(
          contract.type,
          currentContractConfig[screenCount].type
        )
      );
      const currentContractScreen = findScreentByType(
        contract.screens,
        currentContractConfig[screenCount].type
      );
      setPreviousVersionOfCurrentScreen(currentContractScreen);
    }
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

  const viewHandler = () => {
    setContractViewVisible(true);
  };

  const closeViewerHandler = () => {
    setContractViewVisible(false);
  };

  return (
    <TopBar
      leftButton={
        <TextButton
          text={t("contracts.buttons.cancel")}
          onPress={cancelHandler}
          type="left"
        />
      }
      rightButton={
        contract.meRole === CONTRACT_ROLE.OWNER ? (
          <InviteButton contractId={contract.id} />
        ) : undefined
      }
      pageName={t(`contracts.${contract.type}.title`)}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View>
            <ContractScreenCounter
              total={currentContractConfig.length}
              current={screenCount + 1}
            />
          </View>
          <View style={styles.titleContainer}>
            <ContractFormTitle
              title={t(currentContractConfig[screenCount].title)}
            />
          </View>
          <View style={styles.dynamicComponentContainer}>
            {React.createElement(currentContractConfig[screenCount].component)}
          </View>
        </KeyboardAwareScrollView>
        <View
          style={[
            styles.buttonContainer,
            screenCount === 0 ? styles.flexEnd : null,
          ]}
        >
          {screenCount > 0 ? <ContractBackButton onPress={backButton} /> : null}
          {screenCount < currentContractConfig.length - 1 ? (
            <ContractNextButton onPress={nextHandler} />
          ) : null}
          {screenCount === currentContractConfig.length - 1 ? (
            <ContractViewButton onPress={viewHandler} />
          ) : null}
        </View>
        <ContractView
          visible={contractViewVisible}
          onClose={closeViewerHandler}
          contractId={contract.id}
          screens={contract.screens}
          fromStepper
          isPartnerInvited={!!contract.partnerName}
        />
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
    alignItems: "center",
    height: 45,
    marginBottom: 5,
    paddingHorizontal: 29,
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
