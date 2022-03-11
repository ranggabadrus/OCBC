module.exports = {
  setupFiles: ['<rootDir>/jest/setup.js'],

  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native)/)'],
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
};
