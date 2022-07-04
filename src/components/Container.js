import React from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Container({ children, ...props }) {
  const { data: session } = useSession();
  return (
    <div className='h-screen max-h-screen overflow-y-auto flex-1 text-white bg-zinc-900' {...props}>
      {session?.user && (
        <button
          className='px-4 py-2 rounded-[50px] bg-black absolute z-50 right-8 top-5 text-gray-200 text-sm lg:text-md'
          onClick={() => signOut()}
        >
          {session.user.name}
        </button>
      )}
      {children}
    </div>
  );
}
