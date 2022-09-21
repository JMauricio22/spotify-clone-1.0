export const recommendationToCardItem = (recommendation) => ({
  id: recommendation.id,
  link: `/album/${recommendation?.album?.id}`,
  artistId: recommendation?.artists[0]?.id,
  title: recommendation?.name,
  subtitle: recommendation?.artists[0]?.name,
  image: recommendation?.album?.images[0]?.url,
});

export const artistToCardItem = (artist) => ({
  id: artist.id,
  link: `/artist/${artist.id}`,
  artistId: artist.id,
  type: 'artist',
  title: artist?.name,
  subtitle: 'Artist',
  image: artist?.images[0]?.url,
});

export const playlistToCardItem = (playlist) => ({
  id: playlist.id,
  link: `/playlist/${playlist.id}`,
  artistId: playlist.id,
  type: `Playlist - ${playlist.owner?.display_name}`,
  title: playlist?.name,
  subtitle: `Total songs ${Number(playlist.tracks.total || 0).toLocaleString('es-US')}`,
  image: playlist?.images[0]?.url,
});

export const albumToCardItem = (album) => ({
  id: album.id,
  link: `/album/${album.id}`,
  artistId: album.id,
  type: `Album - ${album.artists[0]?.name}`,
  title: album?.name,
  subtitle: `Total songs ${Number(album.total_tracks || 0).toLocaleString('es-US')}`,
  image: album?.images[0]?.url,
});

export const adaptArtistToCard = (artists) => artists.map((artist) => artistToCardItem(artist));

export const adaptRecommendationToCard = (recommendations) =>
  recommendations.map((recommendation) => recommendationToCardItem(recommendation));

export const adaptPlaylistToCard = (p) => p.map((playlist) => playlistToCardItem(playlist));

export const adaptAlbumToCard = (albums) => albums.map((album) => albumToCardItem(album));
