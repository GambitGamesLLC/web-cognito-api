/**
 * @jest-environment jsdom
 */

// Mock the AWS Amplify auth module
import { confirmSignUp } from '@aws-amplify/auth';
import { ConfirmSignUpApi } from '../../src/confirm-sign-up/confirm-sign-up-api.js';

// Mock the entire module
jest.mock('@aws-amplify/auth', () => ({
    confirmSignUp: jest.fn(),
}));

describe('ConfirmSignUpApi', () => {
    let confirmSignUpApi;

    beforeEach(() => {
        // Reset mocks before each test
        confirmSignUp.mockClear();
        confirmSignUpApi = new ConfirmSignUpApi();
    });

    describe('ConfirmSignUp', () => {

        it('should call Amplify confirmSignUp and return the output on success', async () => {
            const confirmSignUpInput = {
                username: 'testuser',
                confirmationCode: '123456',
            };
            const expectedOutput = {
                isSignUpComplete: true,
                nextStep: { signUpStep: 'DONE' },
            };

            // Configure the mock to return a resolved promise with the expected output
            confirmSignUp.mockResolvedValue(expectedOutput);

            const result = await confirmSignUpApi.ConfirmSignUp(confirmSignUpInput);

            // Verify that confirmSignUp was called with the correct parameters
            expect(confirmSignUp).toHaveBeenCalledWith(confirmSignUpInput);
            expect(confirmSignUp).toHaveBeenCalledTimes(1);

            // Verify that the result is what we expect
            expect(result).toEqual(expectedOutput);
        });

        it('should throw a formatted error if Amplify confirmSignUp fails', async () => {
            const confirmSignUpInput = {
                username: 'testuser',
                confirmationCode: '123456',
            };
            const originalError = new Error('Some Cognito error');

            // Configure the mock to reject with an error
            confirmSignUp.mockRejectedValue(originalError);

            // Verify that the method throws a formatted error
            await expect(confirmSignUpApi.ConfirmSignUp(confirmSignUpInput)).rejects.toThrow('ConfirmSignUp Error: Some Cognito error');
        });

    });
});