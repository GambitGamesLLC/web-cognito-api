const Vt = "Logging", Gt = "NoHubcallbackProvidedException";
var S;
(function(t) {
  t.DEBUG = "DEBUG", t.ERROR = "ERROR", t.INFO = "INFO", t.WARN = "WARN", t.VERBOSE = "VERBOSE", t.NONE = "NONE";
})(S || (S = {}));
const ve = {
  VERBOSE: 1,
  DEBUG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
  NONE: 6
};
class w {
  /**
   * @constructor
   * @param {string} name - Name of the logger
   */
  constructor(e, n = S.WARN) {
    this.name = e, this.level = n, this._pluggables = [];
  }
  _padding(e) {
    return e < 10 ? "0" + e : "" + e;
  }
  _ts() {
    const e = /* @__PURE__ */ new Date();
    return [this._padding(e.getMinutes()), this._padding(e.getSeconds())].join(":") + "." + e.getMilliseconds();
  }
  configure(e) {
    return e ? (this._config = e, this._config) : this._config;
  }
  /**
   * Write log
   * @method
   * @memeberof Logger
   * @param {LogType|string} type - log type, default INFO
   * @param {string|object} msg - Logging message or object
   */
  _log(e, ...n) {
    let o = this.level;
    w.LOG_LEVEL && (o = w.LOG_LEVEL), typeof window < "u" && window.LOG_LEVEL && (o = window.LOG_LEVEL);
    const i = ve[o];
    if (!(ve[e] >= i))
      return;
    let r = console.log.bind(console);
    e === S.ERROR && console.error && (r = console.error.bind(console)), e === S.WARN && console.warn && (r = console.warn.bind(console)), w.BIND_ALL_LOG_LEVELS && (e === S.INFO && console.info && (r = console.info.bind(console)), e === S.DEBUG && console.debug && (r = console.debug.bind(console)));
    const a = `[${e}] ${this._ts()} ${this.name}`;
    let c = "";
    if (n.length === 1 && typeof n[0] == "string")
      c = `${a} - ${n[0]}`, r(c);
    else if (n.length === 1)
      c = `${a} ${n[0]}`, r(a, n[0]);
    else if (typeof n[0] == "string") {
      let d = n.slice(1);
      d.length === 1 && (d = d[0]), c = `${a} - ${n[0]} ${d}`, r(`${a} - ${n[0]}`, d);
    } else
      c = `${a} ${n}`, r(a, n);
    for (const d of this._pluggables) {
      const u = { message: c, timestamp: Date.now() };
      d.pushLogs([u]);
    }
  }
  /**
   * Write General log. Default to INFO
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  log(...e) {
    this._log(S.INFO, ...e);
  }
  /**
   * Write INFO log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  info(...e) {
    this._log(S.INFO, ...e);
  }
  /**
   * Write WARN log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  warn(...e) {
    this._log(S.WARN, ...e);
  }
  /**
   * Write ERROR log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  error(...e) {
    this._log(S.ERROR, ...e);
  }
  /**
   * Write DEBUG log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  debug(...e) {
    this._log(S.DEBUG, ...e);
  }
  /**
   * Write VERBOSE log
   * @method
   * @memeberof Logger
   * @param {string|object} msg - Logging message or object
   */
  verbose(...e) {
    this._log(S.VERBOSE, ...e);
  }
  addPluggable(e) {
    e && e.getCategoryName() === Vt && (this._pluggables.push(e), e.configure(this._config));
  }
  listPluggables() {
    return this._pluggables;
  }
}
w.LOG_LEVEL = null;
w.BIND_ALL_LOG_LEVELS = !1;
class C extends Error {
  /**
   *  Constructs an AmplifyError.
   *
   * @param message text that describes the main problem.
   * @param underlyingError the underlying cause of the error.
   * @param recoverySuggestion suggestion to recover from the error.
   *
   */
  constructor({ message: e, name: n, recoverySuggestion: o, underlyingError: i, metadata: s }) {
    if (super(e), this.name = n, this.underlyingError = i, this.recoverySuggestion = o, s) {
      const { extendedRequestId: r, httpStatusCode: a, requestId: c } = s;
      this.metadata = { extendedRequestId: r, httpStatusCode: a, requestId: c };
    }
    this.constructor = C, Object.setPrototypeOf(this, C.prototype);
  }
}
var O;
(function(t) {
  t.NoEndpointId = "NoEndpointId", t.PlatformNotSupported = "PlatformNotSupported", t.Unknown = "Unknown", t.NetworkError = "NetworkError";
})(O || (O = {}));
const Ze = (t, e = C) => (n, o, i) => {
  const { message: s, recoverySuggestion: r } = t[o];
  if (!n)
    throw new e({
      name: o,
      message: i ? `${s} ${i}` : s,
      recoverySuggestion: r
    });
}, j = typeof Symbol < "u" ? Symbol("amplify_default") : "@@amplify_default", x = new w("Hub");
class $t {
  constructor(e) {
    this.listeners = /* @__PURE__ */ new Map(), this.protectedChannels = [
      "core",
      "auth",
      "api",
      "analytics",
      "interactions",
      "pubsub",
      "storage",
      "ui",
      "xr"
    ], this.name = e;
  }
  /**
   * Used internally to remove a Hub listener.
   *
   * @remarks
   * This private method is for internal use only. Instead of calling Hub.remove, call the result of Hub.listen.
   */
  _remove(e, n) {
    const o = this.listeners.get(e);
    if (!o) {
      x.warn(`No listeners for ${e}`);
      return;
    }
    this.listeners.set(e, [
      ...o.filter(({ callback: i }) => i !== n)
    ]);
  }
  dispatch(e, n, o, i) {
    typeof e == "string" && this.protectedChannels.indexOf(e) > -1 && (i === j || x.warn(`WARNING: ${e} is protected and dispatching on it can have unintended consequences`));
    const s = {
      channel: e,
      payload: { ...n },
      source: o,
      patternInfo: []
    };
    try {
      this._toListeners(s);
    } catch (r) {
      x.error(r);
    }
  }
  listen(e, n, o = "noname") {
    let i;
    if (typeof n != "function")
      throw new C({
        name: Gt,
        message: "No callback supplied to Hub"
      });
    i = n;
    let s = this.listeners.get(e);
    return s || (s = [], this.listeners.set(e, s)), s.push({
      name: o,
      callback: i
    }), () => {
      this._remove(e, i);
    };
  }
  _toListeners(e) {
    const { channel: n, payload: o } = e, i = this.listeners.get(n);
    i && i.forEach((s) => {
      x.debug(`Dispatching to ${n} with `, o);
      try {
        s.callback(e);
      } catch (r) {
        x.error(r);
      }
    });
  }
}
const ie = new $t("__default__"), Wt = () => {
  if (typeof window < "u" && typeof window.atob == "function")
    return window.atob;
  if (typeof atob == "function")
    return atob;
  throw new C({
    name: "Base64EncoderError",
    message: "Cannot resolve the `atob` function from the environment."
  });
}, Ft = {
  convert(t, e) {
    let n = t;
    return e?.urlSafe && (n = n.replace(/-/g, "+").replace(/_/g, "/")), Wt()(n);
  }
};
var T;
(function(t) {
  t.AuthTokenConfigException = "AuthTokenConfigException", t.AuthUserPoolAndIdentityPoolException = "AuthUserPoolAndIdentityPoolException", t.AuthUserPoolException = "AuthUserPoolException", t.InvalidIdentityPoolIdException = "InvalidIdentityPoolIdException", t.OAuthNotConfigureException = "OAuthNotConfigureException";
})(T || (T = {}));
const Bt = {
  [T.AuthTokenConfigException]: {
    message: "Auth Token Provider not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure in your app."
  },
  [T.AuthUserPoolAndIdentityPoolException]: {
    message: "Auth UserPool or IdentityPool not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure in your app with UserPoolId and IdentityPoolId."
  },
  [T.AuthUserPoolException]: {
    message: "Auth UserPool not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure in your app with userPoolId and userPoolClientId."
  },
  [T.InvalidIdentityPoolIdException]: {
    message: "Invalid identity pool id provided.",
    recoverySuggestion: "Make sure a valid identityPoolId is given in the config."
  },
  [T.OAuthNotConfigureException]: {
    message: "oauth param not configured.",
    recoverySuggestion: "Make sure to call Amplify.configure with oauth parameter in your app."
  }
}, et = Ze(Bt);
function m(t) {
  let e = !0;
  t ? e = !!t.userPoolId && !!t.userPoolClientId : e = !1, et(e, T.AuthUserPoolException);
}
function B(t) {
  const e = !!t?.identityPoolId;
  et(e, T.InvalidIdentityPoolIdException);
}
function N(t) {
  const e = t.split(".");
  if (e.length !== 3)
    throw new Error("Invalid token");
  try {
    const o = e[1].replace(/-/g, "+").replace(/_/g, "/"), i = decodeURIComponent(Ft.convert(o).split("").map((r) => `%${`00${r.charCodeAt(0).toString(16)}`.slice(-2)}`).join("")), s = JSON.parse(i);
    return {
      toString: () => t,
      payload: s
    };
  } catch {
    throw new Error("Invalid token payload");
  }
}
const tt = (t) => {
  const e = Reflect.ownKeys(t);
  for (const n of e) {
    const o = t[n];
    (o && typeof o == "object" || typeof o == "function") && tt(o);
  }
  return Object.freeze(t);
}, jt = new w("parseAWSExports"), zt = {
  API_KEY: "apiKey",
  AWS_IAM: "iam",
  AMAZON_COGNITO_USER_POOLS: "userPool",
  OPENID_CONNECT: "oidc",
  NONE: "none",
  AWS_LAMBDA: "lambda",
  // `LAMBDA` is an incorrect value that was added during the v6 rewrite.
  // Keeping it as a valid value until v7 to prevent breaking customers who might
  // be relying on it as a workaround.
  // ref: https://github.com/aws-amplify/amplify-js/pull/12922
  // TODO: @v7 remove next line
  LAMBDA: "lambda"
}, Ht = (t = {}) => {
  if (!Object.prototype.hasOwnProperty.call(t, "aws_project_region"))
    throw new C({
      name: "InvalidParameterException",
      message: "Invalid config parameter.",
      recoverySuggestion: "Ensure passing the config object imported from  `amplifyconfiguration.json`."
    });
  const { aws_appsync_apiKey: e, aws_appsync_authenticationType: n, aws_appsync_graphqlEndpoint: o, aws_appsync_region: i, aws_bots_config: s, aws_cognito_identity_pool_id: r, aws_cognito_sign_up_verification_method: a, aws_cognito_mfa_configuration: c, aws_cognito_mfa_types: d, aws_cognito_password_protection_settings: u, aws_cognito_verification_mechanisms: I, aws_cognito_signup_attributes: f, aws_cognito_social_providers: v, aws_cognito_username_attributes: A, aws_mandatory_sign_in: At, aws_mobile_analytics_app_id: fe, aws_mobile_analytics_app_region: kt, aws_user_files_s3_bucket: pe, aws_user_files_s3_bucket_region: Pt, aws_user_files_s3_dangerously_connect_to_http_endpoint_for_testing: Rt, aws_user_pools_id: ye, aws_user_pools_web_client_id: bt, geo: Ie, oauth: X, predictions: b, aws_cloud_logic_custom: me, Notifications: Ot, modelIntrospection: Se } = t, p = {};
  fe && (p.Analytics = {
    Pinpoint: {
      appId: fe,
      region: kt
    }
  });
  const { InAppMessaging: Z, Push: ee } = Ot ?? {};
  if (Z?.AWSPinpoint || ee?.AWSPinpoint) {
    if (Z?.AWSPinpoint) {
      const { appId: h, region: R } = Z.AWSPinpoint;
      p.Notifications = {
        InAppMessaging: {
          Pinpoint: {
            appId: h,
            region: R
          }
        }
      };
    }
    if (ee?.AWSPinpoint) {
      const { appId: h, region: R } = ee.AWSPinpoint;
      p.Notifications = {
        ...p.Notifications,
        PushNotification: {
          Pinpoint: {
            appId: h,
            region: R
          }
        }
      };
    }
  }
  if (Array.isArray(s) && (p.Interactions = {
    LexV1: Object.fromEntries(s.map((h) => [h.name, h]))
  }), o) {
    const h = zt[n];
    h || jt.debug(`Invalid authentication type ${n}. Falling back to IAM.`), p.API = {
      GraphQL: {
        endpoint: o,
        apiKey: e,
        region: i,
        defaultAuthMode: h ?? "iam"
      }
    }, Se && (p.API.GraphQL.modelIntrospection = Se);
  }
  const Dt = c ? {
    status: c && c.toLowerCase(),
    totpEnabled: d?.includes("TOTP") ?? !1,
    smsEnabled: d?.includes("SMS") ?? !1
  } : void 0, xt = u ? {
    minLength: u.passwordPolicyMinLength,
    requireLowercase: u.passwordPolicyCharacters?.includes("REQUIRES_LOWERCASE") ?? !1,
    requireUppercase: u.passwordPolicyCharacters?.includes("REQUIRES_UPPERCASE") ?? !1,
    requireNumbers: u.passwordPolicyCharacters?.includes("REQUIRES_NUMBERS") ?? !1,
    requireSpecialCharacters: u.passwordPolicyCharacters?.includes("REQUIRES_SYMBOLS") ?? !1
  } : void 0, Mt = Array.from(/* @__PURE__ */ new Set([
    ...I ?? [],
    ...f ?? []
  ])).reduce((h, R) => ({
    ...h,
    // All user attributes generated by the CLI are required
    [R.toLowerCase()]: { required: !0 }
  }), {}), we = A?.includes("EMAIL") ?? !1, _e = A?.includes("PHONE_NUMBER") ?? !1;
  (r || ye) && (p.Auth = {
    Cognito: {
      identityPoolId: r,
      allowGuestAccess: At !== "enable",
      signUpVerificationMethod: a,
      userAttributes: Mt,
      userPoolClientId: bt,
      userPoolId: ye,
      mfa: Dt,
      passwordFormat: xt,
      loginWith: {
        username: !(we || _e),
        email: we,
        phone: _e
      }
    }
  });
  const Kt = X ? Object.keys(X).length > 0 : !1, Ut = v ? v.length > 0 : !1;
  if (p.Auth && Kt && (p.Auth.Cognito.loginWith = {
    ...p.Auth.Cognito.loginWith,
    oauth: {
      ...qt(X),
      ...Ut && {
        providers: Jt(v)
      }
    }
  }), pe && (p.Storage = {
    S3: {
      bucket: pe,
      region: Pt,
      dangerouslyConnectToHttpEndpointForTesting: Rt
    }
  }), Ie) {
    const { amazon_location_service: h } = Ie;
    p.Geo = {
      LocationService: {
        maps: h.maps,
        geofenceCollections: h.geofenceCollections,
        searchIndices: h.search_indices,
        region: h.region
      }
    };
  }
  if (me && (p.API = {
    ...p.API,
    REST: me.reduce((h, R) => {
      const { name: Nt, endpoint: Lt, region: Ee, service: Ce } = R;
      return {
        ...h,
        [Nt]: {
          endpoint: Lt,
          ...Ce ? { service: Ce } : void 0,
          ...Ee ? { region: Ee } : void 0
        }
      };
    }, {})
  }), b) {
    const { VoiceId: h } = b?.convert?.speechGenerator?.defaults ?? {};
    p.Predictions = h ? {
      ...b,
      convert: {
        ...b.convert,
        speechGenerator: {
          ...b.convert.speechGenerator,
          defaults: { voiceId: h }
        }
      }
    } : b;
  }
  return p;
}, Te = (t) => t?.split(",") ?? [], qt = ({ domain: t, scope: e, redirectSignIn: n, redirectSignOut: o, responseType: i }) => ({
  domain: t,
  scopes: e,
  redirectSignIn: Te(n),
  redirectSignOut: Te(o),
  responseType: i
}), Jt = (t) => t.map((e) => {
  const n = e.toLowerCase();
  return n.charAt(0).toUpperCase() + n.slice(1);
}), Yt = Symbol("oauth-listener"), y = [];
for (let t = 0; t < 256; ++t)
  y.push((t + 256).toString(16).slice(1));
function Qt(t, e = 0) {
  return (y[t[e + 0]] + y[t[e + 1]] + y[t[e + 2]] + y[t[e + 3]] + "-" + y[t[e + 4]] + y[t[e + 5]] + "-" + y[t[e + 6]] + y[t[e + 7]] + "-" + y[t[e + 8]] + y[t[e + 9]] + "-" + y[t[e + 10]] + y[t[e + 11]] + y[t[e + 12]] + y[t[e + 13]] + y[t[e + 14]] + y[t[e + 15]]).toLowerCase();
}
let te;
const Xt = new Uint8Array(16);
function Zt() {
  if (!te) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    te = crypto.getRandomValues.bind(crypto);
  }
  return te(Xt);
}
const en = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Ae = { randomUUID: en };
function tn(t, e, n) {
  if (Ae.randomUUID && !e && !t)
    return Ae.randomUUID();
  t = t || {};
  const o = t.random ?? t.rng?.() ?? Zt();
  if (o.length < 16)
    throw new Error("Random bytes length must be >= 16");
  if (o[6] = o[6] & 15 | 64, o[8] = o[8] & 63 | 128, e) {
    if (n = n || 0, n < 0 || n + 16 > e.length)
      throw new RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
    for (let i = 0; i < 16; ++i)
      e[n + i] = o[i];
    return e;
  }
  return Qt(o);
}
function nn(t) {
  const { version: e } = t;
  return e ? e.startsWith("1") : !1;
}
function on(t) {
  if (!t)
    return;
  const { bucket_name: e, aws_region: n, buckets: o } = t;
  return {
    S3: {
      bucket: e,
      region: n,
      buckets: o && pn(o)
    }
  };
}
function sn(t) {
  if (!t)
    return;
  const { user_pool_id: e, user_pool_client_id: n, identity_pool_id: o, password_policy: i, mfa_configuration: s, mfa_methods: r, unauthenticated_identities_enabled: a, oauth: c, username_attributes: d, standard_required_attributes: u, groups: I } = t, f = {
    Cognito: {
      userPoolId: e,
      userPoolClientId: n,
      groups: I
    }
  };
  return o && (f.Cognito = {
    ...f.Cognito,
    identityPoolId: o
  }), i && (f.Cognito.passwordFormat = {
    requireLowercase: i.require_lowercase,
    requireNumbers: i.require_numbers,
    requireUppercase: i.require_uppercase,
    requireSpecialCharacters: i.require_symbols,
    minLength: i.min_length ?? 6
  }), s && (f.Cognito.mfa = {
    status: fn(s),
    smsEnabled: r?.includes("SMS"),
    totpEnabled: r?.includes("TOTP")
  }), a && (f.Cognito.allowGuestAccess = a), c && (f.Cognito.loginWith = {
    oauth: {
      domain: c.domain,
      redirectSignIn: c.redirect_sign_in_uri,
      redirectSignOut: c.redirect_sign_out_uri,
      responseType: c.response_type === "token" ? "token" : "code",
      scopes: c.scopes,
      providers: gn(c.identity_providers)
    }
  }), d && (f.Cognito.loginWith = {
    ...f.Cognito.loginWith,
    email: d.includes("email"),
    phone: d.includes("phone_number"),
    // Signing in with a username is not currently supported in Gen2, this should always evaluate to false
    username: d.includes("username")
  }), u && (f.Cognito.userAttributes = u.reduce((v, A) => ({ ...v, [A]: { required: !0 } }), {})), f;
}
function rn(t) {
  if (!t?.amazon_pinpoint)
    return;
  const { amazon_pinpoint: e } = t;
  return {
    Pinpoint: {
      appId: e.app_id,
      region: e.aws_region
    }
  };
}
function an(t) {
  if (!t)
    return;
  const { aws_region: e, geofence_collections: n, maps: o, search_indices: i } = t;
  return {
    LocationService: {
      region: e,
      searchIndices: i,
      geofenceCollections: n,
      maps: o
    }
  };
}
function cn(t) {
  if (!t)
    return;
  const { aws_region: e, default_authorization_type: n, url: o, api_key: i, model_introspection: s } = t;
  return {
    GraphQL: {
      endpoint: o,
      defaultAuthMode: nt(n),
      region: e,
      apiKey: i,
      modelIntrospection: s
    }
  };
}
function dn(t) {
  if (!t?.events)
    return;
  const { url: e, aws_region: n, api_key: o, default_authorization_type: i } = t.events;
  return {
    Events: {
      endpoint: e,
      defaultAuthMode: nt(i),
      region: n,
      apiKey: o
    }
  };
}
function un(t) {
  if (!t)
    return;
  const { aws_region: e, channels: n, amazon_pinpoint_app_id: o } = t, i = n.includes("IN_APP_MESSAGING"), s = n.includes("APNS") || n.includes("FCM");
  if (!(i || s))
    return;
  const r = {};
  return i && (r.InAppMessaging = {
    Pinpoint: {
      appId: o,
      region: e
    }
  }), s && (r.PushNotification = {
    Pinpoint: {
      appId: o,
      region: e
    }
  }), r;
}
function ln(t) {
  const e = {};
  if (t.storage && (e.Storage = on(t.storage)), t.auth && (e.Auth = sn(t.auth)), t.analytics && (e.Analytics = rn(t.analytics)), t.geo && (e.Geo = an(t.geo)), t.data && (e.API = cn(t.data)), t.custom) {
    const n = dn(t.custom);
    n && "Events" in n && (e.API = { ...e.API, ...n });
  }
  return t.notifications && (e.Notifications = un(t.notifications)), e;
}
const hn = {
  AMAZON_COGNITO_USER_POOLS: "userPool",
  API_KEY: "apiKey",
  AWS_IAM: "iam",
  AWS_LAMBDA: "lambda",
  OPENID_CONNECT: "oidc"
};
function nt(t) {
  return hn[t];
}
const ke = {
  GOOGLE: "Google",
  LOGIN_WITH_AMAZON: "Amazon",
  FACEBOOK: "Facebook",
  SIGN_IN_WITH_APPLE: "Apple"
};
function gn(t = []) {
  return t.reduce((e, n) => (ke[n] !== void 0 && e.push(ke[n]), e), []);
}
function fn(t) {
  return t === "OPTIONAL" ? "optional" : t === "REQUIRED" ? "on" : "off";
}
function pn(t) {
  const e = {};
  return t.forEach(({ name: n, bucket_name: o, aws_region: i, paths: s }) => {
    if (n in e)
      throw new Error(`Duplicate friendly name found: ${n}. Name must be unique.`);
    const r = s ? Object.entries(s).reduce((a, [c, d]) => (d !== void 0 && (a[c] = d), a), {}) : void 0;
    e[n] = {
      bucketName: o,
      region: i,
      paths: r
    };
  }), e;
}
const ot = (t) => Object.keys(t).some((e) => e.startsWith("aws_")) ? Ht(t) : nn(t) ? ln(t) : t, yn = (t) => new TextEncoder().encode(t);
typeof Buffer < "u" && Buffer.from;
for (let t = 0; t < 256; t++) {
  let e = t.toString(16).toLowerCase();
  e.length === 1 && (e = `0${e}`);
}
var g;
(function(t) {
  t.WebUnknown = "0", t.React = "1", t.NextJs = "2", t.Angular = "3", t.VueJs = "4", t.Nuxt = "5", t.Svelte = "6", t.ServerSideUnknown = "100", t.ReactSSR = "101", t.NextJsSSR = "102", t.AngularSSR = "103", t.VueJsSSR = "104", t.NuxtSSR = "105", t.SvelteSSR = "106", t.ReactNative = "201", t.Expo = "202";
})(g || (g = {}));
var Pe;
(function(t) {
  t.AI = "ai", t.API = "api", t.Auth = "auth", t.Analytics = "analytics", t.DataStore = "datastore", t.Geo = "geo", t.InAppMessaging = "inappmessaging", t.Interactions = "interactions", t.Predictions = "predictions", t.PubSub = "pubsub", t.PushNotification = "pushnotification", t.Storage = "storage";
})(Pe || (Pe = {}));
var Re;
(function(t) {
  t.CreateConversation = "1", t.GetConversation = "2", t.ListConversations = "3", t.DeleteConversation = "4", t.SendMessage = "5", t.ListMessages = "6", t.OnMessage = "7", t.Generation = "8", t.UpdateConversation = "9";
})(Re || (Re = {}));
var be;
(function(t) {
  t.Record = "1", t.IdentifyUser = "2";
})(be || (be = {}));
var Oe;
(function(t) {
  t.GraphQl = "1", t.Get = "2", t.Post = "3", t.Put = "4", t.Patch = "5", t.Del = "6", t.Head = "7";
})(Oe || (Oe = {}));
var De;
(function(t) {
  t.SignUp = "1", t.ConfirmSignUp = "2", t.ResendSignUpCode = "3", t.SignIn = "4", t.FetchMFAPreference = "6", t.UpdateMFAPreference = "7", t.SetUpTOTP = "10", t.VerifyTOTPSetup = "11", t.ConfirmSignIn = "12", t.DeleteUserAttributes = "15", t.DeleteUser = "16", t.UpdateUserAttributes = "17", t.FetchUserAttributes = "18", t.ConfirmUserAttribute = "22", t.SignOut = "26", t.UpdatePassword = "27", t.ResetPassword = "28", t.ConfirmResetPassword = "29", t.FederatedSignIn = "30", t.RememberDevice = "32", t.ForgetDevice = "33", t.FetchDevices = "34", t.SendUserAttributeVerificationCode = "35", t.SignInWithRedirect = "36", t.StartWebAuthnRegistration = "37", t.CompleteWebAuthnRegistration = "38", t.ListWebAuthnCredentials = "39", t.DeleteWebAuthnCredential = "40";
})(De || (De = {}));
var xe;
(function(t) {
  t.Subscribe = "1", t.GraphQl = "2";
})(xe || (xe = {}));
var Me;
(function(t) {
  t.SearchByText = "0", t.SearchByCoordinates = "1", t.SearchForSuggestions = "2", t.SearchByPlaceId = "3", t.SaveGeofences = "4", t.GetGeofence = "5", t.ListGeofences = "6", t.DeleteGeofences = "7";
})(Me || (Me = {}));
var Ke;
(function(t) {
  t.SyncMessages = "1", t.IdentifyUser = "2", t.NotifyMessageInteraction = "3";
})(Ke || (Ke = {}));
var Ue;
(function(t) {
  t.None = "0";
})(Ue || (Ue = {}));
var Ne;
(function(t) {
  t.Convert = "1", t.Identify = "2", t.Interpret = "3";
})(Ne || (Ne = {}));
var Le;
(function(t) {
  t.Subscribe = "1";
})(Le || (Le = {}));
var Ve;
(function(t) {
  t.InitializePushNotifications = "1", t.IdentifyUser = "2";
})(Ve || (Ve = {}));
var Ge;
(function(t) {
  t.UploadData = "1", t.DownloadData = "2", t.List = "3", t.Copy = "4", t.Remove = "5", t.GetProperties = "6", t.GetUrl = "7", t.GetDataAccess = "8", t.ListCallerAccessGrants = "9";
})(Ge || (Ge = {}));
const In = "6.15.8", H = () => typeof global < "u", D = () => typeof window < "u", it = () => typeof document < "u", de = () => typeof process < "u", L = (t, e) => !!Object.keys(t).find((n) => n.startsWith(e));
function mn() {
  const t = (o) => o.startsWith("_react") || o.startsWith("__react"), e = (o) => Object.keys(o).find(t), n = () => Array.from(document.querySelectorAll("[id]"));
  return it() && n().some(e);
}
function Sn() {
  return de() && typeof process.env < "u" && !!Object.keys(process.env).find((t) => t.includes("react"));
}
function wn() {
  return D() && L(window, "__VUE");
}
function _n() {
  return H() && L(global, "__VUE");
}
function En() {
  return D() && L(window, "__SVELTE");
}
function Cn() {
  return de() && typeof process.env < "u" && !!Object.keys(process.env).find((t) => t.includes("svelte"));
}
function vn() {
  return D() && window.next && typeof window.next == "object";
}
function Tn() {
  return H() && (L(global, "__next") || L(global, "__NEXT"));
}
function An() {
  return D() && (window.__NUXT__ !== void 0 || window.$nuxt !== void 0);
}
function kn() {
  return H() && typeof global.__NUXT_PATHS__ < "u";
}
function Pn() {
  const t = !!(it() && document.querySelector("[ng-version]")), e = !!(D() && typeof window.ng < "u");
  return t || e;
}
function Rn() {
  return de() && typeof process.env == "object" && process.env.npm_lifecycle_script?.startsWith("ng ") || !1;
}
function bn() {
  return typeof navigator < "u" && typeof navigator.product < "u" && navigator.product === "ReactNative";
}
function On() {
  return H() && typeof global.expo < "u";
}
function Dn() {
  return D();
}
const xn = [
  // First, detect mobile
  { platform: g.Expo, detectionMethod: On },
  { platform: g.ReactNative, detectionMethod: bn },
  // Next, detect web frameworks
  { platform: g.NextJs, detectionMethod: vn },
  { platform: g.Nuxt, detectionMethod: An },
  { platform: g.Angular, detectionMethod: Pn },
  { platform: g.React, detectionMethod: mn },
  { platform: g.VueJs, detectionMethod: wn },
  { platform: g.Svelte, detectionMethod: En },
  { platform: g.WebUnknown, detectionMethod: Dn },
  // Last, detect ssr frameworks
  { platform: g.NextJsSSR, detectionMethod: Tn },
  { platform: g.NuxtSSR, detectionMethod: kn },
  { platform: g.ReactSSR, detectionMethod: Sn },
  { platform: g.VueJsSSR, detectionMethod: _n },
  { platform: g.AngularSSR, detectionMethod: Rn },
  { platform: g.SvelteSSR, detectionMethod: Cn }
];
function Mn() {
  return xn.find((t) => t.detectionMethod())?.platform || g.ServerSideUnknown;
}
let U;
const ne = [];
let se = !1;
const Kn = 10, Un = 10, Nn = 1e3, st = () => {
  if (!U) {
    if (U = Mn(), se)
      for (; ne.length; )
        ne.pop()?.();
    else
      ne.forEach((t) => {
        t();
      });
    $e(g.ServerSideUnknown, Kn), $e(g.WebUnknown, Un);
  }
  return U;
};
function Ln() {
  U = void 0;
}
function $e(t, e) {
  U === t && !se && setTimeout(() => {
    Ln(), se = !0, setTimeout(st, Nn);
  }, e);
}
const Vn = {}, Gn = (t, e) => Vn[t]?.[e]?.additionalDetails, $n = "aws-amplify", Wn = (t) => t.replace(/\+.*/, ""), Fn = ({ category: t, action: e } = {}) => {
  const n = [
    [$n, Wn(In)]
  ];
  if (t && n.push([t, e]), n.push(["framework", st()]), t && e) {
    const o = Gn(t, e);
    o && o.forEach((i) => {
      n.push(i);
    });
  }
  return n;
}, ue = (t) => Fn(t).map(([o, i]) => o && i ? `${o}/${i}` : o).join(" "), Bn = () => typeof window < "u" && typeof window.document < "u", We = new w("Auth");
class jn {
  /**
   * Configure Auth category
   *
   * @internal
   *
   * @param authResourcesConfig - Resources configurations required by Auth providers.
   * @param authOptions - Client options used by library
   *
   * @returns void
   */
  configure(e, n) {
    this.authConfig = e, this.authOptions = n, e && e.Cognito?.userPoolEndpoint && We.warn(Fe("Amazon Cognito User Pool")), e && e.Cognito?.identityPoolEndpoint && We.warn(Fe("Amazon Cognito Identity Pool"));
  }
  /**
   * Fetch the auth tokens, and the temporary AWS credentials and identity if they are configured. By default it
   * will automatically refresh expired auth tokens if a valid refresh token is present. You can force a refresh
   * of non-expired tokens with `{ forceRefresh: true }` input.
   *
   * @param options - Options configuring the fetch behavior.
   *
   * @returns Promise of current auth session {@link AuthSession}.
   */
  async fetchAuthSession(e = {}) {
    let n, o;
    const i = await this.getTokens(e);
    return i ? (o = i.accessToken?.payload?.sub, n = await this.authOptions?.credentialsProvider?.getCredentialsAndIdentityId({
      authConfig: this.authConfig,
      tokens: i,
      authenticated: !0,
      forceRefresh: e.forceRefresh
    })) : n = await this.authOptions?.credentialsProvider?.getCredentialsAndIdentityId({
      authConfig: this.authConfig,
      authenticated: !1,
      forceRefresh: e.forceRefresh
    }), {
      tokens: i,
      credentials: n?.credentials,
      identityId: n?.identityId,
      userSub: o
    };
  }
  async clearCredentials() {
    await this.authOptions?.credentialsProvider?.clearCredentialsAndIdentityId();
  }
  async getTokens(e) {
    return await this.authOptions?.tokenProvider?.getTokens(e) ?? void 0;
  }
}
const Fe = (t) => `You are using a custom Amazon ${t} endpoint, ensure the endpoint is correct.`;
class zn {
  constructor() {
    this.oAuthListener = void 0, this.isConfigured = !1, this.resourcesConfig = {}, this.libraryOptions = {}, this.Auth = new jn();
  }
  /**
   * Configures Amplify for use with your back-end resources.
   *
   * @remarks
   * This API does not perform any merging of either `resourcesConfig` or `libraryOptions`. The most recently
   * provided values will be used after configuration.
   *
   * @remarks
   * `configure` can be used to specify additional library options where available for supported categories.
   *
   * @param resourceConfig - Back-end resource configuration. Typically provided via the `aws-exports.js` file.
   * @param libraryOptions - Additional options for customizing the behavior of the library.
   */
  configure(e, n) {
    const o = ot(e);
    this.resourcesConfig = o, n && (this.libraryOptions = n), this.resourcesConfig = tt(this.resourcesConfig), this.Auth.configure(this.resourcesConfig.Auth, this.libraryOptions.Auth), ie.dispatch("core", {
      event: "configure",
      data: this.resourcesConfig
    }, "Configure", j), this.notifyOAuthListener(), this.isConfigured = !0;
  }
  /**
   * Provides access to the current back-end resource configuration for the Library.
   *
   * @returns Returns the immutable back-end resource configuration.
   */
  getConfig() {
    return this.isConfigured || console.warn("Amplify has not been configured. Please call Amplify.configure() before using this service."), this.resourcesConfig;
  }
  /** @internal */
  [Yt](e) {
    this.resourcesConfig.Auth?.Cognito.loginWith?.oauth ? e(this.resourcesConfig.Auth?.Cognito) : this.oAuthListener = e;
  }
  notifyOAuthListener() {
    !this.resourcesConfig.Auth?.Cognito.loginWith?.oauth || !this.oAuthListener || (this.oAuthListener(this.resourcesConfig.Auth?.Cognito), this.oAuthListener = void 0);
  }
}
const k = new zn(), q = (t) => {
  const { headers: e, statusCode: n } = t;
  return {
    ...Hn(t) ? t.$metadata : {},
    httpStatusCode: n,
    requestId: e["x-amzn-requestid"] ?? e["x-amzn-request-id"] ?? e["x-amz-request-id"],
    extendedRequestId: e["x-amz-id-2"],
    cfId: e["x-amz-cf-id"]
  };
}, Hn = (t) => typeof t?.$metadata == "object", G = async (t) => {
  if (!t || t.statusCode < 300)
    return;
  const e = await J(t), o = ((r) => {
    const [a] = r.toString().split(/[,:]+/);
    return a.includes("#") ? a.split("#")[1] : a;
  })(t.headers["x-amzn-errortype"] ?? e.code ?? e.__type ?? "UnknownError"), i = e.message ?? e.Message ?? "Unknown error", s = new Error(i);
  return Object.assign(s, {
    name: o,
    $metadata: q(t)
  });
}, J = async (t) => {
  if (!t.body)
    throw new Error("Missing response payload");
  const e = await t.body.json();
  return Object.assign(e, {
    $metadata: q(t)
  });
}, le = (t, e, n, o) => async (i, s) => {
  const r = {
    ...o,
    ...i
  }, a = await r.endpointResolver(r, s), c = await e(s, a), d = await t(c, {
    ...r
  });
  return n(d);
}, qn = 300 * 1e3;
function Jn(t = qn) {
  return (o) => {
    const i = 2 ** o * 100 + 100 * Math.random();
    return i > t ? !1 : i;
  };
}
const rt = 3, Be = "amz-sdk-invocation-id", Yn = "amz-sdk-request", je = 300 * 1e3, at = (t) => {
  const n = Jn(je)(t);
  return n === !1 ? je : n;
}, Qn = [
  "AuthFailure",
  "InvalidSignatureException",
  "RequestExpired",
  "RequestInTheFuture",
  "RequestTimeTooSkewed",
  "SignatureDoesNotMatch",
  "BadRequestException"
  // API Gateway
], Xn = (t) => !!t && Qn.includes(t), ct = (t) => async (e, n) => {
  const o = n ?? await t(e) ?? void 0, i = o?.code || o?.name, s = e?.statusCode;
  return {
    retryable: no(n) || to(s, i) || Xn(i) || oo(s, i)
  };
}, Zn = [
  "BandwidthLimitExceeded",
  "EC2ThrottledException",
  "LimitExceededException",
  "PriorRequestNotComplete",
  "ProvisionedThroughputExceededException",
  "RequestLimitExceeded",
  "RequestThrottled",
  "RequestThrottledException",
  "SlowDown",
  "ThrottledException",
  "Throttling",
  "ThrottlingException",
  "TooManyRequestsException"
], eo = [
  "TimeoutError",
  "RequestTimeout",
  "RequestTimeoutException"
], to = (t, e) => t === 429 || !!e && Zn.includes(e), no = (t) => [
  O.NetworkError,
  // TODO(vNext): unify the error code `ERR_NETWORK` used by the Storage XHR handler
  "ERR_NETWORK"
].includes(t?.name), oo = (t, e) => !!t && [500, 502, 503, 504].includes(t) || !!e && eo.includes(e), dt = "cognito-identity", ut = {
  service: dt,
  retryDecider: ct(G),
  computeDelay: at,
  cache: "no-store"
}, io = ({ maxAttempts: t = rt, retryDecider: e, computeDelay: n, abortSignal: o }) => {
  if (t < 1)
    throw new Error("maxAttempts must be greater than 0");
  return (i, s) => async function(a) {
    let c, d = s.attemptsCount ?? 0, u;
    const I = () => {
      if (u)
        return ze(u, d), u;
      throw ze(c, d), c;
    };
    for (; !o?.aborted && d < t; ) {
      try {
        u = await i(a), c = void 0;
      } catch (A) {
        c = A, u = void 0;
      }
      d = (s.attemptsCount ?? 0) > d ? s.attemptsCount ?? 0 : d + 1, s.attemptsCount = d;
      const { isCredentialsExpiredError: f, retryable: v } = await e(u, c, s);
      if (v) {
        if (s.isCredentialsExpired = !!f, !o?.aborted && d < t) {
          const A = n(d);
          await so(A, o);
        }
        continue;
      } else
        return I();
    }
    if (o?.aborted)
      throw new Error("Request aborted.");
    return I();
  };
}, so = (t, e) => {
  if (e?.aborted)
    return Promise.resolve();
  let n, o;
  const i = new Promise((s) => {
    o = s, n = setTimeout(s, t);
  });
  return e?.addEventListener("abort", function s(r) {
    clearTimeout(n), e?.removeEventListener("abort", s), o();
  }), i;
}, ze = (t, e) => {
  Object.prototype.toString.call(t) === "[object Object]" && (t.$metadata = {
    ...t.$metadata ?? {},
    attempts: e
  });
}, ro = tn, ao = () => (t) => async function(n) {
  return n.headers[Be] || (n.headers[Be] = ro()), t(n);
}, co = ({ maxAttempts: t = rt }) => (e, n) => async function(i) {
  const s = n.attemptsCount ?? 0;
  return i.headers[Yn] = `attempt=${s + 1}; max=${t}`, e(i);
}, uo = ({ userAgentHeader: t = "x-amz-user-agent", userAgentValue: e = "" }) => (n) => async function(i) {
  if (e.trim().length === 0)
    return await n(i);
  {
    const s = t.toLowerCase();
    return i.headers[s] = i.headers[s] ? `${i.headers[s]} ${e}` : e, await n(i);
  }
}, he = (t, e) => (n, o) => {
  const i = {};
  let s = (r) => t(r, o);
  for (let r = e.length - 1; r >= 0; r--) {
    const a = e[r];
    s = a(o)(s, i);
  }
  return s(n);
}, oe = (t) => {
  let e;
  return () => (e || (e = t()), e);
}, lo = (t) => !["HEAD", "GET"].includes(t.toUpperCase()), ho = async ({ url: t, method: e, headers: n, body: o }, { abortSignal: i, cache: s, withCrossDomainCredentials: r }) => {
  let a;
  try {
    a = await fetch(t, {
      method: e,
      headers: n,
      body: lo(e) ? o : void 0,
      signal: i,
      cache: s,
      credentials: r ? "include" : "same-origin"
    });
  } catch (I) {
    throw I instanceof TypeError ? new C({
      name: O.NetworkError,
      message: "A network error has occurred.",
      underlyingError: I
    }) : I;
  }
  const c = {};
  a.headers?.forEach((I, f) => {
    c[f.toLowerCase()] = I;
  });
  const d = {
    statusCode: a.status,
    headers: c,
    body: null
  }, u = Object.assign(a.body ?? {}, {
    text: oe(() => a.text()),
    blob: oe(() => a.blob()),
    json: oe(() => a.json())
  });
  return {
    ...d,
    body: u
  };
}, lt = he(ho, [
  uo,
  ao,
  io,
  co
]), go = () => (t) => async function(n) {
  return n.headers["cache-control"] = "no-store", t(n);
}, ht = he(lt, [go]), gt = (t) => (e, n) => {
  const o = fo(t), i = JSON.stringify(e);
  return po(n, o, i);
}, fo = (t) => ({
  "content-type": "application/x-amz-json-1.1",
  "x-amz-target": `AWSCognitoIdentityService.${t}`
}), po = ({ url: t }, e, n) => ({
  headers: e,
  url: t,
  body: n,
  method: "POST"
}), He = (t) => le(ht, gt("GetCredentialsForIdentity"), yo, {
  ...ut,
  ...t,
  userAgentValue: ue()
}), yo = async (t) => {
  if (t.statusCode >= 300)
    throw await G(t);
  const e = await J(t);
  return {
    IdentityId: e.IdentityId,
    Credentials: Io(e.Credentials),
    $metadata: q(t)
  };
}, Io = ({ Expiration: t, ...e } = {}) => ({
  ...e,
  Expiration: t && new Date(t * 1e3)
}), mo = (t) => le(ht, gt("GetId"), So, {
  ...ut,
  ...t,
  userAgentValue: ue()
}), So = async (t) => {
  if (t.statusCode >= 300)
    throw await G(t);
  return {
    IdentityId: (await J(t)).IdentityId,
    $metadata: q(t)
  };
}, ft = {
  id: "aws",
  outputs: {
    dnsSuffix: "amazonaws.com"
  },
  regionRegex: "^(us|eu|ap|sa|ca|me|af)\\-\\w+\\-\\d+$",
  regions: ["aws-global"]
}, wo = {
  partitions: [
    ft,
    {
      id: "aws-cn",
      outputs: {
        dnsSuffix: "amazonaws.com.cn"
      },
      regionRegex: "^cn\\-\\w+\\-\\d+$",
      regions: ["aws-cn-global"]
    }
  ]
}, pt = (t) => {
  const { partitions: e } = wo;
  for (const { regions: n, outputs: o, regionRegex: i } of e) {
    const s = new RegExp(i);
    if (n.includes(t) || s.test(t))
      return o.dnsSuffix;
  }
  return ft.outputs.dnsSuffix;
}, Y = URL, _o = ({ region: t }) => ({
  url: new Y(`https://${dt}.${t}.${pt(t)}`)
});
class M extends C {
  constructor() {
    super({
      name: O.PlatformNotSupported,
      message: "Function not supported on current platform"
    });
  }
}
class yt {
  constructor(e) {
    this.storage = e;
  }
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  async setItem(e, n) {
    if (!this.storage)
      throw new M();
    this.storage.setItem(e, n);
  }
  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  async getItem(e) {
    if (!this.storage)
      throw new M();
    return this.storage.getItem(e);
  }
  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  async removeItem(e) {
    if (!this.storage)
      throw new M();
    this.storage.removeItem(e);
  }
  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  async clear() {
    if (!this.storage)
      throw new M();
    this.storage.clear();
  }
}
class It {
  constructor() {
    this.storage = /* @__PURE__ */ new Map();
  }
  get length() {
    return this.storage.size;
  }
  key(e) {
    return e > this.length - 1 ? null : Array.from(this.storage.keys())[e];
  }
  setItem(e, n) {
    this.storage.set(e, n);
  }
  getItem(e) {
    return this.storage.get(e) ?? null;
  }
  removeItem(e) {
    this.storage.delete(e);
  }
  clear() {
    this.storage.clear();
  }
}
const mt = new w("CoreStorageUtils"), Eo = () => {
  try {
    if (typeof window < "u" && window.localStorage)
      return window.localStorage;
  } catch {
    mt.info("localStorage not found. InMemoryStorage is used as a fallback.");
  }
  return new It();
}, St = () => {
  try {
    if (typeof window < "u" && window.sessionStorage)
      return window.sessionStorage.getItem("test"), window.sessionStorage;
    throw new Error("sessionStorage is not defined");
  } catch {
    return mt.info("sessionStorage not found. InMemoryStorage is used as a fallback."), new It();
  }
};
class Co extends yt {
  constructor() {
    super(Eo());
  }
}
class vo extends yt {
  constructor() {
    super(St());
  }
}
class To {
  constructor(e) {
    this._storage = e;
  }
  get storage() {
    if (!this._storage)
      throw new M();
    return this._storage;
  }
  /**
   * This is used to set a specific item in storage
   * @param {string} key - the key for the item
   * @param {object} value - the value
   * @returns {string} value that was set
   */
  setItem(e, n) {
    this.storage.setItem(e, n);
  }
  /**
   * This is used to get a specific key from storage
   * @param {string} key - the key for the item
   * This is used to clear the storage
   * @returns {string} the data item
   */
  getItem(e) {
    return this.storage.getItem(e);
  }
  /**
   * This is used to remove an item from storage
   * @param {string} key - the key being set
   * @returns {string} value - value that was deleted
   */
  removeItem(e) {
    this.storage.removeItem(e);
  }
  /**
   * This is used to clear the storage
   * @returns {string} nothing
   */
  clear() {
    this.storage.clear();
  }
}
class Ao extends To {
  constructor() {
    super(St());
  }
}
function $(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e];
    for (var o in n)
      t[o] = n[o];
  }
  return t;
}
var ko = {
  read: function(t) {
    return t[0] === '"' && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
  },
  write: function(t) {
    return encodeURIComponent(t).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  }
};
function re(t, e) {
  function n(i, s, r) {
    if (!(typeof document > "u")) {
      r = $({}, e, r), typeof r.expires == "number" && (r.expires = new Date(Date.now() + r.expires * 864e5)), r.expires && (r.expires = r.expires.toUTCString()), i = encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var a = "";
      for (var c in r)
        r[c] && (a += "; " + c, r[c] !== !0 && (a += "=" + r[c].split(";")[0]));
      return document.cookie = i + "=" + t.write(s, i) + a;
    }
  }
  function o(i) {
    if (!(typeof document > "u" || arguments.length && !i)) {
      for (var s = document.cookie ? document.cookie.split("; ") : [], r = {}, a = 0; a < s.length; a++) {
        var c = s[a].split("="), d = c.slice(1).join("=");
        try {
          var u = decodeURIComponent(c[0]);
          if (r[u] = t.read(d, u), i === u)
            break;
        } catch {
        }
      }
      return i ? r[i] : r;
    }
  }
  return Object.create(
    {
      set: n,
      get: o,
      remove: function(i, s) {
        n(
          i,
          "",
          $({}, s, {
            expires: -1
          })
        );
      },
      withAttributes: function(i) {
        return re(this.converter, $({}, this.attributes, i));
      },
      withConverter: function(i) {
        return re($({}, this.converter, i), this.attributes);
      }
    },
    {
      attributes: { value: Object.freeze(e) },
      converter: { value: Object.freeze(t) }
    }
  );
}
var W = re(ko, { path: "/" });
class Po {
  constructor(e = {}) {
    const { path: n, domain: o, expires: i, sameSite: s, secure: r } = e;
    if (this.domain = o, this.path = n || "/", this.expires = Object.prototype.hasOwnProperty.call(e, "expires") ? i : 365, this.secure = Object.prototype.hasOwnProperty.call(e, "secure") ? r : !0, Object.prototype.hasOwnProperty.call(e, "sameSite")) {
      if (!s || !["strict", "lax", "none"].includes(s))
        throw new Error('The sameSite value of cookieStorage must be "lax", "strict" or "none".');
      if (s === "none" && !this.secure)
        throw new Error("sameSite = None requires the Secure attribute in latest browser versions.");
      this.sameSite = s;
    }
  }
  async setItem(e, n) {
    W.set(e, n, this.getData());
  }
  async getItem(e) {
    return W.get(e) ?? null;
  }
  async removeItem(e) {
    W.remove(e, this.getData());
  }
  async clear() {
    const e = W.get(), n = Object.keys(e).map((o) => this.removeItem(o));
    await Promise.all(n);
  }
  getData() {
    return {
      path: this.path,
      expires: this.expires,
      domain: this.domain,
      secure: this.secure,
      ...this.sameSite && { sameSite: this.sameSite }
    };
  }
}
const Q = new Co();
new vo();
new Ao();
const Ro = (t) => {
  let e;
  return async (...n) => e || (e = new Promise((o, i) => {
    t(...n).then((s) => {
      o(s);
    }).catch((s) => {
      i(s);
    }).finally(() => {
      e = void 0;
    });
  }), e);
};
function qe({ expiresAt: t, clockDrift: e, tolerance: n = 5e3 }) {
  return Date.now() + e + n > t;
}
class l extends C {
  constructor(e) {
    super(e), this.constructor = l, Object.setPrototypeOf(this, l.prototype);
  }
}
function bo(t) {
  const e = t?.split("_")[0];
  if (!t || t.indexOf("_") < 0 || !e || typeof e != "string")
    throw new l({
      name: "InvalidUserPoolId",
      message: "Invalid user pool id provided."
    });
  return e;
}
function ae(t) {
  if (!t || !t.includes(":"))
    throw new l({
      name: "InvalidIdentityPoolIdException",
      message: "Invalid identity pool id provided.",
      recoverySuggestion: "Make sure a valid identityPoolId is given in the config."
    });
  return t.split(":")[0];
}
const wt = "UserUnAuthenticatedException", Oo = "InvalidRedirectException", Do = "InvalidAppSchemeException", xo = "InvalidPreferredRedirectUrlException";
new l({
  name: Oo,
  message: "signInRedirect or signOutRedirect had an invalid format or was not found.",
  recoverySuggestion: "Please make sure the signIn/Out redirect in your oauth config is valid."
});
new l({
  name: Do,
  message: "A valid non-http app scheme was not found in the config.",
  recoverySuggestion: "Please make sure a valid custom app scheme is present in the config."
});
new l({
  name: xo,
  message: "The given preferredRedirectUrl does not match any items in the redirectSignOutUrls array from the config.",
  recoverySuggestion: "Please make sure a matching preferredRedirectUrl is provided."
});
const Mo = "InvalidOriginException";
new l({
  name: Mo,
  message: "redirect is coming from a different origin. The oauth flow needs to be initiated from the same origin",
  recoverySuggestion: "Please call signInWithRedirect from the same origin."
});
const Ko = "TokenRefreshException";
function Uo(t) {
  if (!t || !t.idToken)
    throw new l({
      name: wt,
      message: "User needs to be authenticated to call this API.",
      recoverySuggestion: "Sign in before calling this API again."
    });
}
const No = new l({
  name: Ko,
  message: `Token refresh is not supported when authenticated with the 'implicit grant' (token) oauth flow. 
	Please change your oauth configuration to use 'code grant' flow.`,
  recoverySuggestion: `Please logout and change your Amplify configuration to use "code grant" flow. 
	E.g { responseType: 'code' }`
}), Lo = new l({
  name: wt,
  message: "User needs to be authenticated to call this API.",
  recoverySuggestion: "Sign in before calling this API again."
});
function Vo(t) {
  if (Wo(t))
    throw No;
  if (!$o(t))
    throw Lo;
}
const Go = {
  inflightOAuth: "inflightOAuth",
  oauthSignIn: "oauthSignIn",
  oauthPKCE: "oauthPKCE",
  oauthState: "oauthState"
};
function _t(t) {
  return t?.accessToken || t?.idToken;
}
function $o(t) {
  return _t(t) && t?.refreshToken;
}
function Wo(t) {
  return _t(t) && !t?.refreshToken;
}
const Fo = (t) => (e, n) => {
  const o = Bo(t), i = JSON.stringify(e);
  return jo(n, o, i);
}, Bo = (t) => ({
  "content-type": "application/x-amz-json-1.1",
  "x-amz-target": `AWSCognitoIdentityProviderService.${t}`
}), jo = ({ url: t }, e, n) => ({
  headers: e,
  url: t,
  body: n,
  method: "POST"
});
function V(t) {
  if (!t || t.name === "Error" || t instanceof TypeError)
    throw new l({
      name: O.Unknown,
      message: "An unknown error has occurred.",
      underlyingError: t
    });
}
const zo = () => async (t) => {
  if (t.statusCode >= 300) {
    const e = await G(t);
    throw V(e), new l({
      name: e.name,
      message: e.message,
      metadata: e.$metadata
    });
  }
  return J(t);
}, Ho = () => (t, e) => async function(o) {
  return o.headers["cache-control"] = "no-store", t(o);
}, qo = he(lt, [Ho]), Et = "cognito-idp", Jo = {
  service: Et,
  retryDecider: ct(G),
  computeDelay: at,
  get userAgentValue() {
    return ue();
  },
  cache: "no-store"
}, Yo = ({ region: t }) => ({
  url: new Y(`https://${Et}.${t}.${pt(t)}`)
}), Qo = ({ endpointOverride: t }) => (e) => t ? { url: new Y(t) } : Yo(e), Xo = (t) => le(qo, Fo("GetTokensFromRefreshToken"), zo(), {
  ...Jo,
  ...t
}), Zo = async ({ tokens: t, authConfig: e, username: n, clientMetadata: o }) => {
  m(e?.Cognito);
  const { userPoolId: i, userPoolClientId: s, userPoolEndpoint: r } = e.Cognito, a = bo(i);
  Vo(t);
  const c = Xo({
    endpointResolver: Qo({
      endpointOverride: r
    })
  }), { AuthenticationResult: d } = await c({ region: a }, {
    ClientId: s,
    RefreshToken: t.refreshToken,
    DeviceKey: t.deviceMetadata?.deviceKey,
    ClientMetadata: o
  }), u = N(d?.AccessToken ?? ""), I = d?.IdToken ? N(d.IdToken) : void 0, { iat: f } = u.payload;
  if (!f)
    throw new l({
      name: "iatNotFoundException",
      message: "iat not found in access token"
    });
  const v = f * 1e3 - (/* @__PURE__ */ new Date()).getTime();
  return {
    accessToken: u,
    idToken: I,
    clockDrift: v,
    refreshToken: d?.RefreshToken ?? t.refreshToken,
    username: n
  };
}, ei = Ro(Zo), ti = {
  accessToken: "accessToken",
  idToken: "idToken",
  oidcProvider: "oidcProvider",
  clockDrift: "clockDrift",
  refreshToken: "refreshToken",
  deviceKey: "deviceKey",
  randomPasswordKey: "randomPasswordKey",
  deviceGroupKey: "deviceGroupKey",
  signInDetails: "signInDetails",
  oauthMetadata: "oauthMetadata"
};
var z;
(function(t) {
  t.InvalidAuthTokens = "InvalidAuthTokens";
})(z || (z = {}));
const ni = {
  [z.InvalidAuthTokens]: {
    message: "Invalid tokens.",
    recoverySuggestion: "Make sure the tokens are valid."
  }
}, oi = Ze(ni), Je = "CognitoIdentityServiceProvider";
class ii {
  getKeyValueStorage() {
    if (!this.keyValueStorage)
      throw new l({
        name: "KeyValueStorageNotFoundException",
        message: "KeyValueStorage was not found in TokenStore"
      });
    return this.keyValueStorage;
  }
  setKeyValueStorage(e) {
    this.keyValueStorage = e;
  }
  setAuthConfig(e) {
    this.authConfig = e;
  }
  async loadTokens() {
    try {
      const e = await this.getAuthKeys(), n = await this.getKeyValueStorage().getItem(e.accessToken);
      if (!n)
        throw new l({
          name: "NoSessionFoundException",
          message: "Auth session was not found. Make sure to call signIn."
        });
      const o = N(n), i = await this.getKeyValueStorage().getItem(e.idToken), s = i ? N(i) : void 0, r = await this.getKeyValueStorage().getItem(e.refreshToken) ?? void 0, a = await this.getKeyValueStorage().getItem(e.clockDrift) ?? "0", c = Number.parseInt(a), d = await this.getKeyValueStorage().getItem(e.signInDetails), u = {
        accessToken: o,
        idToken: s,
        refreshToken: r,
        deviceMetadata: await this.getDeviceMetadata() ?? void 0,
        clockDrift: c,
        username: await this.getLastAuthUser()
      };
      return d && (u.signInDetails = JSON.parse(d)), u;
    } catch {
      return null;
    }
  }
  async storeTokens(e) {
    oi(e !== void 0, z.InvalidAuthTokens);
    const n = e.username;
    await this.getKeyValueStorage().setItem(this.getLastAuthUserKey(), n);
    const o = await this.getAuthKeys();
    await this.getKeyValueStorage().setItem(o.accessToken, e.accessToken.toString()), e.idToken ? await this.getKeyValueStorage().setItem(o.idToken, e.idToken.toString()) : await this.getKeyValueStorage().removeItem(o.idToken), e.refreshToken ? await this.getKeyValueStorage().setItem(o.refreshToken, e.refreshToken) : await this.getKeyValueStorage().removeItem(o.refreshToken), e.deviceMetadata && (e.deviceMetadata.deviceKey && await this.getKeyValueStorage().setItem(o.deviceKey, e.deviceMetadata.deviceKey), e.deviceMetadata.deviceGroupKey && await this.getKeyValueStorage().setItem(o.deviceGroupKey, e.deviceMetadata.deviceGroupKey), await this.getKeyValueStorage().setItem(o.randomPasswordKey, e.deviceMetadata.randomPassword)), e.signInDetails ? await this.getKeyValueStorage().setItem(o.signInDetails, JSON.stringify(e.signInDetails)) : await this.getKeyValueStorage().removeItem(o.signInDetails), await this.getKeyValueStorage().setItem(o.clockDrift, `${e.clockDrift}`);
  }
  async clearTokens() {
    const e = await this.getAuthKeys();
    await Promise.all([
      this.getKeyValueStorage().removeItem(e.accessToken),
      this.getKeyValueStorage().removeItem(e.idToken),
      this.getKeyValueStorage().removeItem(e.clockDrift),
      this.getKeyValueStorage().removeItem(e.refreshToken),
      this.getKeyValueStorage().removeItem(e.signInDetails),
      this.getKeyValueStorage().removeItem(this.getLastAuthUserKey()),
      this.getKeyValueStorage().removeItem(e.oauthMetadata)
    ]);
  }
  async getDeviceMetadata(e) {
    const n = await this.getAuthKeys(e), o = await this.getKeyValueStorage().getItem(n.deviceKey), i = await this.getKeyValueStorage().getItem(n.deviceGroupKey), s = await this.getKeyValueStorage().getItem(n.randomPasswordKey);
    return s && i && o ? {
      deviceKey: o,
      deviceGroupKey: i,
      randomPassword: s
    } : null;
  }
  async clearDeviceMetadata(e) {
    const n = await this.getAuthKeys(e);
    await Promise.all([
      this.getKeyValueStorage().removeItem(n.deviceKey),
      this.getKeyValueStorage().removeItem(n.deviceGroupKey),
      this.getKeyValueStorage().removeItem(n.randomPasswordKey)
    ]);
  }
  async getAuthKeys(e) {
    m(this.authConfig?.Cognito);
    const n = e ?? await this.getLastAuthUser();
    return si(Je, `${this.authConfig.Cognito.userPoolClientId}.${n}`);
  }
  getLastAuthUserKey() {
    m(this.authConfig?.Cognito);
    const e = this.authConfig.Cognito.userPoolClientId;
    return `${Je}.${e}.LastAuthUser`;
  }
  async getLastAuthUser() {
    return await this.getKeyValueStorage().getItem(this.getLastAuthUserKey()) ?? "username";
  }
  async setOAuthMetadata(e) {
    const { oauthMetadata: n } = await this.getAuthKeys();
    await this.getKeyValueStorage().setItem(n, JSON.stringify(e));
  }
  async getOAuthMetadata() {
    const { oauthMetadata: e } = await this.getAuthKeys(), n = await this.getKeyValueStorage().getItem(e);
    return n && JSON.parse(n);
  }
}
const si = (t, e) => ge(ti)(`${t}`, e);
function ge(t) {
  const e = Object.values({ ...t });
  return (n, o) => e.reduce((i, s) => ({
    ...i,
    [s]: `${n}.${o}.${s}`
  }), {});
}
const Ye = "amplify-signin-with-hostedUI", _ = "CognitoIdentityServiceProvider";
class ri {
  constructor(e) {
    this.keyValueStorage = e;
  }
  async clearOAuthInflightData() {
    m(this.cognitoConfig);
    const e = E(_, this.cognitoConfig.userPoolClientId);
    await Promise.all([
      this.keyValueStorage.removeItem(e.inflightOAuth),
      this.keyValueStorage.removeItem(e.oauthPKCE),
      this.keyValueStorage.removeItem(e.oauthState)
    ]);
  }
  async clearOAuthData() {
    m(this.cognitoConfig);
    const e = E(_, this.cognitoConfig.userPoolClientId);
    return await this.clearOAuthInflightData(), await this.keyValueStorage.removeItem(Ye), this.keyValueStorage.removeItem(e.oauthSignIn);
  }
  loadOAuthState() {
    m(this.cognitoConfig);
    const e = E(_, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.getItem(e.oauthState);
  }
  storeOAuthState(e) {
    m(this.cognitoConfig);
    const n = E(_, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.setItem(n.oauthState, e);
  }
  loadPKCE() {
    m(this.cognitoConfig);
    const e = E(_, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.getItem(e.oauthPKCE);
  }
  storePKCE(e) {
    m(this.cognitoConfig);
    const n = E(_, this.cognitoConfig.userPoolClientId);
    return this.keyValueStorage.setItem(n.oauthPKCE, e);
  }
  setAuthConfig(e) {
    this.cognitoConfig = e;
  }
  async loadOAuthInFlight() {
    m(this.cognitoConfig);
    const e = E(_, this.cognitoConfig.userPoolClientId);
    return await this.keyValueStorage.getItem(e.inflightOAuth) === "true";
  }
  async storeOAuthInFlight(e) {
    m(this.cognitoConfig);
    const n = E(_, this.cognitoConfig.userPoolClientId);
    await this.keyValueStorage.setItem(n.inflightOAuth, `${e}`);
  }
  async loadOAuthSignIn() {
    m(this.cognitoConfig);
    const e = E(_, this.cognitoConfig.userPoolClientId), n = await this.keyValueStorage.getItem(Ye), [o, i] = (await this.keyValueStorage.getItem(e.oauthSignIn))?.split(",") ?? [];
    return {
      isOAuthSignIn: o === "true" || n === "true",
      preferPrivateSession: i === "true"
    };
  }
  async storeOAuthSignIn(e, n = !1) {
    m(this.cognitoConfig);
    const o = E(_, this.cognitoConfig.userPoolClientId);
    await this.keyValueStorage.setItem(o.oauthSignIn, `${e},${n}`);
  }
}
const E = (t, e) => ge(Go)(t, e), Qe = new ri(Q);
class ai {
  constructor() {
    this.waitForInflightOAuth = Bn() ? async () => {
      if (await Qe.loadOAuthInFlight())
        return this.inflightPromise ? this.inflightPromise : (this.inflightPromise = new Promise((e, n) => {
        }), this.inflightPromise);
    } : async () => {
    };
  }
  setAuthConfig(e) {
    Qe.setAuthConfig(e.Cognito), this.authConfig = e;
  }
  setTokenRefresher(e) {
    this.tokenRefresher = e;
  }
  setAuthTokenStore(e) {
    this.tokenStore = e;
  }
  getTokenStore() {
    if (!this.tokenStore)
      throw new l({
        name: "EmptyTokenStoreException",
        message: "TokenStore not set"
      });
    return this.tokenStore;
  }
  getTokenRefresher() {
    if (!this.tokenRefresher)
      throw new l({
        name: "EmptyTokenRefresherException",
        message: "TokenRefresher not set"
      });
    return this.tokenRefresher;
  }
  setClientMetadataProvider(e) {
    this.clientMetadataProvider = e;
  }
  async getTokens(e) {
    let n;
    try {
      m(this.authConfig?.Cognito);
    } catch {
      return null;
    }
    await this.waitForInflightOAuth(), this.inflightPromise = void 0, n = await this.getTokenStore().loadTokens();
    const o = await this.getTokenStore().getLastAuthUser();
    if (n === null)
      return null;
    const i = !!n?.idToken && qe({
      expiresAt: (n.idToken?.payload?.exp ?? 0) * 1e3,
      clockDrift: n.clockDrift ?? 0
    }), s = qe({
      expiresAt: (n.accessToken?.payload?.exp ?? 0) * 1e3,
      clockDrift: n.clockDrift ?? 0
    });
    return (e?.forceRefresh || i || s) && (n = await this.refreshTokens({
      tokens: n,
      username: o,
      clientMetadata: e?.clientMetadata ?? await this.clientMetadataProvider?.()
    }), n === null) ? null : {
      accessToken: n?.accessToken,
      idToken: n?.idToken,
      signInDetails: n?.signInDetails
    };
  }
  async refreshTokens({ tokens: e, username: n, clientMetadata: o }) {
    try {
      const { signInDetails: i } = e, s = await this.getTokenRefresher()({
        tokens: e,
        authConfig: this.authConfig,
        username: n,
        clientMetadata: o
      });
      return s.signInDetails = i, await this.setTokens({ tokens: s }), ie.dispatch("auth", { event: "tokenRefresh" }, "Auth", j), s;
    } catch (i) {
      return this.handleErrors(i);
    }
  }
  handleErrors(e) {
    if (V(e), this.isAuthenticationError(e) && this.clearTokens(), ie.dispatch("auth", {
      event: "tokenRefresh_failure",
      data: { error: e }
    }, "Auth", j), e.name.startsWith("NotAuthorizedException"))
      return null;
    throw e;
  }
  isAuthenticationError(e) {
    return [
      "NotAuthorizedException",
      // Refresh token is expired or invalid
      "TokenRevokedException",
      // Token was revoked by admin
      "UserNotFoundException",
      // User no longer exists
      "PasswordResetRequiredException",
      // User must reset password
      "UserNotConfirmedException",
      // User account is not confirmed
      "RefreshTokenReuseException"
      // Refresh token invalidated by rotation
    ].some((o) => e?.name?.startsWith?.(o));
  }
  async setTokens({ tokens: e }) {
    return this.getTokenStore().storeTokens(e);
  }
  async clearTokens() {
    return this.getTokenStore().clearTokens();
  }
  getDeviceMetadata(e) {
    return this.getTokenStore().getDeviceMetadata(e);
  }
  clearDeviceMetadata(e) {
    return this.getTokenStore().clearDeviceMetadata(e);
  }
  setOAuthMetadata(e) {
    return this.getTokenStore().setOAuthMetadata(e);
  }
  getOAuthMetadata() {
    return this.getTokenStore().getOAuthMetadata();
  }
}
class ci {
  constructor() {
    this.authTokenStore = new ii(), this.authTokenStore.setKeyValueStorage(Q), this.tokenOrchestrator = new ai(), this.tokenOrchestrator.setAuthTokenStore(this.authTokenStore), this.tokenOrchestrator.setTokenRefresher(ei);
  }
  getTokens(e = {}) {
    return this.tokenOrchestrator.getTokens(e);
  }
  setKeyValueStorage(e) {
    this.authTokenStore.setKeyValueStorage(e);
  }
  setClientMetadataProvider(e) {
    this.tokenOrchestrator.setClientMetadataProvider(e);
  }
  setAuthConfig(e) {
    this.authTokenStore.setAuthConfig(e), this.tokenOrchestrator.setAuthConfig(e);
  }
}
const K = new ci(), { tokenOrchestrator: Ii } = K, di = {
  identityId: "identityId"
}, ui = new w("DefaultIdentityIdStore");
class Ct {
  setAuthConfig(e) {
    B(e.Cognito), this.authConfig = e, this._authKeys = li("Cognito", e.Cognito.identityPoolId);
  }
  constructor(e) {
    this._authKeys = {}, this._hasGuestIdentityId = !1, this.keyValueStorage = e;
  }
  async loadIdentityId() {
    B(this.authConfig?.Cognito);
    try {
      if (this._primaryIdentityId)
        return {
          id: this._primaryIdentityId,
          type: "primary"
        };
      {
        const e = await this.keyValueStorage.getItem(this._authKeys.identityId);
        return e ? (this._hasGuestIdentityId = !0, {
          id: e,
          type: "guest"
        }) : null;
      }
    } catch (e) {
      return ui.log("Error getting stored IdentityId.", e), null;
    }
  }
  async storeIdentityId(e) {
    B(this.authConfig?.Cognito), e.type === "guest" ? (this.keyValueStorage.setItem(this._authKeys.identityId, e.id), this._primaryIdentityId = void 0, this._hasGuestIdentityId = !0) : (this._primaryIdentityId = e.id, this._hasGuestIdentityId && (this.keyValueStorage.removeItem(this._authKeys.identityId), this._hasGuestIdentityId = !1));
  }
  async clearIdentityId() {
    this._primaryIdentityId = void 0, await this.keyValueStorage.removeItem(this._authKeys.identityId);
  }
}
const li = (t, e) => ge(di)(`com.amplify.${t}`, e), ce = ({ endpointOverride: t }) => (e) => t ? { url: new Y(t) } : _o(e);
function vt(t) {
  const e = N(t).payload.iss, n = {};
  if (!e)
    throw new l({
      name: "InvalidIdTokenException",
      message: "Invalid Idtoken."
    });
  const o = e.replace(/(^\w+:|^)\/\//, "");
  return n[o] = t, n;
}
async function hi({ tokens: t, authConfig: e, identityIdStore: n }) {
  n.setAuthConfig({ Cognito: e });
  const o = await n.loadIdentityId();
  if (o)
    return o.id;
  const i = t?.idToken ? vt(t.idToken.toString()) : {}, s = await gi(i, e);
  return n.storeIdentityId({
    id: s,
    type: t ? "primary" : "guest"
  }), s;
}
async function gi(t, e) {
  const n = e?.identityPoolId, o = ae(n), i = mo({
    endpointResolver: ce({
      endpointOverride: e.identityPoolEndpoint
    })
  });
  let s;
  try {
    s = (await i({
      region: o
    }, {
      IdentityPoolId: n,
      Logins: t
    })).IdentityId;
  } catch (r) {
    throw V(r), new l(r);
  }
  if (!s)
    throw new l({
      name: "GetIdResponseException",
      message: "Received undefined response from getId operation",
      recoverySuggestion: "Make sure to pass a valid identityPoolId in the configuration."
    });
  return s;
}
const F = new w("CognitoCredentialsProvider"), Xe = 3e3 * 1e3;
class Tt {
  constructor(e) {
    this._nextCredentialsRefresh = 0, this._identityIdStore = e;
  }
  async clearCredentialsAndIdentityId() {
    F.debug("Clearing out credentials and identityId"), this._credentialsAndIdentityId = void 0, await this._identityIdStore.clearIdentityId();
  }
  async clearCredentials() {
    F.debug("Clearing out in-memory credentials"), this._credentialsAndIdentityId = void 0;
  }
  async getCredentialsAndIdentityId(e) {
    const n = e.authenticated, { tokens: o } = e, { authConfig: i } = e;
    try {
      B(i?.Cognito);
    } catch {
      return;
    }
    if (!n && !i.Cognito.allowGuestAccess)
      return;
    const { forceRefresh: s } = e, r = this.hasTokenChanged(o), a = await hi({
      tokens: o,
      authConfig: i.Cognito,
      identityIdStore: this._identityIdStore
    });
    return (s || r) && this.clearCredentials(), n ? (Uo(o), this.credsForOIDCTokens(i.Cognito, o, a)) : this.getGuestCredentials(a, i.Cognito);
  }
  async getGuestCredentials(e, n) {
    if (this._credentialsAndIdentityId && !this.isPastTTL() && this._credentialsAndIdentityId.isAuthenticatedCreds === !1)
      return F.info("returning stored credentials as they neither past TTL nor expired."), this._credentialsAndIdentityId;
    this.clearCredentials();
    const o = ae(n.identityPoolId), i = He({
      endpointResolver: ce({
        endpointOverride: n.identityPoolEndpoint
      })
    });
    let s;
    try {
      s = await i({ region: o }, {
        IdentityId: e
      });
    } catch (r) {
      throw V(r), new l(r);
    }
    if (s?.Credentials?.AccessKeyId && s?.Credentials?.SecretKey) {
      this._nextCredentialsRefresh = (/* @__PURE__ */ new Date()).getTime() + Xe;
      const r = {
        credentials: {
          accessKeyId: s.Credentials.AccessKeyId,
          secretAccessKey: s.Credentials.SecretKey,
          sessionToken: s.Credentials.SessionToken,
          expiration: s.Credentials.Expiration
        },
        identityId: e
      };
      return s.IdentityId && (r.identityId = s.IdentityId, this._identityIdStore.storeIdentityId({
        id: s.IdentityId,
        type: "guest"
      })), this._credentialsAndIdentityId = {
        ...r,
        isAuthenticatedCreds: !1
      }, r;
    } else
      throw new l({
        name: "CredentialsNotFoundException",
        message: "Cognito did not respond with either Credentials, AccessKeyId or SecretKey."
      });
  }
  async credsForOIDCTokens(e, n, o) {
    if (this._credentialsAndIdentityId && !this.isPastTTL() && this._credentialsAndIdentityId.isAuthenticatedCreds === !0)
      return F.debug("returning stored credentials as they neither past TTL nor expired."), this._credentialsAndIdentityId;
    this.clearCredentials();
    const i = n.idToken ? vt(n.idToken.toString()) : {}, s = ae(e.identityPoolId), r = He({
      endpointResolver: ce({
        endpointOverride: e.identityPoolEndpoint
      })
    });
    let a;
    try {
      a = await r({ region: s }, {
        IdentityId: o,
        Logins: i
      });
    } catch (c) {
      throw V(c), new l(c);
    }
    if (a?.Credentials?.AccessKeyId && a?.Credentials?.SecretKey) {
      this._nextCredentialsRefresh = (/* @__PURE__ */ new Date()).getTime() + Xe;
      const c = {
        credentials: {
          accessKeyId: a.Credentials.AccessKeyId,
          secretAccessKey: a.Credentials.SecretKey,
          sessionToken: a.Credentials.SessionToken,
          expiration: a.Credentials.Expiration
        },
        identityId: o
      };
      return a.IdentityId && (c.identityId = a.IdentityId, this._identityIdStore.storeIdentityId({
        id: a.IdentityId,
        type: "primary"
      })), this._credentialsAndIdentityId = {
        ...c,
        isAuthenticatedCreds: !0,
        associatedIdToken: n.idToken?.toString()
      }, c;
    } else
      throw new l({
        name: "CredentialsException",
        message: "Cognito did not respond with either Credentials, AccessKeyId or SecretKey."
      });
  }
  isPastTTL() {
    return this._nextCredentialsRefresh === void 0 ? !0 : this._nextCredentialsRefresh <= Date.now();
  }
  hasTokenChanged(e) {
    return !!e && !!this._credentialsAndIdentityId?.associatedIdToken && e.idToken?.toString() !== this._credentialsAndIdentityId.associatedIdToken;
  }
}
const fi = new Tt(new Ct(Q)), pi = {
  /**
   * Configures Amplify with the {@link resourceConfig} and {@link libraryOptions}.
   *
   * @param resourceConfig The {@link ResourcesConfig} object that is typically imported from the
   * `amplifyconfiguration.json` file. It can also be an object literal created inline when calling `Amplify.configure`.
   * @param libraryOptions The {@link LibraryOptions} additional options for the library.
   *
   * @example
   * import config from './amplifyconfiguration.json';
   *
   * Amplify.configure(config);
   */
  configure(t, e) {
    const n = ot(t), o = new Po({ sameSite: "lax" }), i = e?.ssr ? o : Q, s = e?.ssr ? new Tt(new Ct(o)) : fi;
    if (!n.Auth) {
      k.configure(n, e);
      return;
    }
    if (e?.Auth) {
      k.configure(n, e);
      return;
    }
    if (!k.libraryOptions.Auth) {
      K.setAuthConfig(n.Auth), K.setKeyValueStorage(
        // TODO: allow configure with a public interface
        i
      ), k.configure(n, {
        ...e,
        Auth: {
          tokenProvider: K,
          credentialsProvider: s
        }
      });
      return;
    }
    if (e) {
      const r = k.libraryOptions.Auth;
      e.ssr !== void 0 && (K.setKeyValueStorage(
        // TODO: allow configure with a public interface
        i
      ), r.credentialsProvider = s), k.configure(n, {
        Auth: r,
        ...e
      });
      return;
    }
    k.configure(n);
  },
  /**
   * Returns the {@link ResourcesConfig} object passed in as the `resourceConfig` parameter when calling
   * `Amplify.configure`.
   *
   * @returns An {@link ResourcesConfig} object.
   */
  getConfig() {
    return k.getConfig();
  }
};
class P {
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
    if (P.instance)
      return P.instance;
    P.instance = this;
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
    return P.instance || (P.instance = new P()), P.instance;
  }
  //END GetInstance() Method
  //#endregion
  //#region PUBLIC - CONFIGURE
  /**
   * Sets the Amplify configuration file
   * @param {ResourcesConfig} config The 'amplifyconfiguration.json' config file
   */
  // ----------------------------------------------------------------- //
  Configure(e) {
    pi.configure(e), console.log(e);
  }
  //END Configure() Method
  //#endregion
}
export {
  P as CognitoApiManager
};
