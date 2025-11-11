/**
 * index.js
 * @file Frontend script for the web-cognito-api example web page.
 * @description This script demonstrates how to use the `web-cognito-api` library 
 * @requires {CognitoApiManager} from '../../../src/index.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { CognitoApiManager } from '../src/cognito-api-manager.js';
import { config } from './amplifyconfiguration.json'

//#endregion

//#region PRIVATE - VARIABLES

//#endregion

//#region PRIVATE - LIFECYCLE - ADD EVENT LISTENER - DOM CONTENT LOADED

/**
 * Called when the DOM is fully initialized.
 * This lifecycle event does not guarantee a 
 * specific callback order for any 
 * Methods attached to it from other scripts. 
 */
//-----------------------------------------------------//
document.addEventListener('DOMContentLoaded', () => 
//-----------------------------------------------------//
{
    AttachDomReferences();

    AddEventListeners();

    CreateCognitoApi();

}); //END DOMContentLoaded Event Listener Hook

//#endregion


//#region PRIVATE - GET DOM REFERENCES

/**
 * Attaches our DOM references to our variables
 * * @returns
 */
//------------------------------------------------------//
function AttachDomReferences()
//------------------------------------------------------//
{
    
} //END AttachDomReferences Method

//#endregion

//#region PRIVATE - ADD EVENT LISTENERS TO DOM OBJECTS

/**
 * Called as part of the 'DOMContentLoaded' lifecycle event
 * Attach all event listeners to their DOM objects
 */
//------------------------------------------------------//
function AddEventListeners()
//------------------------------------------------------//
{

} //END AddEventListeners Method

//#endregion

//#region PRIVATE - CREATE COGNITO API CLIENT

/**
 * Creates the Cognito API client, preparring it for use
 */
//-------------------------------------------------------//
function CreateCognitoApi()
//-------------------------------------------------------//
{
    let cognitoApiManager = CognitoApiManager.GetInstance();
    cognitoApiManager.Configure(config);

} //END CreateCognitoApi() Method

//#endregion
