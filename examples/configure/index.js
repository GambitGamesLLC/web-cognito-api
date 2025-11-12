/**
 * examples/configure/index.js
 * @file Frontend script for the CognitoApiManager Configure() example.
 * @description This script demonstrates how to use the `Configure()` method of the `web-cognito-api` library.
 * @requires CognitoApiManager from '../../src/index.js'
 */

// Import directly from the source file for local testing
import { CognitoApiManager } from '../../src/index.js';

/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 */

/**
 * Main function to run the demonstration.
 */
//--------------------------------------------//
async function main() 
//--------------------------------------------//
{
    console.log("cognito-api-manager examples/configure/index.js Configure() example started.");

    const outputElement = document.getElementById('config-output');

    try 
    {
        // 1. Get an instance of the CognitoApiManager
        const cognitoApiManager = CognitoApiManager.GetInstance();
        console.log("CognitoApiManager instance obtained.");

        // 2. Fetch the amplifyconfiguration.json file
        // This file should be in your examples/ directory for this demo.
        const response = await fetch('../amplifyconfiguration.json');
        
        if (!response.ok) 
        {
            throw new Error(`Failed to fetch amplifyconfiguration.json: ${response.statusText}`);
        }
        
        const amplifyConfig = await response.json();
        
        console.log("Successfully fetched amplifyconfiguration.json.");

        // 3. Configure Amplify using the CognitoApiManager
        console.log("Calling CognitoApiManager.Configure()...");
        
        /** @type {ResourcesConfig} */
        const loadedConfig = await cognitoApiManager.Configure(amplifyConfig);

        // 4. Display the result
        console.log("Amplify configured successfully. Final configuration:", loadedConfig);
        
        outputElement.textContent = JSON.stringify(loadedConfig, null, 2);

    } 
    catch (error) 
    {
        console.error("An error occurred during the demonstration:", error);
        outputElement.textContent = `An error occurred: ${error.message}`;
        outputElement.style.color = 'red';
    }

} //END main() Function

document.addEventListener('DOMContentLoaded', main);