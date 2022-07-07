const trackSongItem = (track, position) => {
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

const playlistSongItem = (items, position) => {
  const { track, added_at } = items;

  const trackItem = trackSongItem(track, position);

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

export const convertPlaylistItemsToSongItems = (playlist) => playlist.map((p, index) => playlistSongItem(p, index + 1));

export const convertTrackItemsToSongItems = (tracks) => tracks.map((track, index) => trackSongItem(track, index + 1));
