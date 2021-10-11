import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Router from "./src/router/Router";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store/index";
import { navigationRef } from "./src/router/RootNavigation";
import AbstractModal from "./src/components/features/Modals/AbstractModal";
import SplashLoader from "./src/components/features/Modals/SplashLoader";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
  },
};

export default function App() {
  const [fontLoaded] = useFonts({
    OS: require("./assets/fonts/OpenSans-Regular.ttf"),
    "OS-B": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OS-SB": require("./assets/fonts/OpenSans-SemiBold.ttf"),
    P: require("./assets/fonts/Poppins-Regular.ttf"),
    "P-L": require("./assets/fonts/OpenSans-Light.ttf"),
  });

  if (!fontLoaded) {
    return <Text>Loading Fonts</Text>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme} ref={navigationRef}>
        <View style={styles.container}>
          <Router data-testid="router" />
        </View>
        <StatusBar style="dark" />
      </NavigationContainer>
      <AbstractModal />
      <SplashLoader />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "O-S",
  },
});
