import React from "react";
import { Modal, TouchableOpacity, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { buildMediaSource } from "../../../utils/helpers";

export interface ProductDescriptionModalPropsInterface {
  url: string;
  modalVisible: boolean;
  toggleModal: () => void;
}

export default function ProductDescriptionModal({
  url,
  modalVisible,
  toggleModal,
}: ProductDescriptionModalPropsInterface) {
  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={0.9}
        onPress={toggleModal}
      />
      <FastImage source={buildMediaSource(url)} style={styles.imageModal} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  imageModal: {
    position: "absolute",
    top: "20%",
    width: "100%",
    height: "60%",
    zIndex: 2,
  },
});
