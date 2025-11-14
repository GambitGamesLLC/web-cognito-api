/**
 * configure-api.test.js
 * @file Test suite for the ConfigureApi class.
 * @description This file contains Jest tests for the `ConfigureApi.Configure()` method.
 * It verifies that the Amplify configuration is correctly handled, including success and failure cases.
 * @requires {ConfigureApi} from '../../src/configure/configure-api.js'
 */

import { jest, describe, beforeEach, it, expect, afterEach } from '@jest/globals';
import { Amplify } from '@aws-amplify/core';
import { ConfigureApi } from '../../src/configure/configure-api.js';
import amplifyConfig from '../../examples/amplifyconfiguration.json';

describe('ConfigureApi', () => {
    let configureApi;    

    // Before each test, create a new instance of ConfigureApi and reset mocks.
    beforeEach(() => {
        configureApi = new ConfigureApi();
    });

    afterEach(() => { 
        // Restore any mocks created with jest.spyOn and clear all mock call history
        jest.restoreAllMocks(); 
        jest.clearAllMocks();
    });

    describe('Configure', () => {
        it('should configure Amplify and return the active configuration', async () => {
            // Spy on the real Amplify methods to ensure they are called
            const configureSpy = jest.spyOn(Amplify, 'configure');
            const getConfigSpy = jest.spyOn(Amplify, 'getConfig');

            // Act: Call the Configure method with the actual config file
            const result = await configureApi.Configure(amplifyConfig);

            // Assert: Check that the methods were called and the result matches the input config
            expect(configureSpy).toHaveBeenCalledWith(amplifyConfig);
            expect(getConfigSpy).toHaveBeenCalled();
            expect(result.Auth.Cognito.userPoolId).toEqual(amplifyConfig.Auth.Cognito.userPoolId);
        });

        it('should reject with an error if config is null', async () => {
            // Act & Assert: Expect the promise to be rejected with a specific error message
            await expect(configureApi.Configure(null)).rejects.toThrow(
                "web-cognito-api configure.js Configure() passed in 'config' parameter is undefined or null"
            );
        });

        it('should reject with an error if config is undefined', async () => {
            // Act & Assert: Expect the promise to be rejected with a specific error message
            await expect(configureApi.Configure(undefined)).rejects.toThrow(
                "web-cognito-api configure.js Configure() passed in 'config' parameter is undefined or null"
            );
        });

        it('should throw a custom error when Amplify.configure fails', async () => {
            // Arrange: Mock Amplify.configure to throw an error
            const originalErrorMessage = 'Amplify internal error';
            jest.spyOn(Amplify, 'configure').mockImplementation(() => {
                throw new Error(originalErrorMessage);
            });

            // Act & Assert: Expect the method to reject with our custom formatted error message
            await expect(configureApi.Configure(amplifyConfig)).rejects.toThrow(
                `web-cognito-api configure.js Configure() Error: ${originalErrorMessage}`
            );
        });
    });
});