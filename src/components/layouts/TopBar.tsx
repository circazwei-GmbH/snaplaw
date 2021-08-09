<<<<<<< HEAD
import React, { ReactElement } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import BackButton from "../basics/buttons/BackButton";
=======
import React, { ReactElement } from 'react'
import { View, StyleSheet, Text } from "react-native"
import BackButton from '../basics/buttons/BackButton'
>>>>>>> e231a40fa121abc4978354ff4c91b65890c2dfbc

interface TopBarProps {
  children: ReactElement;
  pageName?: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  style?: object;
}

export default function TopBar({
  children,
  pageName,
  leftButton,
  rightButton,
  style,
}: TopBarProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.header, style]}>
        {leftButton === undefined ? <BackButton /> : leftButton}
        <Text style={styles.headerText}>{pageName}</Text>
        {rightButton === undefined ? (
          <View style={styles.buttonPlaceholder} />
        ) : (
          rightButton
        )}
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    paddingTop: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    textAlign: "center",
    fontFamily: "OS-SB",
    fontSize: 17,
  },
  buttonPlaceholder: {
    width: 45,
    height: 45,
  },
});
