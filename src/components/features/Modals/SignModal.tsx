import React, { useState } from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import SignArea from "../SignArea";
import TopBar from "../../layouts/TopBar";
import TextButton from "../../basics/buttons/TextButton";
import DefaultText from "../../basics/typography/DefaultText";
import { Signature } from "@scale-at/expo-pixi";
import { useAppDispatch } from "../../../store/hooks";
import { uploadMedia } from "../../../store/modules/media/action-creators";
import { MEDIA_FOLDERS } from "../../../store/modules/media/constants";
import { setScreenData } from "../../../store/modules/contract/slice";
import { CONTRACT_SCREEN_TYPES } from "../../../store/modules/contract/constants";
import { SIGN_FIELDS } from "../../../store/modules/contract/purchase/sign";

type SignModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function SignModal({ visible, onClose }: SignModalProps) {
  const dispatch = useAppDispatch();
  const [signatureRef, setSignatureRef] = useState<Signature>();

  const refSetter = (ref: Signature) => {
    setSignatureRef(ref);
  };

  const takeSignature = async () => {
    const signData = await signatureRef?.takeSnapshotAsync({
      format: 'png'
    });
    if (!signData) {
      return;
    }
    const { uri } = signData;
    dispatch(
      uploadMedia(
        uri,
        MEDIA_FOLDERS.SIGNATURE,
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.SIGN,
          fieldName: SIGN_FIELDS.SIGN,
          value: "",
        }),
        "value"
      )
    );
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
              <TextButton text={"Cancel"} onPress={onClose} type="left" />
            }
            pageName={"Sign contract with your finger "}
            style={styles.topBar}
            rightButton={
              <TextButton text={"Save"} onPress={takeSignature} type="right" />
            }
          >
            <View style={styles.container}>
              <SignArea refSetter={refSetter} signInstance={signatureRef} />
              <DefaultText
                style={styles.text}
                text={
                  "By tapping Create, I agree that the signature will be the electronic representation of my signature for all purposes when I use them on documents."
                }
              />
            </View>
          </TopBar>
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
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FCFF",
  },
});
