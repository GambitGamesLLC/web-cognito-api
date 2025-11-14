/**
 * @type {import('jest').Config}
 */
export default {
  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // A list of paths to modules that run some code to configure or set up the testing environment before each test.
  // This is used to polyfill browser APIs like 'fetch' that are not available in JSDOM.
  setupFiles: ['<rootDir>/tests/setup.js'],

  // A map from regular expressions to paths to transformers.
  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};