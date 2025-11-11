/**
 * cognito-api-manager.js
 * @file Singleton class for interacting with the Cognito API.
 * @description This file exports the CognitoApiManager singleton, 
 * which centralizes AWS Cognito requests 
 * @exports {CognitoApiManager}
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify, ResourcesConfig } from '@aws-amplify/core';

//#endregion

/**
 * Singleton class for interacting with the Cognito API
 * @class
 */
export class CognitoApiManager 
{
    
    //#region PRIVATE - VARIABLES

    //#endregion

    //#region PUBLIC - VARIABLES

    //#endregion

    //#region PUBLIC - CONSTRUCTOR

    /**
     * Initializes the CognitoApiManager singleton, preparing it for use
     */
    //------------------------------------------------//
    constructor() 
    //------------------------------------------------//
    {
        // Singleton check
        if (CognitoApiManager.instance) 
        {
            return CognitoApiManager.instance;
        }

        // Sets the singleton reference so we know we've already called the constructor, preventing duplicates
        CognitoApiManager.instance = this;

    } //END constructor() Method

    //#endregion
    
    //#region PUBLIC - GET INSTANCE

    /**
     * Get the single instance of the CognitoApiManager
     * @returns {CognitoApiManager} The CognitoApiManager instance
     */
    // ----------------------------------------------------------------- //
    static GetInstance() 
    // ----------------------------------------------------------------- //
    {
        if( !CognitoApiManager.instance )
        {
            CognitoApiManager.instance = new CognitoApiManager();
        }

        return CognitoApiManager.instance;

    } //END GetInstance() Method

    //#endregion

    //#region PUBLIC - CONFIGURE

    /**
     * Sets the Amplify configuration file
     * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
     */
    // ----------------------------------------------------------------- //
    Configure( config ) 
    // ----------------------------------------------------------------- //
    {
        /**
         * Passes our configuration file into the core Amplify object
         */
        Amplify.configure(config);

        // Debug the configuration file
        console.log(config);

    } //END Configure() Method

    //#endregion

} //END CognitoApiManager Class