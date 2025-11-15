/**
 * @typedef {import('@aws-amplify/auth').SignUpInput } SignUpInput
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 */
/**
 * Handles sign-up logic within the AWS Amplify Api
 */
export class SignUpApi {
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
}
export type SignUpInput = import("@aws-amplify/auth").SignUpInput;
export type SignUpOutput = import("@aws-amplify/auth").SignUpOutput;
