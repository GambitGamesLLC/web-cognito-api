/**
 * examples/confirm-sign-up/index.js
 * @file Frontend script for the CognitoApiManager ConfirmSignUp() example.
 * @description This script demonstrates how to use the `ConfirmSignUp()` method of the `web-cognito-api` library.
 * @requires CognitoApiManager from '../../src/index.js'
 */

// Import directly from the source file for local testing
import { CognitoApiManager } from '../../src/index.js';

const form = document.getElementById('confirm-signup-form');
const outputElement = document.getElementById('result-output');

/**
 * Initializes the CognitoApiManager by fetching the configuration and calling Configure.
 * @returns {Promise<CognitoApiManager>} A configured instance of the API manager.
 */
async function initializeApiManager() {
    const cognitoApiManager = CognitoApiManager.GetInstance();

    // Fetch the amplifyconfiguration.json file
    const response = await fetch('../amplifyconfiguration.json');
    if (!response.ok) {
        throw new Error(`Failed to fetch amplifyconfiguration.json: ${response.statusText}`);
    }
    const amplifyConfig = await response.json();

    // Configure Amplify using the CognitoApiManager
    await cognitoApiManager.Configure(amplifyConfig);
    console.log("Amplify configured successfully.");

    return cognitoApiManager;
}

/**
 * Handles the form submission for confirming a user's sign-up.
 * @param {Event} event - The form submission event.
 * @param {CognitoApiManager} cognitoApiManager - The configured API manager instance.
 */
async function handleConfirmSignUp(event, cognitoApiManager) {
    event.preventDefault();
    outputElement.textContent = 'Confirming sign up...';
    outputElement.style.color = 'black';

    const formData = new FormData(form);
    const username = formData.get('username');
    const confirmationCode = formData.get('confirmationCode');

    try {
        console.log(`Attempting to confirm sign up for user: ${username}`);

        // The input to ConfirmSignUp is an object containing the username and confirmation code.
        const result = await cognitoApiManager.ConfirmSignUp({
            username,
            confirmationCode,
        });

        console.log("ConfirmSignUp successful:", result);
        outputElement.textContent = JSON.stringify(result, null, 2);

    } catch (error) {
        console.error("ConfirmSignUp failed:", error);
        outputElement.textContent = `An error occurred: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

/**
 * Main function to set up the page.
 */
async function main() {
    try {
        const cognitoApiManager = await initializeApiManager();
        form.addEventListener('submit', (event) => handleConfirmSignUp(event, cognitoApiManager));
    } catch (error) {
        console.error("Initialization failed:", error);
        outputElement.textContent = `Initialization failed: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

document.addEventListener('DOMContentLoaded', main);