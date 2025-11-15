import { Amplify as t } from "@aws-amplify/core";
import { signUp as o, confirmSignUp as c, resendSignUpCode as p } from "@aws-amplify/auth";
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
      return t.configure(e), await t.getConfig();
    } catch (n) {
      throw new Error(`web-cognito-api configure.js Configure() Error: ${n.message}`);
    }
  }
  //END Configure() Method
  //#endregion
}
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
  //#region PUBLIC - SIGN UP
  /**
   * Creates a new user within the Cognito user pool. 
   * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a confimration code to continue sign up
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * 
   * @param {SignUpInput} signUpInput The input object used to sign up a new user to our Cognito User Pool
   * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
   */
  // ----------------------------------------------------------------- //
  async SignUp(e) {
    if (e == null)
      throw new Error("web-cognito-api sign-up-api.js SignUp() Error: signUpInput cannot be null, undefined, or empty.");
    try {
      return await o(e);
    } catch (n) {
      let r = n.message;
      throw n.name === "UsernameExistsException" ? r = "User already exists." : (n.name === "InvalidPasswordException" || n.message.includes("Password did not conform with policy")) && (r = "Invalid password format. The password does not meet the policy requirements."), new Error(`web-cognito-api sign-up-api SignUp() Error: ${r}`);
    }
  }
  //END SignUp() Method
  //#endregion
}
class d {
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
  async ConfirmSignUp(e) {
    try {
      return console.log(e), await c(e);
    } catch (n) {
      const r = n.message;
      throw new Error(`ConfirmSignUp Error: ${r}`);
    }
  }
  //END ConfirmSignUp() Method
  //#endregion
}
class g {
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
  //#region PUBLIC - RESEND SIGN UP CODE
  /**
   * Resends the new user sign up confirmation code 
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/multi-step-sign-in/#confirm-signup
   * @param {ResendSignUpCodeInput} resendSignUpCodeInput The object holding onto our data used to resend our new user confirmation code
   * @returns {Promise<ResendSignUpCodeOutput>} The 'ResendSignUpCodeOutput' property returned by Amplify after resending a new user confirmation code
   */
  // ----------------------------------------------------------------- //
  async ResendSignUpCode(e) {
    if (e == null)
      throw new Error("web-cognito-api resend-sign-up-code-api.js ResendSignUpCode() Error: resendSignUpCodeInput cannot be null, undefined, or empty.");
    try {
      return await p(e);
    } catch (n) {
      let r = n.message;
      throw new Error(`web-cognito-api resend-sign-up-code-api ResendSignUpCode() Error: ${r}`);
    }
  }
  //END ResendSignUpCode() Method
  //#endregion
}
class i {
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
  /** 
   * @private
   * @type {ConfirmSignUpApi} 
   **/
  #r = null;
  /** 
   * @private
   * @type {ResendSignUpCodeApi} 
   **/
  #i = null;
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
    i.instance = this, this.#e = new a(this), this.#n = new u(this), this.#r = new d(this), this.#i = new g(this);
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
   * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
   * @returns {Promise<ResourcesConfig>} The resources configuration set up with Amplify
   */
  async Configure(e) {
    return this.#e.Configure(e);
  }
  //#endregion
  //#region PUBLIC - SHORTCUTS - SignUpApi
  /**
   * Creates a new user within the Cognito user pool. 
   * Check the `SignUpOutput` variable for the next step, usually you'll need to pass in a confimration code to continue sign up
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/sign-up/
   * 
   * @param {SignUpInput} signUpInput The input object used to sign up a new user to our Cognito User Pool
   * @returns {Promise<SignUpOutput>} The 'SignUpOutput' property returned by Amplify after a user is successfully created in the user pool
   */
  async SignUp(e) {
    return this.#n.SignUp(e);
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
  async ConfirmSignUp(e) {
    return this.#r.ConfirmSignUp(e);
  }
  //#endregion
  //#region PUBLIC - SHORTCUTS - ResendSignUpCodeApi
  /**
   * Resends the new user sign up confirmation code 
   * 
   * @documentation https://docs.amplify.aws/javascript/build-a-backend/auth/connect-your-frontend/multi-step-sign-in/#confirm-signup
   * @param {ResendSignUpCodeInput} resendSignUpCodeInput The object holding onto our data used to resend our new user confirmation code
   * @returns {Promise<ResendSignUpCodeOutput>} The 'ResendSignUpCodeOutput' property returned by Amplify after resending a new user confirmation code
   */
  async ResendSignUpCode(e) {
    return this.#i.ResendSignUpCode(e);
  }
  //#endregion
}
export {
  i as CognitoApiManager
};
//# sourceMappingURL=web-cognito-api.es.js.map
