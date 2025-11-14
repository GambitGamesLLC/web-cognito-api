/**
 * confirm-sign-up-api.js
 * @file Handles API requests related to confirming sign-up with the Amplify Cognito Api.
 * @description Provides a singleton class, `ConfirmSignUpApi`. 
 * This file centralizes all Amplify Cognito sign-up confirmation logic.
 * The `ConfirmSignUpApi` class here is created automatically by the CognitoApiManager class during construction
 * @exports {ConfirmSignUpApi}
 * @requires {CognitoApiManager} from '../cognito-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify } from '@aws-amplify/core';

// Import the confirmSignUp method from the auth library
import { confirmSignUp } from '@aws-amplify/auth';

/**
 * @typedef {import('@aws-amplify/auth').ConfirmSignUpOutput} ConfirmSignUpOutput
 */

//#endregion

/**
 * Handles sign-up confirmation logic within the AWS Amplify Api
 */
export class ConfirmSignUpApi 
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

    //#region PUBLIC - CONFIRM SIGN UP

    /**
     * Confirms a new user within the Cognito user pool. 
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
     * @returns {Promise<ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
     */
    // ----------------------------------------------------------------- //
    async ConfirmSignUp( confirmSignUpInput ) 
    // ----------------------------------------------------------------- //
    {
        try
        {
            console.log( confirmSignUpInput );

            /**
             * @type {import('@aws-amplify/auth').ConfirmSignUpOutput} The output of the Amplify confirmSignUp request
             */
            const confirmSignUpOutput = await confirmSignUp( confirmSignUpInput );
            
            return confirmSignUpOutput;
        }
        catch( error )
        {
            // Standardize common Cognito error messages for consistent error handling.
            const errorMessage = error.message;

            throw new Error(`ConfirmSignUp Error: ${errorMessage}`);
        }
        
    } //END ConfirmSignUp() Method

    //#endregion

} //END ConfigureApi Class