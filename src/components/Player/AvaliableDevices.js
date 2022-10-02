import React, { Fragment, useEffect } from 'react';
import { DesktopComputerIcon } from '@heroicons/react/outline';
import { Transition, Popover } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDevice, selectDevices, selectFetchDevices, transferPlayback } from '../../features/playback';
import useFetchDevices from '../../hooks/useFetchDevices';

export default function AvaliableDevices() {
  const devices = useSelector(selectDevices);
  const activeDevice = useSelector(selectActiveDevice);
  const fetchDevices = useSelector(selectFetchDevices);
  const dispatch = useDispatch();

  const disabled = (devices.length === 0 && !activeDevice) || fetchDevices;

  useFetchDevices();

  const changeDevice = (deviceId) => dispatch(transferPlayback(deviceId));

  const Devices = () => (
    <div className='px-4 space-y-4'>
      {/* Active device */}
      {activeDevice && (
        <div className='flex items-center space-x-3 px-2'>
          <div>
            <DesktopComputerIcon className='w-8 h-8 text-green-500' />
          </div>
          <div>
            <p className='text-base font-gothambold text-white'>Current Device</p>
            <span className='text-sm text-green-500 font-gothammedium'>{activeDevice.name}</span>
          </div>
        </div>
      )}
      {/*All avaliable devices */}
      {devices.length !== 0 && (
        <div>
          <p className='font-gothambold text-sm text-white mb-3 px-2'>Select other devices</p>
          <div className='space-y-2 max-h-36 overflow-y-auto scrollbar-thin scrollbar-track-neutral-600 scrollbar-thumb-slate-200'>
            {devices.map((device) => (
              <button
                key={device.id}
                onClick={() => changeDevice(device.id)}
                className='text-sm inline-flex space-x-3 items-center hover:bg-neutral-600 rounded-md px-2 w-full py-3'
              >
                <DesktopComputerIcon className='w-8 h-8' />
                <span className='font-gothammedium text-slate-200'>{device.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const ItemsContainer = ({ close }) => {
    useEffect(() => {
      if (disabled) {
        close();
      }
    }, [disabled]);

    return (
      <>
        <Devices />
      </>
    );
  };

  return (
    <Popover as='div' className='relative inline-flex items-center'>
      <Popover.Button disabled={disabled} className='h-auto outline-none'>
        <DesktopComputerIcon className='w-5 h-5 hover:text-white' />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Popover.Panel className='absolute right-1/2 translate-x-1/2 -top-3 -translate-y-[100%] bg-[#282828] px-1 py-6 w-80 h-auto rounded-lg'>
          {ItemsContainer}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
