import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

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
  callbacks: {},
});
