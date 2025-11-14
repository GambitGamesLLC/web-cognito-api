/**
 * configure-api.js
 * @file Handles API requests related to configuring the Amplify Api.
 * @description Provides a singleton class, `ConfigureApi`. 
 * This file centralizes all Amplify configuration logic.
 * The `ConfigureApi` class here is created automatically by the CognitoApiManager class during construction
 * @exports {ConfigureApi}
 * @requires {CognitoApiManager} from '../cognito-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify } from '@aws-amplify/core';

/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 */

//#endregion

/**
 * Handles configuration of the AWS Amplify Api
 */
export class ConfigureApi 
{

    //#region PRIVATE - VARIABLES

    //#endregion

    //#region PUBLIC - CONSTRUCTOR

    /**
     * Constructor for the Api
     */
    //----------------------------------------------//
    constructor() 
    //----------------------------------------------//
    {

    } //END Constructor Method

    //#endregion

    //#region PUBLIC - CONFIGURE

    /**
     * Sets the Amplify configuration file
     * 
     * @documentation https://docs.amplify.aws/javascript/start/connect-to-aws-resources/
     * 
     * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns {Promise<ResourcesConfig>} The resources configuration set up with Amplify
     */
    // ----------------------------------------------------------------- //
    async Configure( config ) 
    // ----------------------------------------------------------------- //
    {
        if( config === undefined || config === null )
        {
            throw new Error( "web-cognito-api configure.js Configure() passed in 'config' parameter is undefined or null" );
        }

        try
        {
            /**
             * Passes our configuration file into the core Amplify object
             */
            Amplify.configure(config);

            return await Amplify.getConfig();
        }
        catch(error)
        {
            // Re-throw the error to ensure the promise is rejected.
            throw new Error( `web-cognito-api configure.js Configure() Error: ${error.message}` );
        }
        
    } //END Configure() Method

    //#endregion
    
} //END ConfigureApi Class