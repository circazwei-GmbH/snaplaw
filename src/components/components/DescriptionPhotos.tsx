import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductDescriptionModal from "../features/Modals/ProductDescriptionModal";
import { PRODUCT_DESCRIPTION_FIELDS } from "../../store/modules/contract/types";
import FastImage from "react-native-fast-image";
import { buildMediaSource } from "../../utils/helpers";

export interface DescriptionPhotosPropsInterface {
  photos: string[];
  onPressDelete?: Function;
  fieldName: PRODUCT_DESCRIPTION_FIELDS;
}

export default function DescriptionPhotos({
  photos,
  onPressDelete,
  fieldName,
}: DescriptionPhotosPropsInterface) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const openModalSetUrl = (url: string) => {
    toggleModal();
    setUrl(url);
  };

  return (
    <View style={styles.container}>
      <ProductDescriptionModal
        url={url}
        modalVisible={modalVisible}
        toggleModal={toggleModal}
      />
      {photos.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => openModalSetUrl(item)}
            style={styles.child}
            key={item}
          >
            {onPressDelete ? (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.removeButton}
                onPress={() => onPressDelete(item, fieldName)}
              >
                <View style={styles.removeButtonBackground}>
                  <AntDesign name="closecircle" size={18} color="#668395" />
                </View>
              </TouchableOpacity>
            ) : null}
            {isLoading ? (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator
                  size="large"
                  color="#1696E2"
                  style={styles.activityIndicator}
                />
              </View>
            ) : null}
            <FastImage
              source={buildMediaSource(item)}
              style={styles.image}
              onLoadEnd={() => setIsLoading(false)}
              onLoadStart={() => setIsLoading(true)}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  child: {
    width: "25%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  imageModal: {
    position: "absolute",
    top: "20%",
    width: "100%",
    height: "60%",
    zIndex: 3,
  },
  activityIndicatorContainer: {
    position: "absolute",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  activityIndicator: {
    backgroundColor: "rgba(0,0,0, 0.3)",
    height: "100%",
    borderRadius: 5,
  },
  removeButton: {
    width: 25,
    height: 25,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    zIndex: 2,
  },
  removeButtonBackground: {
    width: 21,
    height: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  openButton: {
    width: "100%",
    height: "100%",
  },
});
