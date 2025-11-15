/**
 * resend-sign-up-code-api.js
 * @file Handles API requests related to resending the sign up code via the Amplify Cognito Api.
 * @description Provides a singleton class, `ResendSignUpCodeApi`. 
 * This file centralizes all Amplify Cognito sign-up logic regarding resending the sign up code.
 * The `ResendSignUpCodeApi` class here is created automatically by the CognitoApiManager class during construction
 * @exports {ResendSignUpCodeApi}
 * @requires {CognitoApiManager} from '../cognito-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify } from '@aws-amplify/core';

// Import the resendSignUp method from the auth library
import { resendSignUpCode } from '@aws-amplify/auth';

/**
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeInput } ResendSignUpCodeInput
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeOutput} ResendSignUpCodeOutput
 */

//#endregion

/**
 * Handles resend sign-up code logic within the AWS Amplify Api
 */
export class ResendSignUpCodeApi 
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

    //#region PUBLIC - RESEND SIGN UP CODE

    /**
     * Resends the new user sign up confirmation code 
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/multi-step-sign-in/#confirm-signup
     * @param {ResendSignUpCodeInput} resendSignUpCodeInput The object holding onto our data used to resend our new user confirmation code
     * @returns {Promise<ResendSignUpCodeOutput>} The 'ResendSignUpCodeOutput' property returned by Amplify after resending a new user confirmation code
     */
    // ----------------------------------------------------------------- //
    async ResendSignUpCode( resendSignUpCodeInput ) 
    // ----------------------------------------------------------------- //
    {
        if( resendSignUpCodeInput === undefined || resendSignUpCodeInput === null )
        {
            throw new Error("web-cognito-api resend-sign-up-code-api.js ResendSignUpCode() Error: resendSignUpCodeInput cannot be null, undefined, or empty." );
        }

        try
        {
            /**
             * @type {ResendSignUpCodeOutput} The output of the Amplify resendSignUpCode request
             */
            let resendSignUpCodeOutput = await resendSignUpCode( resendSignUpCodeInput );

            return resendSignUpCodeOutput;
        }
        catch(error)
        {
            // Standardize common Cognito error messages for consistent error handling.
            let errorMessage = error.message;
            
            throw new Error(`web-cognito-api resend-sign-up-code-api ResendSignUpCode() Error: ${errorMessage}`);
        }
        
    } //END ResendSignUpCode() Method

    //#endregion

} //END ConfigureApi Class