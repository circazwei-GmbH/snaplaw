import React, { ReactElement } from "react";
import { View, StyleSheet, Text, Platform, Dimensions } from "react-native";
import BackButton from "../basics/buttons/BackButton";

interface TopBarProps {
  children: ReactElement;
  pageName?: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
  bottomElement?: JSX.Element;
  withBackground?: boolean;
  style?: object;
  noPlaceholder?: boolean;
}

export default function TopBar({
  children,
  pageName,
  leftButton,
  rightButton,
  bottomElement,
  withBackground = false,
  style,
  noPlaceholder,
}: TopBarProps) {
  return (
    <>
      <View
        style={[
          !noPlaceholder ? styles.headerPadding : null,  
          styles.header,
          withBackground ? styles.background : null,
          style,
        ]}
      >
        {leftButton === undefined ? <BackButton /> : leftButton}
        <Text style={styles.headerText}>{pageName}</Text>
        <View style={!noPlaceholder ? styles.buttonPlaceholder : null}>
          {rightButton ? rightButton : null}
        </View>
      </View>
      {bottomElement ? (
        <View
          style={[
            styles.bottomElement,
            withBackground ? styles.background : null,
            style,
          ]}
        >
          {bottomElement}
        </View>
      ) : null}
      {withBackground ? (
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
  },
  headerPadding: {
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
    width: Dimensions.get("window").width * 0.6,
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "OS-SB",
    fontSize: 16,
  },
  buttonPlaceholder: {
    width: Dimensions.get("window").width * 0.2,
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
