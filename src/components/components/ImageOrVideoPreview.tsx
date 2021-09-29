import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import FastImage, {Source} from "react-native-fast-image";
import {buildMediaSource} from "../../utils/helpers";
import {Entypo} from '@expo/vector-icons';
import {MEDIA_TYPE, MediaProcessType} from "../../services/media";

type ImageOrVideoPreviewProps = {
  url: MediaProcessType
}

export default function ImageOrVideoPreview({url}: ImageOrVideoPreviewProps) {
  const [isLiading, setIsLoading] = useState(url.type === MEDIA_TYPE.IMAGE);

  return (
      <View>
        {url.type === MEDIA_TYPE.IMAGE ? <FastImage source={buildMediaSource(url.uri)}
                              testID="Image"
                              style={styles.image}
                              onLoadEnd={() => setIsLoading(false)}
                              onLoadStart={() => setIsLoading(true)} /> :
          <View style={styles.videoWrapper}>
            <Image style={styles.videoImage} source={require("../../../assets/video-thumb.png")} />
            <Entypo style={styles.videoIcon} name="video" size={36} color="white" />
          </View>}
        <View style={styles.activityIndicatorContainer}>
          {isLiading ? <ActivityIndicator
            testID="ImageLoadingIndicator"
            size="large"
            color="#1696E2"
            style={styles.activityIndicator}
          /> : null}
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  activityIndicatorContainer: {
    position: "absolute",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  activityIndicator: {
    backgroundColor: "rgba(0,0,0, 0.3)",
    height: "100%",
    borderRadius: 5,
  },
  videoWrapper: {
    width: 70,
    height: 70,
    borderRadius: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center"
  },
  videoIcon: {
    position: "absolute",
  },
  videoImage: {
    width: 70,
    height: 70
  }
})