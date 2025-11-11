/**
 * index.js
 * @file Primary entry point for the web-cognito-api package.
 * @description This file consolidates the main components of the package, re-exporting the core CognitoApiManager, as well as all JSDoc type definitions, to provide a single, clean import path for consumers of the library.
 * @exports {CognitoApiManager}
 * @exports {object} all JSDoc type definitions
 */

// Export the main manager class so users can instantiate it
export { CognitoApiManager } from './cognito-api-manager.js';

// Re-export the empty object for each types definition file.
// This allows JSDoc-aware editors to find and use
// the JSDoc @typedefs for type checking

export * from './cognito-api-manager.js'; // This is for the class
export * from './cognito-api-manager.js'; // This is for the types

// Re-export the type definitions from the 'joi' schemas


// Re-export the error classes