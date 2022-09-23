import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { spotifyApi } from '../utils/spotify';

export default function useAuth() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const isAuthenticated = !!(status === 'authenticated' && accessToken);
  const isLoading = status === 'loading';
  const refreshAccessTokenError = session?.error === 'RefreshAccessTokenError';

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isAuthenticated || refreshAccessTokenError) {
      signOut();
      return;
    }

    spotifyApi.setAccessToken(accessToken);
  }, [refreshAccessTokenError, isAuthenticated, status]);

  return {
    isAuthenticated,
    accessToken,
  };
}
