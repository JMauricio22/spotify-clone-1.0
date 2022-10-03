import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';

export default function UserMenu() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <Menu as={React.Fragment}>
          <div className='grid place-content-center mr-3'>
            <Menu.Button className='lg:w-auto lg:h-auto w-8 h-8 lg:flex lg:items-center grid place-content-center py-2 lg:rounded-[50px] rounded-full bg-gray-600 lg:bg-black text-slate-200 text-sm lg:text-md font-gothammedium'>
              <span className='lg:pl-3 lg:pr-2 '>
                <UserCircleIcon className='md:w-5 md:h-5 w-4 h-4' />
              </span>
              <span className='md:text-small text-xs lg:inline-block hidden'>{session.user.name}</span>
              <span className='px-2'>
                <ChevronDownIcon className='md:w-5 md:h-5 w-4 h- lg:inline-block hidden' />
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
              className='z-20'
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
                    <button
                      className='w-full h-full text-left'
                      onClick={() =>
                        signOut({
                          callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
                        })
                      }
                    >
                      Log out
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      )}
    </>
  );
}
