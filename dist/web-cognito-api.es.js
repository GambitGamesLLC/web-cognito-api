import { Amplify as o } from "@aws-amplify/core";
import { signUp as p } from "@aws-amplify/auth";
class u {
  //#region PRIVATE - VARIABLES
  //#endregion
  //#region PUBLIC - CONSTRUCTOR
  /**
   * Constructor for the Api
   */
  //----------------------------------------------//
  constructor() {
  }
  //END Constructor Method
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
    if (e == null)
      throw new Error("web-cognito-api configure.js Configure() passed in 'config' parameter is undefined or null");
    try {
      return o.configure(e), await o.getConfig();
    } catch (r) {
      throw new Error(`web-cognito-api configure.js Configure() Error: ${r.message}`);
    }
  }
  //END Configure() Method
  //#endregion
}
class a {
  //#region PRIVATE - VARIABLES
  //#endregion
  //#region PUBLIC - CONSTRUCTOR
  /**
   * Constructor for the Api
   */
  //----------------------------------------------//
  constructor() {
  }
  //END Constructor Method
  //#endregion
  //#region PUBLIC - SIGN UP
  /**
   * Creates a new user within the Cognito user pool. 
   * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a code to continue sign up
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * 
   * @param {string} username The name for the new user. Specific format depends on the user pool settings in your AWS console.
   * @param {string} password The password for the new user
   * @param {object | null} attributes [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
   * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
   */
  // ----------------------------------------------------------------- //
  async SignUp(e, r, i) {
    if (!e)
      throw new Error("web-cognito-api sign-up-api.js SignUp() Error: username cannot be null, undefined, or empty.");
    if (!r)
      throw new Error("web-cognito-api sign-up-api SignUp() Error: password cannot be null, undefined, or empty.");
    i == null && (i = {});
    try {
      return await p({
        username: e,
        password: r,
        options: {
          userAttributes: i
        }
      });
    } catch (s) {
      let t = s.message;
      throw s.name === "UsernameExistsException" ? t = "User already exists." : (s.name === "InvalidPasswordException" || s.message.includes("Password did not conform with policy")) && (t = "Invalid password format. The password does not meet the policy requirements."), new Error(`web-cognito-api sign-up-api SignUp() Error: ${t}`);
    }
  }
  //END SignUp() Method
  //#endregion
}
class n {
  //#region PRIVATE - VARIABLES
  /** 
   * @private
   * @type {ConfigureApi} 
   **/
  #e = null;
  /** 
   * @private
   * @type {SignUpApi} 
   **/
  #n = null;
  //#endregion
  //#region PUBLIC - VARIABLES
  //#endregion
  //#region PUBLIC - CONSTRUCTOR
  /**
   * Initializes the CognitoApiManager singleton, preparing it for use
   */
  //------------------------------------------------//
  constructor() {
    if (n.instance)
      return n.instance;
    n.instance = this, this.#e = new u(this), this.#n = new a(this);
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
    return n.instance || (n.instance = new n()), n.instance;
  }
  //END GetInstance() Method
  //#endregion
  //#region PUBLIC - SHORTCUTS - ConfigureApi
  /**
   * Sets the Amplify configuration file
   * 
   * @documentation https://docs.amplify.aws/javascript/start/connect-to-aws-resources/
   * 
   * @param {import('@aws-amplify/core').ResourcesConfig} config The 'amplifyconfiguration.json' config file
   * @returns {Promise<import('@aws-amplify/core').ResourcesConfig>} The resources configuration set up with Amplify
   */
  async Configure(e) {
    return this.#e.Configure(e);
  }
  //#endregion
  //#region PUBLIC - SHORTCUTS - SignUpApi
  /**
   * Creates a new user within the Cognito user pool. 
   * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a code to continue sign up
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * 
   * @param {string} username The name for the new user. Specific format depends on the user pool settings in your AWS console.
   * @param {string} password The password for the new user
   * @param {object | null} [attributes] [Optional] An object of user attributes, e.g., { email: 'user@example.com' }
   * @returns {Promise<import('@aws-amplify/auth').SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
   */
  async SignUp(e, r, i) {
    return this.#n.SignUp(e, r, i);
  }
  //#endregion
}
export {
  n as CognitoApiManager
};
//# sourceMappingURL=web-cognito-api.es.js.map
