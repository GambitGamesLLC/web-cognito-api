/**
 * index.js
 * @file Primary entry point for the web-cognito-api package.
 * @description This file consolidates the main components of the package, re-exporting the core CognitoApiManager, as well as all JSDoc type definitions, to provide a single, clean import path for consumers of the library.
 * @exports {CognitoApiManager}
 * @exports {object} all JSDoc type definitions
 */

// Export the main manager class so users can instantiate it
export { CognitoApiManager } from './cognito-api-manager.js';

// Re-export type definitions
export * from './configure/configure-api.types.js';
export * from './sign-up/sign-up-api.types.js';

// Re-export type definitions from the 'joi' schemas
export * from './configure/configure-api.schemas.js';
export * from './sign-up/sign-up-api.schemas.js';
