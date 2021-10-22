import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductDescriptionModal from "../features/Modals/ProductDescriptionModal";
import { PRODUCT_DESCRIPTION_FIELDS } from "../../store/modules/contract/types";
import ImageOrVideoPreview from "./ImageOrVideoPreview";
import { MediaType } from "../../services/media";

export interface DescriptionPhotosPropsInterface {
  photos: MediaType[];
  onPressDelete?: Function;
  fieldName: string;
}

export default function DescriptionPhotos({
  photos,
  onPressDelete,
  fieldName,
}: DescriptionPhotosPropsInterface) {
  const [media, setMedia] = useState<MediaType>();
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const openModalSetUrl = (url: MediaType) => {
    toggleModal();
    setMedia(url);
  };

  return (
    <View style={styles.container}>
      <ProductDescriptionModal
        media={media}
        modalVisible={modalVisible}
        toggleModal={toggleModal}
      />
      {photos.map((item) => {
        return (
          <TouchableOpacity
            onPress={() => openModalSetUrl(item)}
            style={styles.child}
            key={item.uri}
            testID="ImageTouchableWrapper"
          >
            {onPressDelete ? (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.removeButton}
                onPress={() => onPressDelete(item.uri, fieldName)}
                testID="IamgeDeleteIcon"
              >
                <View style={styles.removeButtonBackground}>
                  <AntDesign name="closecircle" size={18} color="#668395" />
                </View>
              </TouchableOpacity>
            ) : null}
            <ImageOrVideoPreview url={item} />
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
  video: {
    width: 320,
    height: 200,
  },
});
