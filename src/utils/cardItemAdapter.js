export const recomendationAdapter = (recommendation) => ({
  id: recommendation.id,
  link: `/artist/${recommendation?.artists[0]?.id}`,
  artistId: recommendation?.artists[0]?.id,
  title: recommendation?.name,
  subtitle: recommendation?.artists[0]?.name,
  image: recommendation?.album?.images[0]?.url,
});

export const artistAdapter = (artist) => ({
  id: artist.id,
  link: `/artist/${artist.id}`,
  artistId: artist.id,
  title: artist?.name,
  subtitle: 'Artist',
  image: artist?.images[0]?.url,
});

export const playlistAdapter = (playlist) => ({
  id: playlist.id,
  link: `/playlist/${playlist.id}`,
  artistId: playlist.id,
  title: playlist?.name,
  subtitle: `Total songs ${Number(playlist.tracks.total || 0).toLocaleString('es-US')}`,
  image: playlist?.images[0]?.url,
});

export const generateItemsWithArtisAdapter = (artists) => artists.map((artist) => artistAdapter(artist));

export const generateItemsWithRecommendationAdaptor = (recommendations) =>
  recommendations.map((recommendation) => recomendationAdapter(recommendation));

export const generateItemsWithPlaylistAdapter = (p) => p.map((playlist) => playlistAdapter(playlist));
