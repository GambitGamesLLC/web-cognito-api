import { Amplify as c } from "@aws-amplify/core";
import { signUp as p, confirmSignUp as a } from "@aws-amplify/auth";
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
  async Configure(r) {
    if (r == null)
      throw new Error("web-cognito-api configure.js Configure() passed in 'config' parameter is undefined or null");
    try {
      return c.configure(r), await c.getConfig();
    } catch (n) {
      throw new Error(`web-cognito-api configure.js Configure() Error: ${n.message}`);
    }
  }
  //END Configure() Method
  //#endregion
}
class f {
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
  async SignUp(r, n, e) {
    if (!r)
      throw new Error("web-cognito-api sign-up-api.js SignUp() Error: username cannot be null, undefined, or empty.");
    if (!n)
      throw new Error("web-cognito-api sign-up-api SignUp() Error: password cannot be null, undefined, or empty.");
    e == null && (e = {});
    try {
      return await p({
        username: r,
        password: n,
        options: {
          userAttributes: e
        }
      });
    } catch (s) {
      let o = s.message;
      throw s.name === "UsernameExistsException" ? o = "User already exists." : (s.name === "InvalidPasswordException" || s.message.includes("Password did not conform with policy")) && (o = "Invalid password format. The password does not meet the policy requirements."), new Error(`web-cognito-api sign-up-api SignUp() Error: ${o}`);
    }
  }
  //END SignUp() Method
  //#endregion
}
class l {
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
  //#region PUBLIC - CONFIRM SIGN UP
  /**
   * Confirms a new user within the Cognito user pool. 
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
   * @returns {Promise<ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
   */
  // ----------------------------------------------------------------- //
  async ConfirmSignUp(r) {
    try {
      return console.log(r), await a(r);
    } catch (n) {
      const e = n.message;
      throw new Error(`ConfirmSignUp Error: ${e}`);
    }
  }
  //END ConfirmSignUp() Method
  //#endregion
}
class i {
  //#region PRIVATE - VARIABLES
  /** 
   * @private
   * @type {ConfigureApi} 
   **/
  #r = null;
  /** 
   * @private
   * @type {SignUpApi} 
   **/
  #n = null;
  /** 
   * @private
   * @type {ConfirmSignUpApi} 
   **/
  #e = null;
  //#endregion
  //#region PUBLIC - VARIABLES
  //#endregion
  //#region PUBLIC - CONSTRUCTOR
  /**
   * Initializes the CognitoApiManager singleton, preparing it for use
   */
  //------------------------------------------------//
  constructor() {
    if (i.instance)
      return i.instance;
    i.instance = this, this.#r = new u(this), this.#n = new f(this), this.#e = new l(this);
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
    return i.instance || (i.instance = new i()), i.instance;
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
  async Configure(r) {
    return this.#r.Configure(r);
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
  async SignUp(r, n, e) {
    return this.#n.SignUp(r, n, e);
  }
  //#endregion
  //#region PUBLIC - SHORTCUTS - ConfirmSignUpApi
  /**
   * Confirms a new user within the Cognito user pool. 
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * @param {ConfirmSignUpInput} confirmSignUpInput The object holding onto our data used to confirm our account sign up with the Cognito Api
   * @returns {Promise<import('@aws-amplify/auth').ConfirmSignUpOutput>} The 'ConfirmSignUpOutput' property returned by Amplify after a user confirms sign up
   */
  async ConfirmSignUp(r) {
    return this.#e.ConfirmSignUp(r);
  }
  //#endregion
}
export {
  i as CognitoApiManager
};
//# sourceMappingURL=web-cognito-api.es.js.map
