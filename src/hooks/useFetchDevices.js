import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FETCH_DEVICES_ERROR,
  MAX_DEVICE_FETCH_TRIES,
  selectFetchDevices,
  selectFetchDevicesFetchTries,
  selectPlaybackError,
  selectPlaybackInit,
  fetchAvaliableDevices,
} from '../features/playback';

export default function () {
  const init = useSelector(selectPlaybackInit);
  const fetchDevices = useSelector(selectFetchDevices);
  const fetchDevicesTries = useSelector(selectFetchDevicesFetchTries);
  const error = useSelector(selectPlaybackError);

  const dispatch = useDispatch();

  useEffect(() => {
    /* Try to fetch all devices at application startup.  */
    if (
      init &&
      fetchDevices &&
      (!error || (error === FETCH_DEVICES_ERROR && fetchDevicesTries <= MAX_DEVICE_FETCH_TRIES))
    ) {
      dispatch(fetchAvaliableDevices());
    }
  }, [init, fetchDevices, fetchDevicesTries, error]);

  useEffect(() => {
    /* Fetch all devices when making a playback transfer */
    if (!init && fetchDevices) {
      dispatch(fetchAvaliableDevices());
    }
  }, [init, fetchDevices]);
}
