/**
 * cognito-api-manager.test.js
 * @file Test suite for the CognitoApiManager class.
 * @description This file contains Jest tests for the `CognitoApiManager` singleton.
 * It verifies the singleton pattern, constructor logic, and that method calls
 * are correctly delegated to the respective API helper classes.
 * @requires {CognitoApiManager} from '../../src/cognito-api-manager.js'
 * @requires {ConfigureApi} from '../../src/configure/configure-api.js'
 * @requires {SignUpApi} from '../../src/sign-up/sign-up-api.js'
 * @requires {ConfirmSignUpApi} from '../../src/confirm-sign-up/confirm-sign-up-api.js'
 */

import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import { CognitoApiManager } from '../src/cognito-api-manager.js';
import { ConfigureApi } from '../src/configure/configure-api.js';
import { SignUpApi } from '../src/sign-up/sign-up-api.js';
import { ConfirmSignUpApi } from '../src/confirm-sign-up/confirm-sign-up-api.js';

// Mock the API helper classes to isolate the CognitoApiManager for testing.
jest.mock('../src/configure/configure-api.js');
jest.mock('../src/sign-up/sign-up-api.js');
jest.mock('../src/confirm-sign-up/confirm-sign-up-api.js');

describe('CognitoApiManager', () => {

    // Before each test, reset the singleton instance and clear mocks.
    // This ensures that tests are independent and don't interfere with each other.
    beforeEach(() => {
        CognitoApiManager.instance = null;
        ConfigureApi.mockClear();
        SignUpApi.mockClear();
        ConfirmSignUpApi.mockClear();
    });

    describe('Singleton Pattern', () => {
        it('should return an instance of CognitoApiManager when GetInstance is called', () => {
            const instance = CognitoApiManager.GetInstance();
            expect(instance).toBeInstanceOf(CognitoApiManager);
        });

        it('should return the same instance on multiple calls to GetInstance', () => {
            const instance1 = CognitoApiManager.GetInstance();
            const instance2 = CognitoApiManager.GetInstance();
            expect(instance1).toBe(instance2);
        });

        it('should return the same instance when using the constructor after GetInstance', () => {
            const instance1 = CognitoApiManager.GetInstance();
            const instance2 = new CognitoApiManager();
            expect(instance1).toBe(instance2);
        });

        it('should return the same instance on multiple constructor calls', () => {
            const instance1 = new CognitoApiManager();
            const instance2 = new CognitoApiManager();
            expect(instance1).toBe(instance2);
        });
    });

    describe('Constructor', () => {
        it('should instantiate ConfigureApi, SignUpApi, and ConfirmSignUpApi on creation', () => {
            const manager = CognitoApiManager.GetInstance();
            expect(ConfigureApi).toHaveBeenCalledTimes(1);
            expect(SignUpApi).toHaveBeenCalledTimes(1);
            expect(ConfirmSignUpApi).toHaveBeenCalledTimes(1);
            // Verify that the manager instance itself is passed to the helper constructors
            expect(ConfigureApi).toHaveBeenCalledWith(manager);
            expect(SignUpApi).toHaveBeenCalledWith(manager);
            expect(ConfirmSignUpApi).toHaveBeenCalledWith(manager);
        });

        it('should not re-instantiate helper classes on subsequent instantiations', () => {
            CognitoApiManager.GetInstance();
            CognitoApiManager.GetInstance();
            new CognitoApiManager();

            // The constructors for the helpers should only be called once.
            expect(ConfigureApi).toHaveBeenCalledTimes(1);
            expect(SignUpApi).toHaveBeenCalledTimes(1);
            expect(ConfirmSignUpApi).toHaveBeenCalledTimes(1);
        });
    });

    describe('Method Shortcuts', () => {
        let manager;
        let mockConfigure;
        let mockSignUp;
        let mockConfirmSignUp;

        beforeEach(() => {
            manager = CognitoApiManager.GetInstance();
            // Get the mock instances created by the CognitoApiManager constructor
            const configureApiInstance = ConfigureApi.mock.instances[0];
            const signUpApiInstance = SignUpApi.mock.instances[0];
            const confirmSignUpApiInstance = ConfirmSignUpApi.mock.instances[0];

            // Spy on the methods of the mock instances
            mockConfigure = jest.spyOn(configureApiInstance, 'Configure');
            mockSignUp = jest.spyOn(signUpApiInstance, 'SignUp');
            mockConfirmSignUp = jest.spyOn(confirmSignUpApiInstance, 'ConfirmSignUp');
        });

        it('should call ConfigureApi.Configure when Configure is called', async () => {
            const config = { userPoolId: 'us-east-1_xxxxxxxxx' };
            await manager.Configure(config);

            expect(mockConfigure).toHaveBeenCalledTimes(1);
            expect(mockConfigure).toHaveBeenCalledWith(config);
        });

        it('should call SignUpApi.SignUp when SignUp is called', async () => {
            const username = 'test@example.com';
            const password = 'Password123!';
            const attributes = { email: username };
            await manager.SignUp(username, password, attributes);

            expect(mockSignUp).toHaveBeenCalledTimes(1);
            expect(mockSignUp).toHaveBeenCalledWith(username, password, attributes);
        });

        it('should call ConfirmSignUpApi.ConfirmSignUp when ConfirmSignUp is called', async () => {
            const confirmSignUpInput = {
                username: 'test@example.com',
                confirmationCode: '123456'
            };
            await manager.ConfirmSignUp(confirmSignUpInput);

            expect(mockConfirmSignUp).toHaveBeenCalledTimes(1);
            expect(mockConfirmSignUp).toHaveBeenCalledWith(confirmSignUpInput);
        });
    });
});