/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 */
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
     * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns {Promise<ResourcesConfig>} The resources configuration set up with Amplify
     */
    Configure(config: ResourcesConfig): Promise<ResourcesConfig>;
    /**
     * Creates a new user within the user pool
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     *
     * @param {string} username The name for the new user. Specific format depends on the user pool settings in your AWS console.
     * @param {string} password The password for the new user
     * @param {object | null} attributes [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
     * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    SignUp(username: string, password: string, attributes: object | null): Promise<SignUpOutput>;
}
export type ResourcesConfig = import("@aws-amplify/core").ResourcesConfig;
export type AuthNextSignUpStep = import("@aws-amplify/auth/dist/esm/types").AuthNextSignUpStep;
export type SignUpOutput = import("@aws-amplify/auth").SignUpOutput;
