import React from 'react';
import HeaderBar from './HeaderBar';
import colorAlpha from 'color-alpha';
import UserMenu from './UserMenu';
import NavigationButtons from './NavigationButtons';
import { useMediaQuery } from 'react-responsive';

const Container = React.forwardRef(({ children, bgColor = 'transparent', headerTransition, headerElement }, ref) => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <div
      ref={ref}
      className='w-full pt-[60px] h-[calc(100vh-90px)] relative overflow-y-auto text-white bg-transparent flex flex-col flex-nowrap scrollbar'
      style={{ backgroundColor: bgColor }}
    >
      <HeaderBar transition={headerTransition} bgColor={bgColor ? colorAlpha(bgColor, 0.0) : 'transparent'}>
        <>
          <NavigationButtons>{headerElement}</NavigationButtons>
          {isDesktop && <UserMenu />}
        </>
      </HeaderBar>
      {!isDesktop && <UserMenu />}
      {children}
    </div>
  );
});

export default Container;
