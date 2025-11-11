import { Amplify as t } from "@aws-amplify/core";
class s {
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
    if (s.instance)
      return s.instance;
    s.instance = this;
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
    return s.instance || (s.instance = new s()), s.instance;
  }
  //END GetInstance() Method
  //#endregion
  //#region PUBLIC - CONFIGURE
  /**
   * Sets the Amplify configuration file
   * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
   */
  // ----------------------------------------------------------------- //
  Configure(c) {
    t.configure(c), console.log(c);
  }
  //END Configure() Method
  //#endregion
}
export {
  s as CognitoApiManager
};
//# sourceMappingURL=web-cognito-api.es.js.map
