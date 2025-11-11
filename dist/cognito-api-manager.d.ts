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
     * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns void
     */
    Configure(config: ResourcesConfig): void;
    /**
     * Creates a new user within the user pool
     * @param {string} username The name for the new user
     * @param {string} password The password for the new user
     * @param {object} attributes An object of user attributes, e.g., { email: 'user@example.com' }
     * @returns {Promise<SignUpOutput['nextStep']>} The 'nextStep' property returned by Amplify after a user is successfully created in the user pool
     */
    CreateUser(username: string, password: string, attributes: object): Promise<SignUpOutput["nextStep"]>;
}
export type ResourcesConfig = import("@aws-amplify/core").ResourcesConfig;
export type AuthNextSignUpStep = import("@aws-amplify/auth/dist/esm/types").AuthNextSignUpStep;
export type SignUpOutput = import("@aws-amplify/auth").SignUpOutput;
