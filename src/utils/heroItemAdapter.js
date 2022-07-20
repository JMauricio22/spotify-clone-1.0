export const adaptPlaylistToHeroComponent = (playlist) => ({
  imageUrl: playlist?.images[0]?.url,
  title: playlist?.name,
  type: 'Playlist',
});

export const adaptArtistToHeroComponent = (artist) => ({
  imageUrl: artist.images[0].url,
  title: artist?.name,
});

export const adaptAlbumToHeroComponent = (album) => ({
  imageUrl: album.images[0].url,
  title: album?.name,
  type: 'Album',
});
