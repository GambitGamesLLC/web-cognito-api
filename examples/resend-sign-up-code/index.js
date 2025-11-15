/**
 * examples/resend-sign-up-code/index.js
 * @file Frontend script for the CognitoApiManager ResendSignUpCode() example.
 * @description This script demonstrates how to use the `ResendSignUpCode()` method of the `web-cognito-api` library.
 * @requires CognitoApiManager from '../../src/index.js'
 */

// Import directly from the source file for local testing
import { CognitoApiManager } from '../../src/index.js';

const form = document.getElementById('resend-code-form');
const outputElement = document.getElementById('result-output');
const emailInput = document.getElementById('email');
const btnGenTemp = document.getElementById('btn-gen-temp');
const btnExistingEmail = document.getElementById('btn-existing-email');
const btnInvalidEmail = document.getElementById('btn-invalid-email');
const tempEmailInfo = document.getElementById('temp-email-info');

// Store credentials for the temp email API.
let tempApiCreds = null;

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
 * Handles the form submission for resending a sign-up code.
 * @param {Event} event - The form submission event.
 * @param {CognitoApiManager} cognitoApiManager - The configured API manager instance.
 */
async function handleResendCode(event, cognitoApiManager) {
    event.preventDefault();
    outputElement.textContent = 'Resending code...';
    outputElement.style.color = 'black';

    const formData = new FormData(form);
    const email = formData.get('email');

    try {
        console.log(`Attempting to resend code for user: ${email}`);

        // Create a ResendSignUpCodeInput object
        const resendInput = {
            username: email,
        };

        // Call the ResendSignUpCode method.
        const result = await cognitoApiManager.ResendSignUpCode(resendInput);

        console.log("ResendSignUpCode successful:", result);
        console.log("Code Delivery Details:", result.codeDeliveryDetails);

        const outputText = JSON.stringify(result, null, 2);
        outputElement.textContent = outputText;

    } catch (error) {
        console.error("ResendSignUpCode failed:", error);
        outputElement.textContent = `An error occurred: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

/**
 * Generates a temporary email address using the RapidAPI Temp-Mail service.
 */
async function generateTempEmail() {
    outputElement.textContent = 'Generating temporary email...';
    tempEmailInfo.innerHTML = '';
    try {
        // 1. Fetch API credentials from the local JSON file if not already fetched.
        if (!tempApiCreds) {
            const credsResponse = await fetch('../temp-email.json');
            if (!credsResponse.ok) {
                throw new Error('Could not load temp-email.json credentials file.');
            }
            tempApiCreds = await credsResponse.json(); // Store for later use
        }

        // 2. Fetch available domains from the Temp-Mail API.
        const domainsResponse = await fetch('https://privatix-temp-mail-v1.p.rapidapi.com/request/domains/', {
            method: 'GET',
            headers: {
                'x-rapidapi-host': tempApiCreds['x-rapidapi-host'],
                'x-rapidapi-key': tempApiCreds['x-rapidapi-key'],
            },
        });

        if (!domainsResponse.ok) {
            throw new Error(`RapidAPI request failed: ${domainsResponse.statusText}`);
        }

        const domains = await domainsResponse.json();
        if (!domains || domains.length === 0) {
            throw new Error('No domains returned from Temp-Mail API.');
        }

        // 3. Generate a random username and combine it with the first available domain.
        const randomUser = Math.random().toString(36).substring(2, 12);
        const tempEmail = `${randomUser}${domains[0]}`;

        // 4. Update the UI.
        emailInput.value = tempEmail;
        tempEmailInfo.innerHTML = `<p>Temporary email generated: <b>${tempEmail}</b></p>`;
        outputElement.textContent = 'Temporary email generated. You can now click "Resend Code".';

    } catch (error) {
        console.error('Failed to generate temp email:', error);
        outputElement.textContent = `Error generating temp email: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

/**
 * Main function to set up the page.
 */
async function main() {
    try {
        const cognitoApiManager = await initializeApiManager();
        form.addEventListener('submit', (event) => handleResendCode(event, cognitoApiManager));
        btnGenTemp.addEventListener('click', generateTempEmail);
        btnExistingEmail.addEventListener('click', () => emailInput.value = 'existing-user@example.com');
        btnInvalidEmail.addEventListener('click', () => emailInput.value = 'invalid-email-format');
    } catch (error) {
        console.error("Initialization failed:", error);
        outputElement.textContent = `Initialization failed: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

document.addEventListener('DOMContentLoaded', main);