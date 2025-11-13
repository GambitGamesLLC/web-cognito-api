/**
 * @typedef {import('@aws-amplify/core').ResourcesConfig} ResourcesConfig
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
