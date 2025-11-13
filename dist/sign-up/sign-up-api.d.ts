/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 */
/**
 * Handles sign-up logic within the AWS Amplify Api
 */
export class SignUpApi {
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
    SignUp(username: string, password: string, attributes: object | null): Promise<SignUpOutput>;
}
export type ResourcesConfig = import("@aws-amplify/core").ResourcesConfig;
export type AuthNextSignUpStep = import("@aws-amplify/auth/dist/esm/types").AuthNextSignUpStep;
export type SignUpOutput = import("@aws-amplify/auth").SignUpOutput;
