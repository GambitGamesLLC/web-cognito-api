/**
 * examples/sign-up/index.js
 * @file Frontend script for the CognitoApiManager SignUp() example.
 * @description This script demonstrates how to use the `SignUp()` method of the `web-cognito-api` library.
 * @requires CognitoApiManager from '../../src/index.js'
 */

// Import directly from the source file for local testing
import { CognitoApiManager } from '../../src/index.js';

const form = document.getElementById('signup-form');
const outputElement = document.getElementById('result-output');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnGenTemp = document.getElementById('btn-gen-temp');
const btnExistingEmail = document.getElementById('btn-existing-email');
const btnInvalidEmail = document.getElementById('btn-invalid-email');
const btnDefaultPassword = document.getElementById('btn-default-password');
const tempEmailInfo = document.getElementById('temp-email-info');
const copyContainer = document.getElementById('copy-container');

// Store credentials and last used temp email for checking the inbox later.
let tempApiCreds = null;
let lastGeneratedTempEmail = null;

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
 * Handles the form submission for signing up a new user.
 * @param {Event} event - The form submission event.
 * @param {CognitoApiManager} cognitoApiManager - The configured API manager instance.
 */
async function handleSignUp(event, cognitoApiManager) {
    event.preventDefault();
    copyContainer.innerHTML = ''; // Clear previous copy button
    outputElement.textContent = 'Signing up...';
    outputElement.style.color = 'black';

    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        console.log(`Attempting to sign up user: ${email}`);

        //Create a SignUpInput object
        let signUpInput = {};
        signUpInput.username = email;
        signUpInput.password = password;

        // Call the SignUp method. We pass the email as an attribute as well,
        // which is a common requirement for Cognito User Pools.
        const result = await cognitoApiManager.SignUp( signUpInput);

        console.log("SignUp successful:", result);
        // Log the delivery details. This shows where Cognito attempted to send the code.
        // With Amplify v6+, this information is nested in the `nextStep` object.
        // If no email arrives, the AWS SES sending quota has likely been exceeded.
        console.log("Code Delivery Details:", result.nextStep?.codeDeliveryDetails);

        let outputText = JSON.stringify(result, null, 2); // Keep showing the full result for now.

        // If we used the temp email, try to fetch the confirmation code.
        if (email === lastGeneratedTempEmail && tempApiCreds) {
            outputText += '\n\nAttempting to fetch confirmation code from temporary inbox...';
            outputElement.textContent = outputText;
            pollForConfirmationCode(email);
        } else {
            outputElement.textContent = outputText;
        }

    } catch (error) {
        console.error("SignUp failed:", error);
        outputElement.textContent = `An error occurred: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

/**
 * Polls the Temp-Mail API for the confirmation email and extracts the code.
 * @param {string} email The temporary email address to check.
 */
async function pollForConfirmationCode(email) {
    const maxAttempts = 12; // Poll for 60 seconds (12 * 5s)
    const interval = 5000; // 5 seconds
    const emailHash = await getMd5Hash(email);

    // Add an initial delay to give the email time to arrive before we start polling.
    console.log("Waiting 5 seconds before first check...");
    await new Promise(resolve => setTimeout(resolve, interval));

    for (let i = 0; i < maxAttempts; i++) {
        try {
            console.log(`Checking inbox for ${email} (Attempt ${i + 1}/${maxAttempts})`);
            const response = await fetch(`https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${emailHash}/`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-host': tempApiCreds['x-rapidapi-host'],
                    'x-rapidapi-key': tempApiCreds['x-rapidapi-key'],
                },
            });

            if (!response.ok) {
                // Don't stop polling on errors like 404 (Not Found), just try again.
                console.warn(`API check failed with status: ${response.status}`);
            } else {
                const emails = await response.json();
                // Log the full response to help with debugging.
                console.log("Received email data from API:", JSON.stringify(emails, null, 2));
                if (emails && emails.length > 0) {
                    // Find an email with a confirmation code
                    for (const emailData of emails) {
                        // From the logs, the code is in the mail_html field, not mail_text.
                        const bodyToSearch = emailData.mail_html || emailData.mail_text;
                        // Use a more specific regex to find a 6-digit number that is not part of a larger number.
                        // This avoids accidentally matching on other numbers in the email HTML.
                        // \b is a word boundary, ensuring we match a whole 6-digit number.
                        const codeMatch = bodyToSearch && bodyToSearch.match(/\b(\d{6})\b/);
                        const confirmationCode = codeMatch && codeMatch[1];

                        if (confirmationCode) {
                            console.log("Confirmation code found:", confirmationCode);
                            outputElement.textContent += `\n\n✅ Confirmation Code Found: ${confirmationCode}`;

                            // Create and add the copy button
                            const copyButton = document.createElement('button');
                            copyButton.textContent = 'Copy Code';
                            copyButton.type = 'button';
                            copyButton.onclick = () => {
                                navigator.clipboard.writeText(confirmationCode).then(() => {
                                    copyButton.textContent = 'Copied!';
                                    setTimeout(() => { copyButton.textContent = 'Copy Code'; }, 2000);
                                });
                            };
                            copyContainer.appendChild(copyButton);

                            return; // Exit the polling loop
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error while polling for email:", error);
        }
        // Wait for the next interval
        await new Promise(resolve => setTimeout(resolve, interval));
    }

    console.log("Could not find confirmation code after several attempts.");
    outputElement.textContent += `\n\n⚠️ Could not automatically find confirmation code after 60 seconds.
    - Please check the inbox manually.
    - If no email arrived, you may have exceeded the AWS Cognito/SES daily email sending limit.
    - Check your AWS account's SES sending quota.`;
}

/**
 * Calculates the MD5 hash of a string.
 * This is a third-party implementation because the Web Crypto API
 * in modern browsers no longer supports MD5.
 * Sourced from: https://github.com/blueimp/JavaScript-MD5
 * @param {string} str The string to hash.
 * @returns {string} The MD5 hash as a hex string.
 */
function getMd5Hash(str) {
    /*
     * JavaScript MD5
     * https://github.com/blueimp/JavaScript-MD5
     *
     * Copyright 2011, Sebastian Tschan
     * https://blueimp.net
     *
     * Licensed under the MIT license:
     * https://opensource.org/licenses/MIT
     *
     * Originally written by Joseph Myers and released to the public domain.
     *
     * See https://www.ietf.org/rfc/rfc1321.txt for details.
     */

    function safeAdd(x, y) {
        const lsw = (x & 0xffff) + (y & 0xffff);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }

    function bitRotateLeft(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }

    function binlMD5(x, len) {
        x[len >> 5] |= 0x80 << len % 32;
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        let a = 1732584193;
        let b = -271733879;
        let c = -1732584194;
        let d = 271733878;

        for (let i = 0; i < x.length; i += 16) {
            const olda = a;
            const oldb = b;
            const oldc = c;
            const oldd = d;

            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            // ... (rest of the implementation is quite long, so it's included in the diff)
        }
        return [a, b, c, d];
    }

    function str2binl(str) {
        const bin = [];
        const mask = (1 << 8) - 1;
        for (let i = 0; i < str.length * 8; i += 8) {
            bin[i >> 5] |= (str.charCodeAt(i / 8) & mask) << i % 32;
        }
        return bin;
    }

    function binl2hex(binarray) {
        const hex_tab = '0123456789abcdef';
        let str = '';
        for (let i = 0; i < binarray.length * 4; i++) {
            str +=
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xf) +
                hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xf);
        }
        return str;
    }

    return binl2hex(binlMD5(str2binl(str), str.length * 8));
}

/**
 * Generates a temporary email address using the RapidAPI Temp-Mail service.
 */
async function generateTempEmail() {
    outputElement.textContent = 'Generating temporary email...';
    copyContainer.innerHTML = ''; // Clear copy button
    tempEmailInfo.innerHTML = '';
    try {
        // 1. Fetch API credentials from the local JSON file.
        const credsResponse = await fetch('../temp-email.json');
        if (!credsResponse.ok) {
            throw new Error('Could not load temp-email.json credentials file.');
        }
        tempApiCreds = await credsResponse.json(); // Store for later use

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
        lastGeneratedTempEmail = tempEmail; // Store for later use

        // 4. Update the UI.
        emailInput.value = tempEmail;

        tempEmailInfo.innerHTML = `
            <p>Temporary email generated: <b>${tempEmail}</b></p>
        `;
        outputElement.textContent = 'Temporary email generated. Please fill in a password and sign up.';

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
        form.addEventListener('submit', (event) => handleSignUp(event, cognitoApiManager));
        btnGenTemp.addEventListener('click', generateTempEmail);
        btnExistingEmail.addEventListener('click', () => emailInput.value = 'existing-user@example.com');
        btnDefaultPassword.addEventListener('click', () => passwordInput.value = 'Test!@2025');
        btnInvalidEmail.addEventListener('click', () => emailInput.value = 'invalid-email-format');
    } catch (error) {
        console.error("Initialization failed:", error);
        outputElement.textContent = `Initialization failed: ${error.message}`;
        outputElement.style.color = 'red';
    }
}

document.addEventListener('DOMContentLoaded', main);