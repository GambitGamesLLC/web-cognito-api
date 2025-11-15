/**
 * resend-sign-up-code-api.test.js
 * @file Test suite for the ResendSignUpCodeApi class.
 */

import { resendSignUpCode } from '@aws-amplify/auth';
import { ResendSignUpCodeApi } from '../../src/resend-sign-up-code/resend-sign-up-code-api.js';

// Mock the underlying Amplify Auth function
jest.mock('@aws-amplify/auth', () => ({
    resendSignUpCode: jest.fn(),
}));

describe('ResendSignUpCodeApi', () => {
    let resendSignUpCodeApi;

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        resendSignUpCodeApi = new ResendSignUpCodeApi();
    });

    describe('ResendSignUpCode', () => {
        const mockInput = { username: 'testuser' };
        const mockOutput = {
            destination: 'test@example.com',
            deliveryMedium: 'EMAIL',
        };

        it('should call Amplify resendSignUpCode and return the output on success', async () => {
            // Arrange
            resendSignUpCode.mockResolvedValue(mockOutput);

            // Act
            const result = await resendSignUpCodeApi.ResendSignUpCode(mockInput);

            // Assert
            expect(resendSignUpCode).toHaveBeenCalledWith(mockInput);
            expect(resendSignUpCode).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockOutput);
        });

        it('should throw a formatted error if Amplify resendSignUpCode fails', async () => {
            // Arrange
            const amplifyError = new Error('User not found');
            resendSignUpCode.mockRejectedValue(amplifyError);

            // Act & Assert
            await expect(resendSignUpCodeApi.ResendSignUpCode(mockInput)).rejects.toThrow(
                `web-cognito-api resend-sign-up-code-api ResendSignUpCode() Error: ${amplifyError.message}`
            );
            expect(resendSignUpCode).toHaveBeenCalledWith(mockInput);
            expect(resendSignUpCode).toHaveBeenCalledTimes(1);
        });

        it('should throw an error if input is null', async () => {
            // Act & Assert
            await expect(resendSignUpCodeApi.ResendSignUpCode(null)).rejects.toThrow(
                'web-cognito-api resend-sign-up-code-api.js ResendSignUpCode() Error: resendSignUpCodeInput cannot be null, undefined, or empty.'
            );
        });

        it('should throw an error if input is undefined', async () => {
            // Act & Assert
            await expect(resendSignUpCodeApi.ResendSignUpCode(undefined)).rejects.toThrow(
                'web-cognito-api resend-sign-up-code-api.js ResendSignUpCode() Error: resendSignUpCodeInput cannot be null, undefined, or empty.'
            );
        });
    });
});