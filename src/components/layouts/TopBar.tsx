import React, { ReactElement } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import BackButton from "../basics/buttons/BackButton";

interface TopBarProps {
  children: ReactElement;
  pageName?: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  bottomElement?: JSX.Element;
  withBackbround?: boolean;
  style?: object;
}

export default function TopBar({
  children,
  pageName,
  leftButton,
  rightButton,
  bottomElement,
  withBackbround = false,
  style,
}: TopBarProps) {
  return (
    <>
      <View
        style={[
          styles.header,
          withBackbround ? styles.background : null,
          style,
        ]}
      >
        {leftButton === undefined ? <BackButton /> : leftButton}
        <Text style={styles.headerText}>{pageName}</Text>
        <View style={styles.buttonPlaceholder}>
          {rightButton ? rightButton : null}
        </View>
      </View>
      {bottomElement ? (
        <View
          style={[
            styles.bottomElement,
            withBackbround ? styles.background : null,
            style,
          ]}
        >
          {bottomElement}
        </View>
      ) : null}
      {withBackbround ? (
        <View style={[styles.border, styles.background]} />
      ) : null}
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        paddingTop: 47,
      },
      android: {
        paddingTop: 35,
      },
    }),
  },
  headerText: {
    textAlign: "center",
    fontFamily: "OS-SB",
    fontSize: 17,
  },
  buttonPlaceholder: {
    width: 120,
    height: 45,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  bottomElement: {
    paddingBottom: 23,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  background: {
    backgroundColor: "#F8FCFF",
  },
  border: {
    height: 3,
    shadowColor: "rgba(196, 211, 220, 0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});
