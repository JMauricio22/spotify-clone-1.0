const albumItemToTrackItem = (track, position) => {
  return {
    id: track.id,
    columns: {
      information: {
        position,
        trackName: track.name,
        artistName: track.artists[0].name,
        showImage: false,
      },
      time: {
        duration_ms: track.duration_ms,
      },
    },
    track,
  };
};

const artistItemToTrackItem = (track, position) => {
  return {
    id: track.id,
    columns: {
      information: {
        position,
        url: track.album.images[0].url,
        trackName: track.name,
        artistName: track.artists[0].name,
      },
      album: {
        albumName: track.album.name,
      },
      time: {
        duration_ms: track.duration_ms,
      },
    },
    track,
  };
};

const playlistItemToTrackItem = (items, position) => {
  const { track, added_at } = items;

  const trackItem = artistItemToTrackItem(track, position);

  const result = Object.assign({}, trackItem);

  result.columns = {
    ...trackItem.columns,
    added_at: {
      added_at,
    },
  };

  delete result.columns.time;

  result.columns.time = {
    ...trackItem.columns.time,
  };

  return result;
};

export const adaptPlaylistItemsToTrackItems = (playlist) =>
  playlist.map((p, index) => playlistItemToTrackItem(p, index + 1));

export const adaptArtistItemsToTrackItems = (tracks) =>
  tracks.map((track, index) => artistItemToTrackItem(track, index + 1));

export const adaptAlbumItemsToTrackItems = (tracks) =>
  tracks.map((track, index) => albumItemToTrackItem(track, index + 1));
