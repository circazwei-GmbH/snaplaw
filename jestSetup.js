jest.mock('./src/translator/Translator', () => ({
    translator: (text) => text
}))

jest.mock('./src/translator/i18n', () => ({
    useI18n: () => ({t: t => t})
}))

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};

    return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
