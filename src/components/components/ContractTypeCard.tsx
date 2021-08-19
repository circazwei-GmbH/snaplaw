import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  GestureResponderEvent,
} from "react-native";

type ContractTypeCardProps = {
  image: any;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function ContractTypeCard({
  image,
  title,
  onPress,
}: ContractTypeCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} testID={`Image.${title}`} />
        <Text style={styles.text}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 220,
    backgroundColor: "#EFF7FD",
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1EEF6",
    borderRadius: 10,
    width: Dimensions.get("window").width / 2 - 16,
  },
  text: {
    marginTop: 12,
    textAlign: "center",
    width: 140,
    color: "#202020",
    fontSize: 18,
    fontFamily: "OS",
  },
});
