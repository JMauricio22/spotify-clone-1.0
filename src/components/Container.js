import React from 'react';
import { useSession, signOut } from 'next-auth/react';

const Container = React.forwardRef(({ children, header, ...props }, ref) => {
  const { data: session } = useSession();

  return (
    <div
      ref={ref}
      className='h-auto min-h-screen w-full overflow-y-auto text-white relative bg-transparent pb-[90px]'
      {...props}
    >
      {session?.user && (
        <button
          className='px-4 py-2 rounded-[50px] bg-black fixed z-50 right-8 top-3 text-gray-200 text-sm lg:text-md'
          onClick={() => signOut()}
        >
          {session.user.name}
        </button>
      )}
      {header}
      {children}
    </div>
  );
});

export default Container;
