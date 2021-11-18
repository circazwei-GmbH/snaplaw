import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import Button from "../../basics/buttons/Button";
import { useI18n } from "../../../translator/i18n";
import { BUTTON_COLORTYPE } from "../../../store/modules/main/types";

export type ButtonType = {
  title: string;
  handler: () => void;
};

type MenuProps = {
  visible: boolean;
  onClose: () => void;
  buttons: ButtonType[];
};

export default function Menu({ onClose, visible, buttons }: MenuProps) {
  const { t } = useI18n();
  return (
    <View>
      <Modal testID="Menu" visible={visible} transparent={true} animationType="none">
        <View style={styles.container}>
          <View style={styles.listButtonContainer}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                style={[
                  styles.button,
                  0 === index ? styles.firstButton : null,
                  buttons.length - 1 === index ? styles.lastButton : null,
                ]}
                shadowNone
                textColorType={BUTTON_COLORTYPE.BLACK}
                text={button.title}
                onPress={button.handler}
              />
            ))}
          </View>
          <View style={styles.cancelButtonContainer}>
            <Button
              text={t("menu.cancel")}
              type="primary"
              shadowNone
              onPress={onClose}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
    paddingBottom: 30,
  },
  cancelButtonContainer: {
    width: "100%",
  },
  listButtonContainer: {
    width: "100%",
    paddingBottom: 8,
  },
  firstButton: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  lastButton: {
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  button: {
    borderRadius: 0,
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1,
  },
});
