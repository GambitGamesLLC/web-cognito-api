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
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
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
     * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a code to continue sign up
     * 
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * 
     * @param {string} username The name for the new user. Specific format depends on the user pool settings in your AWS console.
     * @param {string} password The password for the new user
     * @param {object | null} attributes [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
     * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    // ----------------------------------------------------------------- //
    async SignUp( username, password, attributes ) 
    // ----------------------------------------------------------------- //
    {
        if (!username) 
        {
            throw new Error("web-cognito-api sign-up-api.js SignUp() Error: username cannot be null, undefined, or empty." );
        }

        if (!password) 
        {
            throw new Error("web-cognito-api sign-up-api SignUp() Error: password cannot be null, undefined, or empty." );
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
                }
            });

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