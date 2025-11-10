//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify, ResourcesConfig, LibraryOptions } from 'aws-amplify';
import config from './amplifyconfiguration.json';

//#endregion

/**
 * Passes our configuration file into the core Amplify object
 */
Amplify.configure( config );

// debug log the configuration file
console.log(config);