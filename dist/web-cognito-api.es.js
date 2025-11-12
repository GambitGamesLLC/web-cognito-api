import { Amplify as o } from "@aws-amplify/core";
import { signUp as s } from "@aws-amplify/auth";
class r {
  //#region PRIVATE - VARIABLES
  //#endregion
  //#region PUBLIC - VARIABLES
  //#endregion
  //#region PUBLIC - CONSTRUCTOR
  /**
   * Initializes the CognitoApiManager singleton, preparing it for use
   */
  //------------------------------------------------//
  constructor() {
    if (r.instance)
      return r.instance;
    r.instance = this;
  }
  //END constructor() Method
  //#endregion
  //#region PUBLIC - GET INSTANCE
  /**
   * Get the single instance of the CognitoApiManager
   * @returns {CognitoApiManager} The CognitoApiManager instance
   */
  // ----------------------------------------------------------------- //
  static GetInstance() {
    return r.instance || (r.instance = new r()), r.instance;
  }
  //END GetInstance() Method
  //#endregion
  //#region PUBLIC - CONFIGURE
  /**
   * Sets the Amplify configuration file
   * 
   * @documentation https://docs.amplify.aws/javascript/start/connect-to-aws-resources/
   * 
   * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
   * @returns {Promise<ResourcesConfig>} The resources configuration set up with Amplify
   */
  // ----------------------------------------------------------------- //
  async Configure(e) {
    e == null && Promise.reject(new Error("cognito-api-manager.js Configure() passed in 'config' parameter is undefined or null"));
    try {
      return o.configure(e), o.getConfig();
    } catch (n) {
      Promise.reject(new Error("cognito-api-manager.js Configure() Error: " + n));
    }
  }
  //END Configure() Method
  //#endregion
  //#region PUBLIC - SIGN UP
  /**
   * Creates a new user within the user pool
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * 
   * @param {string} username The name for the new user. Specific format depends on the user pool settings in your AWS console.
   * @param {string} password The password for the new user
   * @param {object | null} attributes [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
   * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
   */
  // ----------------------------------------------------------------- //
  async SignUp(e, n, i) {
    if (!e)
      return Promise.reject(new Error("cognito-api-manager.js SignUp() Error: username cannot be null, undefined, or empty."));
    if (!n)
      return Promise.reject(new Error("cognito-api-manager.js SignUp() Error: password cannot be null, undefined, or empty."));
    i == null && (i = {});
    try {
      return await s({
        username: e,
        password: n,
        options: {
          userAttributes: i
        }
      });
    } catch (t) {
      return Promise.reject(new Error("cognito-api-manager.js SignUp() Error: " + t));
    }
  }
  //END SignUp() Method
  //#endregion
}
export {
  r as CognitoApiManager
};
//# sourceMappingURL=web-cognito-api.es.js.map
