import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPlaybackDeviceId,
  selectPlaybackError,
  selectPlaybayTransfer,
  MAX_TRANSFER_PLAYBACK_TRIES,
  selectPlaybackInit,
  transferPlayback,
  TRANSFER_PLAYBACK_ERROR,
  selectPlaybackTransferTries,
} from '../features/playback';

export default function () {
  const dispatch = useDispatch();
  /* Playback state */
  const init = useSelector(selectPlaybackInit);
  const deviceId = useSelector(selectPlaybackDeviceId);
  const transfer = useSelector(selectPlaybayTransfer);
  const playbackError = useSelector(selectPlaybackError);
  const playbackTries = useSelector(selectPlaybackTransferTries);

  useEffect(() => {
    if (
      init &&
      deviceId &&
      transfer &&
      (!playbackError || (playbackError === TRANSFER_PLAYBACK_ERROR && playbackTries <= MAX_TRANSFER_PLAYBACK_TRIES))
    ) {
      setTimeout(() => dispatch(transferPlayback(deviceId)), 500);
    }
  }, [init, deviceId, transfer, playbackError, playbackTries]);
}
