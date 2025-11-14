/**
 * setup.js
 * @file Provides global setup for the test environment.
 * @description This script polyfills browser APIs that may be missing in the JSDOM environment
 * but are required by dependencies like the AWS Amplify library.
 */

import 'whatwg-fetch'; // Polyfill for the 'fetch' browser API, which is missing in JSDOM.

import { TextEncoder } from 'node:util'; // Import the TextEncoder from Node.js's 'util' module.

// Manually expose TextEncoder to the global scope for the tests.
// This is required by the AWS Amplify library for some cryptographic operations.
global.TextEncoder = TextEncoder;