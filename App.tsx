import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Router from "./src/router/Router";
import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './src/translator/en'
import de from './src/translator/de'
import { Provider } from 'react-redux'
import store from './src/store/index'

i18n.translations = { en, de }

i18n.locale = Localization.locale
i18n.fallbacks = true;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#ffffff'
    }
}

export default function App() {
    const [fontLoaded] = useFonts({
        'OS': require('./assets/fonts/OpenSans-Regular.ttf'),
        'OS-B': require('./assets/fonts/OpenSans-Bold.ttf'),
        'OS-SB': require('./assets/fonts/OpenSans-SemiBold.ttf'),
        'P': require('./assets/fonts/Poppins-Regular.ttf'),
        'P-L': require('./assets/fonts/OpenSans-Light.ttf')
    })

    if (!fontLoaded) {
        return null;
    }

  return (
      <Provider store={store}>
          <NavigationContainer theme={theme}>
              <View style={styles.container}>
                  <Router data-testid="router" />
              </View>
              <StatusBar style="auto" />
          </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'O-S'
  },
});
