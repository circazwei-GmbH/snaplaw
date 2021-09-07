import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ListItemConponent } from "./ListItems/list-item-type";

type AbstractListProps = {
  messageOnEmpty: string;
  elements: Array<Record<string, string>>;
  listItem: ListItemConponent;
  isLoading?: boolean;
};

export default function AbstractList({
  elements,
  messageOnEmpty,
  listItem,
  isLoading,
}: AbstractListProps) {
  if (isLoading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator
          size="large"
          color="#1696E2"
          testID="AbstractListLoader"
        />
      </View>
    );
  }

  if (!elements.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{messageOnEmpty}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList data={elements} renderItem={listItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "OS",
    fontSize: 36,
    color: "#E6EBEF",
    textAlign: "center",
  },
});
