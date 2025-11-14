/**
 * babel.config.js
 * @file Babel configuration for transpiling JavaScript files, used by Jest.
 * @description This configuration ensures that modern JavaScript (ESM, etc.)
 * is correctly transformed into a format that Jest can execute in its test environment.
 */
export default {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};