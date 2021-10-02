import { Translator } from "./src/translator/i18n";

jest.mock("./src/translator/Translator", () => ({
  translator: (text) => text,
}));

jest.mock("./src/translator/i18n", () => ({
  useI18n: () => ({ t: (t) => t }),
  Translator: jest.requireActual("./src/translator/i18n").Translator,
}));

import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

jest.mock("./src/env/env", () => ({
  API_HOST: "test_host",
}));

jest.mock("react-native-woodpicker", () => {
  const React = require("react");
  return {
    Picker: (props) => {
      return React.createElement("TextInput", {
        ...props,
        placeholder: props.item.label,
        value: props.item.label,
      });
    },
  };
});

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const React = require("react");
  return {
    KeyboardAwareScrollView: (props) => {
      return React.createElement("View", props);
    },
  };
});

jest.mock("react-native-pdf", () => {
  const React = require("react");
  return (props) =>
    React.createElement("View", { ...props, testID: "react-native-pdf" });
});
