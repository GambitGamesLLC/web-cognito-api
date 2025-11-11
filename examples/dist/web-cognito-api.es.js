import { Amplify as i } from "@aws-amplify/core";
import { signUp as c } from "@aws-amplify/auth";
class e {
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
    if (e.instance)
      return e.instance;
    e.instance = this;
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
    return e.instance || (e.instance = new e()), e.instance;
  }
  //END GetInstance() Method
  //#endregion
  //#region PUBLIC - CONFIGURE
  /**
   * Sets the Amplify configuration file
   * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
   * @returns void
   */
  // ----------------------------------------------------------------- //
  Configure(r) {
    if (r == null) {
      console.log("cognito-api-manager.js Configure() passed in 'config' parameter is undefined or null");
      return;
    }
    try {
      i.configure(r), console.log(i.getConfig());
    } catch (n) {
      console.log("cognito-api-manager.js Configure() Error: " + n);
    }
  }
  //END Configure() Method
  //#endregion
  //#region PUBLIC - CREATE USER
  /**
   * Creates a new user within the user pool
   * @param {string} username The name for the new user
   * @param {string} password The password for the new user
   * @param {object} attributes An object of user attributes, e.g., { email: 'user@example.com' }
   * @returns {Promise<SignUpOutput['nextStep']>} The 'nextStep' property returned by Amplify after a user is successfully created in the user pool
   */
  // ----------------------------------------------------------------- //
  async CreateUser(r, n, o) {
    if (!r)
      return Promise.reject(new Error("cognito-api-manager.js CreateUser() Error: username cannot be null, undefined, or empty."));
    if (!n)
      return Promise.reject(new Error("cognito-api-manager.js CreateUser() Error: password cannot be null, undefined, or empty."));
    if (o == null)
      return Promise.reject(new Error("cognito-api-manager.js CreateUser() Error: attributes cannot be null or undefined."));
    try {
      const { userId: t, nextStep: s } = await c({
        username: r,
        password: n,
        options: {
          userAttributes: o
          // autoSignIn: true // Optional: Signs in the user automatically after sign-up
        }
      });
      return console.log(`cognito-api-manager.js CreateUser() Successfully signed up user ${t}`), console.log("cognito-api-manager.js CreateUser() Next step:", s), s;
    } catch (t) {
      return Promise.reject(new Error("cognito-api-manager.js CreateUser() Error: " + t));
    }
  }
  //END CreateUser() Method
  //#endregion
}
export {
  e as CognitoApiManager
};
//# sourceMappingURL=web-cognito-api.es.js.map
