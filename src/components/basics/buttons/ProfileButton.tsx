import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

interface ButtonPropsInterface {
  testID?: string;
  text: string;
  onPress: () => void;
  type?: "link";
}

export default function ProfileButton({
  testID,
  text,
  onPress,
  type,
}: ButtonPropsInterface) {
  return (
    <TouchableOpacity onPress={onPress} testID={`${testID}`}>
      <View style={styles.container}>
        <Text style={styles.buttonText}>{text}</Text>
        {type === "link" ? (
          <SimpleLineIcons name="arrow-right" size={16} color="#668395" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 45,
    paddingHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#F8FCFF",
    elevation: 1,
    shadowColor: "rgba(196, 211, 220, 0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  buttonText: {
    fontSize: 17,
    color: "#202020",
  },
});
