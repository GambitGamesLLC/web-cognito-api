module.exports = {
  // Use the jsdom environment for browser APIs
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },

  // Define the root directory for your tests
  roots: ['<rootDir>/tests'],

  // Add the new setup file here
  setupFiles: ['<rootDir>/tests/jest-globals-setup.js'],

  // Run a setup file to configure MSW before tests
  setupFilesAfterEnv: ['<rootDir>/tests/mocks/setup.js'],

  // Ignore files or directories from coverage
  coveragePathIgnorePatterns: [
    'src/index.js',
    '/node_modules/',
    '/vendor/',
    '/examples/',
    '/tests/mocks/',
    '-types\\.js$',
    '.types\\.js$',
    '-handlers\\.js$',
    '.handlers\\.js$',
    '-schemas\\.js$',
    '.schemas\\.js$'
  ]
};