/**
 * @typedef {import('@aws-amplify/auth').ConfirmSignUpOutput} ConfirmSignUpOutput
 */
/**
 * Handles sign-up confirmation logic within the AWS Amplify Api
 */
export class ConfirmSignUpApi {
    /**
     * Confirms a new user within the Cognito user pool.
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
     * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
     * @returns {Promise<ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
     */
    ConfirmSignUp(confirmSignUpInput: ConfirmSignUpInput): Promise<ConfirmSignUpOutput>;
}
export type ConfirmSignUpOutput = import("@aws-amplify/auth").ConfirmSignUpOutput;
