/**
 * cognito-api-manager.js
 * @file Singleton class for interacting with the Cognito API.
 * @description This file exports the CognitoApiManager singleton, 
 * which centralizes AWS Cognito requests 
 * @exports {CognitoApiManager}
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify } from '@aws-amplify/core';

// Import the signUp method from the auth library
import { signUp } from '@aws-amplify/auth';

/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 */

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
            Promise.reject( new Error( "cognito-api-manager.js Configure() passed in 'config' parameter is undefined or null" ) );
        }

        try
        {
            /**
             * Passes our configuration file into the core Amplify object
             */
            Amplify.configure(config);

            return Amplify.getConfig();
        }
        catch(error)
        {
            Promise.reject( new Error( "cognito-api-manager.js Configure() Error: " + error ) );
        }
        
    } //END Configure() Method

    //#endregion
    
    //#region PUBLIC - CREATE USER

    /**
     * Creates a new user within the user pool
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * 
     * @param {string} username The name for the new user. May either be a 
     * @param {string} password The password for the new user
     * @param {object | null} attributes [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
     * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    // ----------------------------------------------------------------- //
    async CreateUser( username, password, attributes ) 
    // ----------------------------------------------------------------- //
    {
        if (!username) 
        {
            return Promise.reject( new Error("cognito-api-manager.js CreateUser() Error: username cannot be null, undefined, or empty." ) );
        }

        if (!password) 
        {
            return Promise.reject( new Error("cognito-api-manager.js CreateUser() Error: password cannot be null, undefined, or empty." ) );
        }

        if (attributes === undefined || attributes === null) 
        {
            attributes = {};
        }

        try
        {
            /**
             * @type {SignUpOutput} The output of the Amplify signUp request
             */
            let signUpOutput = await signUp
            ({
                username,
                password,
                options: 
                {
                    userAttributes: attributes,
                    // autoSignIn: true // Optional: Signs in the user automatically after sign-up
                }
            });

            console.log(`cognito-api-manager.js CreateUser() Successfully signed up user ${signUpOutput.userId}`);
            console.log('cognito-api-manager.js CreateUser() Next step:', signUpOutput.nextStep);

            return signUpOutput;
        }
        catch(error)
        {
            return Promise.reject( new Error("cognito-api-manager.js CreateUser() Error: " + error ));
        }
        
    } //END CreateUser() Method

    //#endregion

} //END CognitoApiManager Class