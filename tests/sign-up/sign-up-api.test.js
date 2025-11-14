/**
 * sign-up-api.test.js
 * @jest-environment jsdom
 * @file Test suite for the SignUpApi class.
 * @description This file contains integration tests for the `SignUp` method in the `SignUpApi` class,
 * intended to be run against a live AWS Cognito User Pool.
 * @requires {SignUpApi} from '../../src/sign-up/sign-up-api.js'
 */

import { SignUpApi } from '../../src/sign-up/sign-up-api.js';
import { CognitoApiManager } from '../../src/cognito-api-manager.js';
import amplifyConfig from '../../examples/amplifyconfiguration.json';

/**
 * Generates a unique username for each test run to avoid conflicts.
 * @returns {string} A unique username string.
 */
const generateUniqueUsername = () => `testuser-${Date.now()}@example.com`;


describe('SignUpApi', () => {
    let signUpApi;

    beforeEach(async () => {
        // Configure Amplify using the CognitoApiManager before each test.
        // This is necessary for the Amplify library to be initialized.
        const manager = CognitoApiManager.GetInstance();
        await manager.Configure(amplifyConfig);
        signUpApi = new SignUpApi();
    });

    describe('SignUp', () => {
        it('should successfully sign up a user and return confirmation details', async () => {
            const username = generateUniqueUsername();
            const password = 'Password123!';
            const attributes = { email: username, name: 'Test User' };

            const result = await signUpApi.SignUp(username, password, attributes);

            // Assertions for a live environment.
            expect(result.isSignUpComplete).toBe(false);
            expect(result.nextStep.signUpStep).toBe('CONFIRM_SIGN_UP');
            expect(result.userId).toBeDefined();
            // Cognito redacts the destination email for security, so we just check that it's defined.
            expect(result.nextStep.codeDeliveryDetails.destination).toBeDefined();
        });

        it('should successfully sign up a user without optional attributes', async () => {
            const username = generateUniqueUsername();
            const password = 'Password123!';

            const result = await signUpApi.SignUp(username, password, null);

            // Assertions for a live environment.
            expect(result.isSignUpComplete).toBe(false);
            expect(result.nextStep.signUpStep).toBe('CONFIRM_SIGN_UP');
            expect(result.userId).toBeDefined();
        });

        // This test is skipped because it requires specific, non-default Cognito pool settings (e.g., auto-confirmation).
        it.skip('should return isSignUpComplete as true if user is auto-confirmed', async () => {
            const username = generateUniqueUsername();
            const password = 'Password123!';

            const result = await signUpApi.SignUp(username, password);

            expect(result.isSignUpComplete).toBe(true);
            expect(result.nextStep.signUpStep).toBe('DONE');
        });

        it('should reject with an error if username is not provided', async () => {
            await expect(signUpApi.SignUp(null, 'Password123!')).rejects.toThrow(
                'web-cognito-api sign-up-api.js SignUp() Error: username cannot be null, undefined, or empty.',
            );
        });

        it('should reject with an error if password is not provided', async () => {
            await expect(signUpApi.SignUp('testuser@example.com', '')).rejects.toThrow(
                'web-cognito-api sign-up-api SignUp() Error: password cannot be null, undefined, or empty.'
            );
        });

        it('should reject with a wrapped error if Cognito service returns an error', async () => {
            // This test requires a user to be created first to test the "already exists" case.
            const username = generateUniqueUsername();
            const password = 'Password123!';

            // First, sign up the user.
            await signUpApi.SignUp(username, password);

            // Then, attempt to sign up the same user again and expect an error.
            await expect(signUpApi.SignUp(username, password)).rejects.toThrow(
                'web-cognito-api sign-up-api SignUp() Error: User already exists.'
            );
        });

        it('should handle InvalidPasswordException from Cognito', async () => {
            const username = generateUniqueUsername();
            const password = 'invalid-password';

            // This test will depend on the password policy of your Cognito user pool.
            // The default policy requires a minimum length, numbers, symbols, and uppercase/lowercase letters.
            await expect(signUpApi.SignUp(username, password)).rejects.toThrow(
                'web-cognito-api sign-up-api SignUp() Error: Invalid password format. The password does not meet the policy requirements.'
            );
        });
    });
});