import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';

const Container = React.forwardRef(({ children, bgColor = 'transparent' }, ref) => {
  const { data: session } = useSession();

  return (
    <div
      ref={ref}
      className='w-full h-[calc(100vh-90px)] relative overflow-y-auto text-white bg-transparent flex flex-col flex-nowrap'
      style={{ backgroundColor: bgColor }}
    >
      {session?.user && (
        <Menu as='div' className='fixed z-50 right-8 top-3'>
          <Menu.Button className='py-2 rounded-[50px] flex items-center bg-black text-slate-200 text-sm lg:text-md font-gothammedium'>
            <span className='pl-3 pr-2'>
              <UserCircleIcon className='w-5 h-5' />
            </span>
            <span>{session.user.name}</span>
            <span className='px-2'>
              <ChevronDownIcon className='w-5 h-5' />
            </span>
          </Menu.Button>
          <Transition
            as='div'
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute rounded-md right-0 px-1 py-1 mt-2 w-52 origin-top-right divide-y divide-gray-100 bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item
                  as='span'
                  className='block py-3 px-4 rounded-md hover:bg-[#3e3e3e] text-slate-100 font-gothambook text-sm'
                >
                  <button className='w-full h-full text-left'>Profile</button>
                </Menu.Item>
                <Menu.Item
                  as='span'
                  className='block py-3 px-4 rounded-md hover:bg-[#3e3e3e] text-slate-100 font-gothambook text-sm'
                >
                  <button className='w-full h-full text-left' onClick={() => signOut()}>
                    Log out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      {children}
    </div>
  );
});

export default Container;
