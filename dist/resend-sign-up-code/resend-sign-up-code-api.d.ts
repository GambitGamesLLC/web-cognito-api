/**
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeInput } ResendSignUpCodeInput
 * @typedef {import('@aws-amplify/auth').ResendSignUpCodeOutput} ResendSignUpCodeOutput
 */
/**
 * Handles resend sign-up code logic within the AWS Amplify Api
 */
export class ResendSignUpCodeApi {
    /**
     * Resends the new user sign up confirmation code
     *
     * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/multi-step-sign-in/#confirm-signup
     * @param {ResendSignUpCodeInput} resendSignUpCodeInput The object holding onto our data used to resend our new user confirmation code
     * @returns {Promise<ResendSignUpCodeOutput>} The 'ResendSignUpCodeOutput' property returned by Amplify after resending a new user confirmation code
     */
    ResendSignUpCode(resendSignUpCodeInput: ResendSignUpCodeInput): Promise<ResendSignUpCodeOutput>;
}
export type ResendSignUpCodeInput = import("@aws-amplify/auth").ResendSignUpCodeInput;
export type ResendSignUpCodeOutput = import("@aws-amplify/auth").ResendSignUpCodeOutput;
