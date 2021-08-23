import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export interface DescriptionPhotosPropsInterface {
  photos: string[];
}

export default function DescriptionPhotos({
  photos,
}: DescriptionPhotosPropsInterface) {
  return (
    <View style={styles.container}>
      {photos.map((item) => {
        return (
          <View style={styles.child}>
            <TouchableOpacity style={styles.button} onPress={() => alert("Hi")}>
              <AntDesign name="pluscircle" size={18} color="#668395" />
            </TouchableOpacity>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
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
    height: 95,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "75%",
    height: "75%",
  },
  button: {
    position: "absolute",
    alignItems: "flex-end",
    top: "5%",
    right: "5%",
    width: 40,
    height: 40,
    zIndex: 1,
  },
});
