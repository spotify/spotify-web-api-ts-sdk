import { SpotifyApi } from "./SpotifyApi";
import AuthorizationCodeWithPKCEStrategy from "./auth/AuthorizationCodeWithPKCEStrategy";
import ClientCredentialsStrategy from "./auth/ClientCredentialsStrategy";
import IAuthStrategy from "./auth/IAuthStrategy";
import InMemoryCachingStrategy from "./caching/InMemoryCachingStrategy";
import LocalStorageCachingStrategy from "./caching/LocalStorageCachingStrategy";
import { ICacheStore } from "./caching/ICacheStore";
import GenericCache from "./caching/GenericCache";
import ConsoleLoggingErrorHandler from "./errorhandling/ConsoleLoggingErrorHandler";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler";
import DocumentLocationRedirectionStrategy from "./redirection/DocumentLocationRedirectionStrategy";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer";

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
    DefaultResponseDeserializer
}

export type {
    IAuthStrategy,
    ICacheStore
}
