import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { spotifyApi } from '../utils/spotify';

export default function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    /* Check if session is defined and the accessToken exists */
    if (session && session.accessToken) {
      /* Check if the session has an error */
      if (session.error === 'RefreshAccessTokenError') {
        /* If there's an error it redirects to the login page */
        signOut();
      }
      const { accessToken } = session;
      /* Set accessToken */
      spotifyApi.setAccessToken(accessToken);
    }
  }, [session]);

  return spotifyApi;
}
