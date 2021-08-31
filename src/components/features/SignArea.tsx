import React from "react";
import { StyleSheet, View } from "react-native";
import { RefSetter, Signature } from "@scale-at/expo-pixi";
import TextButton from "../basics/buttons/TextButton";
import UndoButton from "../basics/buttons/UndoButton";
import { useI18n } from "../../translator/i18n";

type SignaAreaProps = {
  refSetter: RefSetter;
  signInstance: Signature | undefined;
  onChange: () => void;
};

export default function SignArea({
  refSetter,
  signInstance,
  onChange,
}: SignaAreaProps) {
  const { t } = useI18n();
  const clear = () => {
    signInstance?.clear();
    onChange();
  };
  return (
    <View style={styles.container}>
      <View style={styles.signatureContainer}>
        <Signature ref={refSetter} style={styles.pixi} onChange={onChange} />
      </View>
      <View style={styles.buttonContainer}>
        <UndoButton
          style={styles.undoButton}
          onPress={() => signInstance?.undo()}
        />
        <TextButton
          styleText={styles.clearButton}
          text={t("sign_form.buttons.clear")}
          onPress={clear}
          type="left"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#BBD1DE",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "80%",
    paddingHorizontal: 18,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    position: "relative",
  },
  signatureContainer: {
    flex: 1,
  },
  undoButton: {
    position: "absolute",
    height: "100%",
    top: 0,
    left: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    color: "#202020",
  },
  pixi: {
    flex: 1,
    borderRadius: 10,
    borderBottomColor: "#DCDCDC",
    borderBottomWidth: 1,
  },
});
