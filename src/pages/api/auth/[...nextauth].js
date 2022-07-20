import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

/* Spotify scopes */

const spotifyScopes = [
  'user-modify-playback-state',
  'user-follow-modify',
  'user-read-recently-played',
  'user-read-playback-position',
  'user-read-playback-state',
  'user-read-email',
  'user-top-read',
  'user-read-currently-playing',
  'user-library-read',
];

/* Refresh token */

async function refreshAccessToken(token) {
  try {
    const url = 'https://accounts.spotify.com/api/token';

    const body = new URLSearchParams({
      client_id: process.env.SPOTIFY_ID,
      client_secret: process.env.SPOTIFY_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const scopes = new URLSearchParams({
  scope: spotifyScopes.join(' '),
});

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      authorization: `https://accounts.spotify.com/authorize?${scopes}`,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (user && account) {
        return {
          ...token,
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.error = token.error;
      return session;
    },
  },
});
