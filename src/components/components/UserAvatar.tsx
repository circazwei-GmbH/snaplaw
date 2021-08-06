import React, { useState } from "react";
import { View, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface UserAvatarPropsInterface {
  sizeSmall: boolean;
  url?: string;
}

export default function UserAvatar({
  sizeSmall,
  url,
}: UserAvatarPropsInterface) {
  return (
    <View style={sizeSmall ? styles.containerSmall : styles.containerBig}>
      {url === undefined ? (
        <AntDesign name="user" size={75} color="black" />
      ) : (
        <Image source={{ uri: url }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerSmall: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 32,
    overflow: "hidden",
  },
  containerBig: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
