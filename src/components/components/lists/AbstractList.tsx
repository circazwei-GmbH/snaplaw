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
  elements: Array<any>;
  listItem: ListItemConponent;
  isLoading?: boolean;
  onEndReached?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  style?: Record<string, unknown>;
};

export default function AbstractList({
  elements,
  messageOnEmpty,
  listItem,
  isLoading,
  onEndReached,
  onRefresh,
  isRefreshing,
  style,
  ...props
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
    <FlatList
      {...props}
      style={[styles.container, style]}
      data={elements}
      renderItem={listItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
    />
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
    fontFamily: "P-L",
    fontSize: 36,
    color: "#E6EBEF",
    textAlign: "center",
    paddingHorizontal: 50,
  },
});
