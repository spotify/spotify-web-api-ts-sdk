"use client";

import {
  AccessToken,
  IAuthStrategy,
  SdkConfiguration,
  SdkOptions,
  SpotifyApi,
} from "@sdk/index.js"; // use "@spotify/web-api-ts-sdk" in your own project
import { AuthUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { getSession, signIn } from "next-auth/react";

/**
 * A class that implements the IAuthStrategy interface and wraps the NextAuth functionality.
 * It retrieves the access token and other information from the JWT session handled by NextAuth.
 */
class NextAuthStrategy implements IAuthStrategy {
  public getOrCreateAccessToken(): Promise<AccessToken> {
    return this.getAccessToken();
  }

  public async getAccessToken(): Promise<AccessToken> {
    const session: any = await getSession();
    if (!session) {
      return {} as AccessToken;
    }

    if (session?.error === "RefreshAccessTokenError") {
      await signIn();
      return this.getAccessToken();
    }

    const { user }: { user: AuthUser } = session;

    return {
      access_token: user.access_token,
      token_type: "Bearer",
      expires_in: user.expires_in,
      expires: user.expires_at,
      refresh_token: user.refresh_token,
    } as AccessToken;
  }

  public removeAccessToken(): void {
    console.warn("[Spotify-SDK][WARN]\nremoveAccessToken not implemented");
  }

  public setConfiguration(configuration: SdkConfiguration): void {
    console.warn("[Spotify-SDK][WARN]\nsetConfiguration not implemented");
  }
}

function withNextAuthStrategy(config?: SdkOptions) {
  const strategy = new NextAuthStrategy();
  return new SpotifyApi(strategy, config);
}

export default withNextAuthStrategy();
