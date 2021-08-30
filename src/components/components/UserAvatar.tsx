import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { buildMediaSource } from "../../utils/helpers";
import FastImage from "react-native-fast-image";

interface UserAvatarPropsInterface {
  sizeSmall: boolean;
  url?: string | null;
}

export default function UserAvatar({
  sizeSmall,
  url,
}: UserAvatarPropsInterface): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const avatarLoading = useAppSelector((state) => state.profile.avatarLoading);
  const getAvatar = () => {
    return url
      ? buildMediaSource(url)
      : require("../../../assets/user_profile.png");
  };

  const onStartLoadHandler = () => {
    setIsLoading(true);
  };

  const onEndLoadHandler = () => {
    setIsLoading(false);
  };

  return (
    <View
      style={[
        !sizeSmall && url ? styles.containerBig : styles.containerSmall,
        styles.container,
      ]}
    >
      <FastImage
        source={getAvatar()}
        style={styles.image}
        onLoadStart={onStartLoadHandler}
        onLoad={onEndLoadHandler}
        onLoadEnd={onEndLoadHandler}
        testID="AvatarImage"
      />
      {isLoading || avatarLoading ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color="#1696E2"
            testID="AvatarLoadingActivityIndicator"
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
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
  activityIndicator: {},
  containerSmall: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 32,
    overflow: "hidden",
  },
  containerBig: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
