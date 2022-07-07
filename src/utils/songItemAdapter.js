const trackSongItem = (track, position) => {
  return {
    information: {
      width: '1fr',
      data: {
        position,
        url: track.album.images[0].url,
        trackName: track.name,
        artistName: track.artists[0].name,
      },
    },
    album: {
      width: '200px',
      data: {
        albumName: track.album.name,
      },
    },
    time: {
      width: '100px',
      data: {
        duration_ms: track.duration_ms,
      },
    },
  };
};

const playlistSongItem = (items, position) => {
  const { track, added_at } = items;

  const trackItem = trackSongItem(track, position);

  const result = {
    ...trackItem,
    added_at: {
      width: '200px',
      data: {
        added_at,
      },
    },
  };

  delete result.time;

  result.time = {
    ...trackItem.time,
  };

  return result;
};

export const convertPlaylistItemsToSongItems = (playlist) => playlist.map((p, index) => playlistSongItem(p, index + 1));

export const convertTrackItemsToSongItems = (tracks) => tracks.map((track, index) => trackSongItem(track, index + 1));
