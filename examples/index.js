/**
 * index.js
 * @file Frontend script for the web-cognito-api example web page.
 * @description This script demonstrates how to use the `web-cognito-api` library 
 * @requires {CognitoApiManager} from '../../../src/index.js'
 */

//#region IMPORTS

// Import directly from the source file for local testing
import { CognitoApiManager } from '../src/index.js';

/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 */

//#endregion

//#region PRIVATE - VARIABLES

/**
 * @type{boolean} Has the Initialization of this script occured?
 */
let initialized = false;

//#endregion

//#region PRIVATE - LIFECYCLE - ADD EVENT LISTENER - DOM CONTENT LOADED

/**
 * Called when the DOM is fully initialized.
 * This lifecycle event does not guarantee a 
 * specific callback order for any 
 * Methods attached to it from other scripts. 
 */
//-----------------------------------------------------//
document.addEventListener('DOMContentLoaded', async () => 
//-----------------------------------------------------//
{

    //console.log( "DOMContentLoaded Event Listener" );

    await Initialize();

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

//#region PRIVATE - INITIALIZE

/**
 * Initializes this script. Can only run once
 */
//-------------------------------------//
function Initialize()
//-------------------------------------//
{
    if( initialized )
    {
        return;
    }

    initialized = true;

    console.log( "cognito-api-manager /examples/index.js Initialize() initialized: " + initialized );

    AttachDomReferences();

    AddEventListeners();

    CreateCognitoApi();

} //END Initialize() Function

//#endregion

//#region PRIVATE - CREATE COGNITO API CLIENT

/**
 * Creates the Cognito API client, preparring it for use
 */
//-------------------------------------------------------//
async function CreateCognitoApi()
//-------------------------------------------------------//
{
    let cognitoApiManager = CognitoApiManager.GetInstance();

    // Fetch the JSON file
    const response = await fetch('./amplifyconfiguration.json');
    const config = await response.json();

    /**
     * @type ResourcesConfig
     */
    let resourcesConfig = await cognitoApiManager.Configure(config);

    console.log(resourcesConfig);

    await cognitoApiManager.CreateUser( "TestUser", "Test!@2025" );

} //END CreateCognitoApi() Method

//#endregion