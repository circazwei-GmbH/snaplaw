import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import VerticalDivider from "../dividers/VerticalDivieder";
import FastImage from 'react-native-fast-image'
import {buildMediaSource} from "../../../utils/helpers";

type SignInputProps = {
  style?: StyleProp<TextStyle>;
  signUri: string | undefined;
  signHandler: (event: GestureResponderEvent) => void;
};

export default function SignInput({
  style,
  signUri,
  signHandler,
}: SignInputProps) {
  return (
    <View style={[styles.container, signUri ? styles.border : null, style]}>
      <View style={styles.signContainer}>
        {signUri ? (
          <FastImage
            style={styles.image}
            source={buildMediaSource(signUri)}
            testID="SignImageID"
          />
        ) : null}
      </View>
      <View style={styles.rightPart}>
        <View style={styles.dividerContainer}>
          <VerticalDivider />
        </View>
        <Pressable onPress={signHandler}>
          <View style={styles.iconContainer} testID="SignInputPressID">
            <Feather name="edit-3" size={22} color="#668395" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#EFF7FD",
    height: 70,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 29,
  },
  dividerContainer: {
    paddingVertical: 7,
  },
  border: {
    borderColor: "#BBD1DE",
    borderWidth: 1,
  },
  signContainer: {
    width: "76%",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
