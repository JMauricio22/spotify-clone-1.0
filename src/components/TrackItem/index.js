import React from 'react';
import TrackInfo from './TrackInfo';
import TrackAlbum from './TrackAlbum';
import TrackAddedAt from './TrackAddedAt';
import TrackDuration from './TrackDuration';

const Track = {
  Info: (props) => <TrackInfo {...props} />,
  Album: (props) => <TrackAlbum {...props} />,
  AddedAt: (props) => <TrackAddedAt {...props} />,
  Time: (props) => <TrackDuration {...props} />,
};

export default function TrackItem({ columns }) {
  const { information, album, added_at, time } = columns;

  const getColumns = () => (
    <>
      {information && <Track.Info {...information} />}
      {album && <Track.Album {...album} />}
      {added_at && <Track.AddedAt {...added_at} />}
      {time && <Track.Time {...time} />}
    </>
  );

  return <>{getColumns()}</>;
}
