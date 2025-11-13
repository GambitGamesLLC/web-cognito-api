/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
 * @typedef {import('@aws-amplify/auth/dist/esm/types').AuthNextSignUpStep} AuthNextSignUpStep
 * @typedef {import('@aws-amplify/auth').SignUpOutput} SignUpOutput
 */
/**
 * Handles configuration of the AWS Amplify Api
 */
export class ConfigureApi {
    /**
     * Sets the Amplify configuration file
     *
     * @documentation https://docs.amplify.aws/javascript/start/connect-to-aws-resources/
     *
     * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
     * @returns {Promise<ResourcesConfig>} The resources configuration set up with Amplify
     */
    Configure(config: ResourcesConfig): Promise<ResourcesConfig>;
}
export type ResourcesConfig = import("@aws-amplify/core").ResourcesConfig;
export type AuthNextSignUpStep = import("@aws-amplify/auth/dist/esm/types").AuthNextSignUpStep;
export type SignUpOutput = import("@aws-amplify/auth").SignUpOutput;
