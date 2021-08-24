import React from "react";
import { Picker, PickerItem } from "react-native-woodpicker";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

type SelectProps = {
  items: Array<{ label: string; value: string }>;
  selectedValue: PickerItem | undefined;
  onValueChange: (itemValue: PickerItem, itemIndex: number) => void;
  style?: ViewStyle | undefined;
};

export default function Select({
  onValueChange,
  selectedValue,
  items,
  style,
}: SelectProps) {
  return (
    <View style={{ ...style, ...styles.select }}>
      <Picker onItemChange={onValueChange} item={selectedValue} items={items} />
      <SimpleLineIcons
        style={styles.icon}
        name="arrow-down"
        size={14}
        color="#668395"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: "#EFF7FD",
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 16,
    color: "#202020",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 14,
  },
});
