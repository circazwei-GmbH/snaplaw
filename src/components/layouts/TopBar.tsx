import React, { ReactElement } from "react";
import { View, StyleSheet, Text, SafeAreaView, Platform } from "react-native";
import BackButton from "../basics/buttons/BackButton";

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
      <View 
        style={[
          Platform.OS === 'ios' ? styles.headerIOS : styles.headerANDROID,
          styles.header, 
          style
        ]}
      >
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIOS: {
    paddingTop: 47,
    
  },
  headerANDROID: {
    paddingTop: 25,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "OS-SB",
    fontSize: 17,
  },
  buttonPlaceholder: {
    width: 100,
    height: 45,
  },
});
