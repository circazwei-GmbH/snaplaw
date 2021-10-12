import React from "react";
import { ActivityIndicator, Modal, View, StyleSheet, Text } from "react-native";
import { useAppSelector } from "../../../store/hooks";
import { OrientationLock } from "expo-screen-orientation";

export default function SplashLoader() {
  const [isWaiter, message] = useAppSelector((state) => [
    !!state.main.waiter.events.length,
    state.main.waiter.message,
  ]);
  const orientation = useAppSelector((state) => state.main.orientation);
  return (
    <View>
      <Modal
        visible={isWaiter}
        transparent={true}
        animationType="none"
        supportedOrientations={[
          orientation === OrientationLock.PORTRAIT_UP
            ? "portrait"
            : "landscape-right",
        ]}
      >
        <View style={styles.activityContainer}>
          {message ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>{message}</Text>
            </View>
          ) : (
            <ActivityIndicator size="large" color="#1696E2" />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginHorizontal: 50,
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
});
