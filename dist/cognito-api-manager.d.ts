/**
 * Singleton class for interacting with the Cognito API
 * @class
 */
export class CognitoApiManager {
    /**
     * Get the single instance of the CognitoApiManager
     * @returns {CognitoApiManager} The CognitoApiManager instance
     */
    static GetInstance(): CognitoApiManager;
    /**
     * Sets the Amplify configuration file
     *
     * @documentation https://docs.amplify.aws/javascript/start/connect-to-aws-resources/
     *
     * @param {import('@aws-amplify/core').ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns {Promise<import('@aws-amplify/core').ResourcesConfig>} The resources configuration set up with Amplify
     */
    Configure(config: import("@aws-amplify/core").ResourcesConfig): Promise<import("@aws-amplify/core").ResourcesConfig>;
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
    SignUp(username: string, password: string, attributes?: object | null): Promise<import("@aws-amplify/auth").SignUpOutput>;
    /**
     * Confirms a new user within the Cognito user pool.
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
     * @returns {Promise<import('@aws-amplify/auth').ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
     */
    ConfirmSignUp(confirmSignUpInput: ConfirmSignUpInput): Promise<import("@aws-amplify/auth").ConfirmSignUpOutput>;
    #private;
}
