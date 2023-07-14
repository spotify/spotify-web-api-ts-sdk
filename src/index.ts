import { SpotifyApi } from "./SpotifyApi.js";
import AuthorizationCodeWithPKCEStrategy from "./auth/AuthorizationCodeWithPKCEStrategy.js";
import ClientCredentialsStrategy from "./auth/ClientCredentialsStrategy.js";
import IAuthStrategy from "./auth/IAuthStrategy.js";
import InMemoryCachingStrategy from "./caching/InMemoryCachingStrategy.js";
import LocalStorageCachingStrategy from "./caching/LocalStorageCachingStrategy.js";
import { ICacheStore } from "./caching/ICacheStore.js";
import GenericCache from "./caching/GenericCache.js";
import ConsoleLoggingErrorHandler from "./errorhandling/ConsoleLoggingErrorHandler.js";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler.js";
import DocumentLocationRedirectionStrategy from "./redirection/DocumentLocationRedirectionStrategy.js";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator.js";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer.js";
import { Scopes } from "./Scopes.js";
import { emptyAccessToken } from "./auth/IAuthStrategy.js";

export {
    SpotifyApi,
    AuthorizationCodeWithPKCEStrategy,
    ClientCredentialsStrategy,
    InMemoryCachingStrategy,
    LocalStorageCachingStrategy,
    GenericCache,
    ConsoleLoggingErrorHandler,
    NoOpErrorHandler,
    DocumentLocationRedirectionStrategy,
    DefaultResponseValidator,
    DefaultResponseDeserializer,
    Scopes,
    emptyAccessToken
}

export type * from "./types.js";

export type {
    IAuthStrategy,
    ICacheStore,
}
