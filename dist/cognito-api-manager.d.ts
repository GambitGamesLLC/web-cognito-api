/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
 * @typedef {import('@aws-amplify/auth').SignUpInput} SignUpInput
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeInput} ResendSignUpCodeInput
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeOutput} ResendSignUpCodeOutput
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
     * Creates a new user within the Cognito user pool.
     * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a confimration code to continue sign up
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     *
     * @param {SignUpInput} signUpInput The input object used to sign up a new user to our Cognito User Pool
     * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
     */
    SignUp(signUpInput: SignUpInput): Promise<SignUpOutput>;
    /**
     * Confirms a new user within the Cognito user pool.
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
     * @returns {Promise<import('@aws-amplify/auth').ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
     */
    ConfirmSignUp(confirmSignUpInput: ConfirmSignUpInput): Promise<import("@aws-amplify/auth").ConfirmSignUpOutput>;
    /**
     * Resends the new user sign up confirmation code
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/multi-step-sign-in/#confirm-signup
     * @param {ResendSignUpCodeInput} resendSignUpCodeInput The object holding onto our data used to resend our new user confirmation code
     * @returns {Promise<ResendSignUpCodeOutput>} The 'ResendSignUpCodeOutput' property returned by Amplify after resending a new user confirmation code
     */
    ResendSignUpCode(resendSignUpCodeInput: ResendSignUpCodeInput): Promise<ResendSignUpCodeOutput>;
    #private;
}
export type ResourcesConfig = import("@aws-amplify/core").ResourcesConfig;
export type AuthNextSignUpStep = import("@aws-amplify/auth/dist/esm/types").AuthNextSignUpStep;
export type SignUpInput = import("@aws-amplify/auth").SignUpInput;
export type SignUpOutput = import("@aws-amplify/auth").SignUpOutput;
export type ResendSignUpCodeInput = import("@aws-amplify/auth").ResendSignUpCodeInput;
export type ResendSignUpCodeOutput = import("@aws-amplify/auth").ResendSignUpCodeOutput;
