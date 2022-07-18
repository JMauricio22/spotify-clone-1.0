export const adaptPlaylistToHeroComponent = (playlist) => ({
  imageUrl: playlist?.images[0]?.url,
  title: playlist?.name,
  type: 'Playlist',
});

export const adaptArtistToHeroComponent = (artist) => ({
  imageUrl: artist.images[0].url,
  title: artist?.name,
});
