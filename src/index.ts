import { Scopes } from "./Scopes.js";
import { SpotifyApi } from "./SpotifyApi.js";
import AuthorizationCodeWithPKCEStrategy from "./auth/AuthorizationCodeWithPKCEStrategy.js";
import ClientCredentialsStrategy from "./auth/ClientCredentialsStrategy.js";
import IAuthStrategy, { emptyAccessToken } from "./auth/IAuthStrategy.js";
import ProvidedAccessTokenStrategy from "./auth/ProvidedAccessTokenStrategy.js";
import GenericCache from "./caching/GenericCache.js";
import { ICacheStore } from "./caching/ICacheStore.js";
import InMemoryCachingStrategy from "./caching/InMemoryCachingStrategy.js";
import LocalStorageCachingStrategy from "./caching/LocalStorageCachingStrategy.js";
import ConsoleLoggingErrorHandler from "./errorhandling/ConsoleLoggingErrorHandler.js";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler.js";
import DocumentLocationRedirectionStrategy from "./redirection/DocumentLocationRedirectionStrategy.js";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator.js";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer.js";

export {
  AuthorizationCodeWithPKCEStrategy,
  ClientCredentialsStrategy,
  ConsoleLoggingErrorHandler,
  DefaultResponseDeserializer,
  DefaultResponseValidator,
  DocumentLocationRedirectionStrategy,
  GenericCache,
  InMemoryCachingStrategy,
  LocalStorageCachingStrategy,
  NoOpErrorHandler,
  ProvidedAccessTokenStrategy,
  Scopes,
  SpotifyApi,
  emptyAccessToken,
};

export type * from "./types.js";

export type { IAuthStrategy, ICacheStore };
