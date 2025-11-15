/**
 * sign-up-api.js
 * @file Handles API requests related to sign-up with the Amplify Cognito Api.
 * @description Provides a singleton class, `SignUpApi`. 
 * This file centralizes all Amplify Cognito sign-up logic.
 * The `SignUpApi` class here is created automatically by the CognitoApiManager class during construction
 * @exports {SignUpApi}
 * @requires {CognitoApiManager} from '../cognito-api-manager.js'
 * @requires {Joi} for schema validation
 */

//#region IMPORTS

// Importing Amplify From the AWS Amplify Lib
import { Amplify } from '@aws-amplify/core';

// Import the signUp method from the auth library
import { signUp } from '@aws-amplify/auth';

/**
 * @typedef {import('@aws-amplify/auth').SignUpInput } SignUpInput
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 */

//#endregion

/**
 * Handles sign-up logic within the AWS Amplify Api
 */
export class SignUpApi 
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

    //#region PUBLIC - SIGN UP

    /**
     * Creates a new user within the Cognito user pool. 
     * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a confimration code to continue sign up
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * 
     * @param {SignUpInput} signUpInput The input object used to sign up a new user to our Cognito User Pool
     * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    // ----------------------------------------------------------------- //
    async SignUp( signUpInput ) 
    // ----------------------------------------------------------------- //
    {
        if( signUpInput === undefined || signUpInput === null )
        {
            throw new Error("web-cognito-api sign-up-api.js SignUp() Error: signUpInput cannot be null, undefined, or empty." );
        }

        try
        {
            /**
             * @type {SignUpOutput} The output of the Amplify signUp request
             */
            let signUpOutput = await signUp( signUpInput);

            return signUpOutput;
        }
        catch(error)
        {
            // Standardize common Cognito error messages for consistent error handling.
            let errorMessage = error.message;
            
            if (error.name === 'UsernameExistsException') 
            {
                errorMessage = 'User already exists.';
            } 
            else if (error.name === 'InvalidPasswordException') 
            {
                // The specific password policy message can vary, so we generalize it.
                errorMessage = 'Invalid password format. The password does not meet the policy requirements.';
            } 
            else if (error.message.includes('Password did not conform with policy')) 
            {
                // Catch another variant of the password policy error.
                errorMessage = 'Invalid password format. The password does not meet the policy requirements.';
            }

            throw new Error(`web-cognito-api sign-up-api SignUp() Error: ${errorMessage}`);
        }
        
    } //END SignUp() Method

    //#endregion

} //END ConfigureApi Class