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
     * Reference to the ConfigureAPI object
     * @type {ConfigureApi}
     * */
    configureApi: ConfigureApi;
    /**
     * Reference to the SignUpApi object
     * @type {SignUpApi}
     * */
    signUpApi: SignUpApi;
}
import { ConfigureApi } from './configure/configure-api.js';
import { SignUpApi } from './sign-up/sign-up-api.js';
