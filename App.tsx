import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {NativeRouter} from "react-router-native";
import Router from "./src/router/Router";
import { useFonts } from 'expo-font';

export default function App() {
    const [fontLoaded] = useFonts({
        'OS': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OS-B': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OS-BI': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
        'OS-XB': require('./assets/fonts/OpenSans-ExtraBold.ttf'),
        'OS-XBI': require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
        'OS-I': require('./assets/fonts/OpenSans-Italic.ttf'),
        'OS-L': require('./assets/fonts/OpenSans-Light.ttf'),
        'OS-LI': require('./assets/fonts/OpenSans-LightItalic.ttf'),
        'OS-SB': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'OS-SBI': require('./assets/fonts/OpenSans-SemiBoldItalic.ttf')
    })

    if (!fontLoaded) {
        return null;
    }

  return (
      <NativeRouter>
          <View style={styles.container}>
              <Router data-testid="router" />
          </View>
          <StatusBar style="auto" />
      </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'O-S'
  },
});
