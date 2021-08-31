import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

type ImageAndTextProp = {
  image: any;
  text: string;
};

export default function ImageAndText({ image, text }: ImageAndTextProp) {
  return (
    <View style={styles.topContainer}>
      <Image
        style={styles.image}
        accessibilityLabel="asset-image"
        source={image}
      />
      <Text style={styles.description}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
  },
  description: {
    textAlign: "center",
    fontFamily: "P",
    marginTop: 13,
    fontSize: 17,
  },
});
