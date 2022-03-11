module.exports = {
  preset: 'react-native',

  setupFiles: [
    '<rootDir>/jest/setup.js',
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-vector-icons|react-native-linear-gradient|@react-native-async-storage|@react-native-community|@react-navigation|react-native-modal|react-native-animatable)/)',
  ],
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'ios',
    'android',
  ],
  collectCoverage: true,
};
