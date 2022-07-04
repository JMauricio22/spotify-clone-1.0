import { useEffect } from 'react';
import { signIn, useSession, signOut } from 'next-auth/react';
import { spotifyApi } from '../utils/spotify';

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.accessToken) {
      if (session.error === 'RefreshAccessTokenError') {
        signOut();
      }
      const { accessToken } = session;
      spotifyApi.setAccessToken(accessToken);
    }
  }, [session]);

  return spotifyApi;
}
