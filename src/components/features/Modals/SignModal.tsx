import React, {useEffect, useState} from "react";
import {Modal, SafeAreaView, StyleSheet, Text, View} from "react-native";
import SignArea from "../SignArea";
import TopBar from "../../layouts/TopBar";
import TextButton from "../../basics/buttons/TextButton";
import {Signature} from "@scale-at/expo-pixi";
import {useAppDispatch} from "../../../store/hooks";
import {uploadMedia} from "../../../store/modules/media/action-creators";
import {MEDIA_FOLDERS} from "../../../store/modules/media/constants";
import {SIGN_LOADER} from "../../../store/modules/contract/purchase/sign";
import {useI18n} from "../../../translator/i18n";
import {addToWAiter} from "../../../store/modules/main/slice";
import SplashLoader from "./SplashLoader";
import {signContract} from "../../../store/modules/contract/action-creators";
import {MEDIA_TYPE} from "../../../services/media";

type SignModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SignModal({ visible, onClose }: SignModalProps) {
  const dispatch = useAppDispatch();
  const [signatureRef, setSignatureRef] = useState<Signature>();
  const [createDisabled, setCreateDisabled] = useState(true);
  const { t } = useI18n();

  const refSetter = (ref: Signature) => {
    setSignatureRef(ref);
  };

  useEffect(() => {
    setCreateDisabled(true);
  }, [visible]);

  const takeSignature = async () => {
    dispatch(addToWAiter(SIGN_LOADER));
    const signData = await signatureRef?.takeSnapshotAsync({
      format: "png",
    });
    if (!signData) {
      return;
    }
    const { uri } = signData;
    dispatch(uploadMedia(uri, MEDIA_FOLDERS.SIGNATURE, signContract({uri: "", type: MEDIA_TYPE.IMAGE})));
  };

  const onChange = () => {
    setCreateDisabled(signatureRef?.getLinesCount() === 0);
  };

  return (
    <View>
      <Modal
        visible={visible}
        supportedOrientations={["portrait-upside-down", "landscape-right"]}
      >
        <SafeAreaView style={styles.safeArea}>
          <TopBar
            leftButton={
              <TextButton
                text={t(`sign_form.buttons.cancel`)}
                onPress={onClose}
                type="left"
              />
            }
            pageName={t("sign_form.title")}
            style={styles.topBar}
            rightButton={
              <TextButton
                text={t(`sign_form.buttons.create`)}
                onPress={takeSignature}
                disabled={createDisabled}
                type="right"
              />
            }
          >
            <View style={styles.container}>
              <SignArea
                refSetter={refSetter}
                signInstance={signatureRef}
                onChange={onChange}
              />
              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  {t("sign_form.description.first")}
                  <Text style={[styles.text, styles.bold]}>
                    {t("sign_form.buttons.create")}
                  </Text>
                  {t("sign_form.description.second")}
                </Text>
              </View>
            </View>
          </TopBar>
          <SplashLoader />
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FCFF",
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "stretch",
  },
  topBar: {
    paddingTop: 0,
    backgroundColor: "#F8FCFF",
  },
  text: {
    fontSize: 12,
    marginTop: 12,
    fontFamily: "P",
  },
  bold: {
    fontFamily: "OS-B",
  },
  textContainer: {
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FCFF",
  },
});
