module.exports = {
  preset: "jest-expo",
  setupFiles: [
    "./node_modules/react-native-gesture-handler/jestSetup.js",
    "./jestSetup.js",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native-community|expo(nent)?|@expo(nent)?/.*|@codler/react-native-keyboard-aware-scroll-view|react-navigation|react-router-native|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|fonts)",
  ],
};
