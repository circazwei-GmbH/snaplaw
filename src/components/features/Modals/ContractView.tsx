import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import TextButton from "../../basics/buttons/TextButton";
import { useI18n } from "../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { buildPDFSource } from "../../../services/contract";
import { setMessage, setModal } from "../../../store/modules/main/slice";
import { navigationPopToTop } from "../../../store/modules/main/action-creators";

type ContractViewProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ContractView({ visible, onClose }: ContractViewProps) {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.language);
  const contractId = useAppSelector(
    (state) => state.contract.currentContract?.id
  );

  const onSaveHandler = () => {
    onClose();
    dispatch(
      setModal({
        message: t("contracts.messages.found_in_pregress_folder"),
        actions: [
          {
            name: t("ok"),
            action: navigationPopToTop(),
          },
        ],
      })
    );
  };

  const onError = () => {
    onClose();
    dispatch(setMessage(t("errors.abstract")));
  };

  return (
    <View>
      <Modal visible={visible}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <TextButton
              styleText={styles.buttonText}
              text={t("contracts.pdf_view.edit")}
              onPress={onClose}
              type="left"
            />
            <TextButton
              styleText={styles.buttonText}
              text={t("contracts.pdf_view.save")}
              onPress={onSaveHandler}
              type="right"
            />
          </View>
          {visible && contractId ? (
            <Pdf
              style={styles.pdf}
              onError={onError}
              source={buildPDFSource(contractId, locale)}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 25,
    backgroundColor: "#C2C2C2",
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#C2C2C2",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#FFF",
  },
});
