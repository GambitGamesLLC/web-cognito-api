/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
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
     */
    Configure(config: ResourcesConfig): void;
}
export type ResourcesConfig = import("@aws-amplify/core").ResourcesConfig;
