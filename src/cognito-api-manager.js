/**
 * cognito-api-manager.js
 * @file Singleton class for interacting with the Cognito API.
 * @description This file exports the CognitoApiManager singleton, 
 * which centralizes AWS Cognito requests 
 * @exports {CognitoApiManager}
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify } from 'aws-amplify';

//#endregion

/**
 * Passes our configuration file into the core Amplify object
 */
Amplify.configure(config);

// debug log the configuration file
console.log(config);

export { Amplify };