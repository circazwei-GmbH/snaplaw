import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductDescriptionModal from "../features/Modals/ProductDescriptionModal";
import { DescriptionPhotoInterface } from "../../store/modules/contract/types";

export interface DescriptionPhotosPropsInterface {
  photos: DescriptionPhotoInterface[];
}

export default function DescriptionPhotos({
  photos,
}: DescriptionPhotosPropsInterface) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <View style={styles.container}>
      {photos.map((item) => {
        return (
          <>
            <ProductDescriptionModal
              url={item.url}
              modalVisible={modalVisible}
              toggleModal={toggleModal}
            />
            <TouchableOpacity onPress={toggleModal} style={styles.child}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.removeButton}
                onPress={() => alert("Hi")}
              >
                <View style={styles.removeButtonBackground}>
                  <AntDesign name="pluscircle" size={18} color="#668395" />
                </View>
              </TouchableOpacity>
              <Image source={{ uri: item.url }} style={styles.image} />
            </TouchableOpacity>
          </>
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
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  imageModal: {
    position: "absolute",
    top: "20%",
    width: "100%",
    height: "60%",
    zIndex: 2,
  },
  removeButton: {
    width: 30,
    height: 30,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
    zIndex: 1,
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
  modal: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
