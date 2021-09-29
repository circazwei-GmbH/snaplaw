import React, {useEffect, useRef} from "react";
import {Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import {MEDIA_TYPE, MediaProcessType} from "../../../services/media";
import {buildMediaSource} from "../../../utils/helpers";
import FastImage from "react-native-fast-image";
import { Video, AVPlaybackStatus } from 'expo-av';

export interface ProductDescriptionModalPropsInterface {
  url: MediaProcessType | undefined;
  modalVisible: boolean;
  toggleModal: () => void;
}

export default function ProductDescriptionModal({
  url,
  modalVisible,
  toggleModal,
}: ProductDescriptionModalPropsInterface) {
  if (!url) {
    return null;
  }
  let ref = useRef(null);

  // useEffect(() => {
  //   console.log(ref.current)
  //   if (ref.current) {
  //     ref.current.loadAsync(buildMediaSource(url.uri))
  //   }
  // }, [ref])
  console.log(url.uri)
  return (
    <Modal visible={modalVisible} transparent={true} animationType="fade">
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={0.9}
        onPress={toggleModal}
      />
      {url.type === MEDIA_TYPE.IMAGE ? <FastImage source={buildMediaSource(url.uri)} style={styles.imageModal} /> : <Video
        style={styles.video}
        ref={ref}
        useNativeControls
        resizeMode="contain"
        isLooping
        onLoadStart={() => console.log('yay')}
        onError={(e) => console.log(e)}
        onLoad={() => console.log('END')}
        source={buildMediaSource(url.uri)}
      />}
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
    zIndex: 2
  }
});
