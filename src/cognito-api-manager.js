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
import { ResendSignUpCodeApi } from './resend-sign-up-code/resend-sign-up-code-api.js';

/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
 * @typedef {import('@aws-amplify/auth').SignUpInput} SignUpInput
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeInput} ResendSignUpCodeInput
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeOutput} ResendSignUpCodeOutput
 */

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

    /** 
     * @private
     * @type {ResendSignUpCodeApi} 
     **/
    #resendSignUpCodeApi = null;

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
        this.#resendSignUpCodeApi = new ResendSignUpCodeApi(this);

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
     * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns {Promise<ResourcesConfig>} The resources configuration set up with Amplify
     */
    async Configure( config ){ return this.#configureApi.Configure( config ); }

    //#endregion

    //#region PUBLIC - SHORTCUTS - SignUpApi

    /**
     * Creates a new user within the Cognito user pool. 
     * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a confimration code to continue sign up
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * 
     * @param {SignUpInput} signUpInput The input object used to sign up a new user to our Cognito User Pool
     * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    async SignUp( signUpInput ){ return this.#signUpApi.SignUp( signUpInput ); }

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

    //#region PUBLIC - SHORTCUTS - ResendSignUpCodeApi

    /**
     * Resends the new user sign up confirmation code 
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/multi-step-sign-in/#confirm-signup
     * @param {ResendSignUpCodeInput} resendSignUpCodeInput The object holding onto our data used to resend our new user confirmation code
     * @returns {Promise<ResendSignUpCodeOutput>} The 'ResendSignUpCodeOutput' property returned by Amplify after resending a new user confirmation code
     */
    async ResendSignUpCode( resendSignUpCodeInput ){ return this.#resendSignUpCodeApi.ResendSignUpCode( resendSignUpCodeInput ); }

    //#endregion

} //END CognitoApiManager Class