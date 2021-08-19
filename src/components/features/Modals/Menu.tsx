import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import Button from "../../basics/buttons/Button";
import { useI18n } from "../../../translator/i18n";

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
      <Modal visible={visible} transparent={true} animationType="fade">
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
                text={button.title}
                onPress={button.handler}
              />
            ))}
          </View>
          <View style={styles.cancelButtonContainer}>
            <Button text={t("menu.cancel")} type="primary" onPress={onClose} />
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
    borderBottomColor: "rgb(204, 204, 204)",
    borderBottomWidth: 1,
  },
});
