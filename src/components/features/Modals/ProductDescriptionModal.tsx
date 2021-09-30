import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity
  } from "react-native";
import { MEDIA_TYPE, MediaType } from "../../../services/media";
import { buildMediaSource } from "../../../utils/helpers";
import FastImage from "react-native-fast-image";
import { Video } from "expo-av";

export interface ProductDescriptionModalPropsInterface {
  media: MediaType | undefined;
  modalVisible: boolean;
  toggleModal: () => void;
}

export default function ProductDescriptionModal({
  media,
  modalVisible,
  toggleModal,
}: ProductDescriptionModalPropsInterface) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  if (!media) {
    return null;
  }
  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={0.9}
        onPress={toggleModal}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#1696E2"
          style={styles.activityIndicator}
        />
      ) : null}
      {media.type === MEDIA_TYPE.IMAGE ? (
        <FastImage
          source={buildMediaSource(media.uri)}
          style={styles.imageModal}
          onLoadStart={() => setIsLoading(true)}
          onError={() => setIsLoading(false)}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <Video
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          onLoadStart={() => setIsLoading(true)}
          onError={() => setIsLoading(false)}
          onLoad={() => setIsLoading(false)}
          source={buildMediaSource(media.uri)}
        />
      )}
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
    zIndex: 20,
  },
  video: {
    position: "absolute",
    top: "20%",
    width: "100%",
    height: "60%",
    zIndex: 2,
  },
  activityIndicator: {
    position: "absolute",
    height: "100%",
    alignSelf: "center",
    zIndex: 2,
  },
});
