import React from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import TextButton from "../../basics/buttons/TextButton";
import { useI18n } from "../../../translator/i18n";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { buildPDFSource } from "../../../services/contract";
import { setMessage, setModal } from "../../../store/modules/main/slice";
import { navigationPopToTop } from "../../../store/modules/main/action-creators";
import { CONTRACT_SCREEN_TYPES } from "../../../store/modules/contract/constants";
import {
  PRODUCT_DESCRIPTION_FIELDS,
  ProductDescriptionScreenInterface,
} from "../../../store/modules/contract/purchase/product-description";
import DescriptionPhotos from "../../components/DescriptionPhotos";
import DefaultText from "../../basics/typography/DefaultText";
import { BaseScreenDataInterface } from "../../../store/modules/contract/base-types";

type ContractViewProps = {
  visible: boolean;
  onClose: () => void;
  contractId: string;
  screens: BaseScreenDataInterface[] | undefined;
  fromStepper?: boolean;
  isPartnerInvited?: boolean
};

export default function ContractView({
  visible,
  onClose,
  contractId,
  screens,
  fromStepper,
  isPartnerInvited = false
}: ContractViewProps) {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.profile.language);

  const descriptionScreen = screens?.find(
    (screen) => screen.type === CONTRACT_SCREEN_TYPES.PRODUCT_DESCRIPTION
  ) as ProductDescriptionScreenInterface;

  const onSaveHandler = () => {
    onClose();
    dispatch(
      setModal({
        message: t(isPartnerInvited ? "contracts.messages.found_in_pregress_folder" : "contracts.messages.found_in_pregress_folder_with_invite"),
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
              text={t(
                fromStepper
                  ? "contracts.pdf_view.edit"
                  : "contracts.pdf_view.cancel"
              )}
              onPress={onClose}
              type="left"
            />
            {fromStepper ? (
              <TextButton
                styleText={styles.buttonText}
                text={t("contracts.pdf_view.save")}
                onPress={onSaveHandler}
                type="right"
              />
            ) : null}
          </View>
          <ScrollView>
            {visible && contractId ? (
              <Pdf
                style={styles.pdf}
                onError={onError}
                source={buildPDFSource(contractId, locale)}
              />
            ) : null}
            <View style={styles.mediaContainer}>
              {descriptionScreen &&
              descriptionScreen.data[
                PRODUCT_DESCRIPTION_FIELDS.productPhotos
              ] ? (
                <>
                  <DefaultText
                    text={t("contracts.pdf_view.additional_media")}
                    style={[
                      styles.buttonText,
                      styles.padding,
                      styles.titleMargin,
                    ]}
                  />
                  <DescriptionPhotos
                    photos={
                      descriptionScreen.data[
                        PRODUCT_DESCRIPTION_FIELDS.productPhotos
                      ]
                    }
                    fieldName={PRODUCT_DESCRIPTION_FIELDS.productPhotos}
                  />
                </>
              ) : null}
              {descriptionScreen &&
              descriptionScreen.data[
                PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos
              ] ? (
                <>
                  <DefaultText
                    text={t("contracts.pdf_view.accessories_media")}
                    style={[
                      styles.buttonText,
                      styles.padding,
                      styles.titleMargin,
                    ]}
                  />
                  <DescriptionPhotos
                    photos={
                      descriptionScreen.data[
                        PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos
                      ]
                    }
                    fieldName={PRODUCT_DESCRIPTION_FIELDS.productPhotos}
                  />
                </>
              ) : null}
            </View>
          </ScrollView>
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
    width: "100%",
    height: (Dimensions.get("screen").height * 7) / 10,
    backgroundColor: "#C2C2C2",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    color: "#FFF",
  },
  titleMargin: {
    marginTop: 30,
  },
  padding: {
    paddingHorizontal: 16,
  },
  mediaContainer: {
    marginVertical: 10,
  },
});
