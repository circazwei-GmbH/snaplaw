import React from "react";
import { Text, View, StyleSheet } from "react-native";

type ContractScreenCounterProps = {
  total: number;
  current: number;
};

export default function ContractScreenCounter({
  total,
  current,
}: ContractScreenCounterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        <Text style={[styles.text, styles.current]}>{current}</Text>/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: "OS-B",
  },
  current: {
    color: "#1696E2",
  },
});
