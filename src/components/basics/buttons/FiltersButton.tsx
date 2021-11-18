import React from "react";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Octicons } from "@expo/vector-icons";

type FiltersButtonProps = {
  onPress: () => void;
};

export default function FiltersButton({
  onPress,
}: FiltersButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      testID={"FiltersButton"}
      onPress={onPress}
      style={styles.container}
    >
      <Octicons
        name="settings"
        size={24}
        color="#668395"
        style={styles.settings}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 16,
    width: Dimensions.get("window").width * 0.2,
    height: 45,
  },
  settings: {
    marginRight: 16,
  },
});
