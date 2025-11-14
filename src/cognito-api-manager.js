/**
 * cognito-api-manager.js
 * @file Singleton class for interacting with the Cognito API.
 * @description This file exports the CognitoApiManager singleton, 
 * which centralizes AWS Cognito requests 
 * @exports {CognitoApiManager}
 */

//#region IMPORTS

import { ConfigureApi } from './configure/configure-api.js';
import { SignUpApi } from './sign-up/sign-up-api.js';
import { ConfirmSignUpApi } from './confirm-sign-up/confirm-sign-up-api.js';

//#endregion

/**
 * Singleton class for interacting with the Cognito API
 * @class
 */
export class CognitoApiManager 
{
    
    //#region PRIVATE - VARIABLES

    /** 
     * @private
     * @type {ConfigureApi} 
     **/
    #configureApi = null;

    /** 
     * @private
     * @type {SignUpApi} 
     **/
    #signUpApi = null;

    /** 
     * @private
     * @type {ConfirmSignUpApi} 
     **/
    #confirmSignUpApi = null;

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

        //We only need to generate our helper classes once
        this.#configureApi = new ConfigureApi(this);
        this.#signUpApi = new SignUpApi(this);
        this.#confirmSignUpApi = new ConfirmSignUpApi(this);
        
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

    //#region PUBLIC - SHORTCUTS - ConfigureApi

    /**
     * Sets the Amplify configuration file
     * 
     * @documentation https://docs.amplify.aws/javascript/start/connect-to-aws-resources/
     * 
     * @param {import('@aws-amplify/core').ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns {Promise<import('@aws-amplify/core').ResourcesConfig>} The resources configuration set up with Amplify
     */
    async Configure( config ){ return this.#configureApi.Configure( config ); }

    //#endregion

    //#region PUBLIC - SHORTCUTS - SignUpApi

    /**
     * Creates a new user within the Cognito user pool. 
     * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a code to continue sign up
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * 
     * @param {string} username The name for the new user. Specific format depends on the user pool settings in your AWS console.
     * @param {string} password The password for the new user
     * @param {object | null} [attributes] [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
     * @returns {Promise<import('@aws-amplify/auth').SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    async SignUp( username, password, attributes ){ return this.#signUpApi.SignUp( username, password, attributes ); }

    //#endregion

    //#region PUBLIC - SHORTCUTS - ConfirmSignUpApi

    /**
     * Confirms a new user within the Cognito user pool. 
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
     * @returns {Promise<import('@aws-amplify/auth').ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
     */
    async ConfirmSignUp( confirmSignUpInput ){ return this.#confirmSignUpApi.ConfirmSignUp( confirmSignUpInput ); }

    //#endregion

} //END CognitoApiManager Class