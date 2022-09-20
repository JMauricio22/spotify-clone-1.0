import React from 'react';
import HeaderBar from './HeaderBar';
import colorAlpha from 'color-alpha';
import UserMenu from './UserMenu';
import NavigationButtons from './NavigationButtons';

const Container = React.forwardRef(({ children, bgColor = 'transparent', headerTransition, headerElement }, ref) => {
  return (
    <div
      ref={ref}
      className='w-full pt-[60px] h-[calc(100vh-90px)] relative overflow-y-auto text-white bg-transparent flex flex-col flex-nowrap'
      style={{ backgroundColor: bgColor }}
    >
      <HeaderBar transition={headerTransition} bgColor={bgColor ? colorAlpha(bgColor, 0.0) : 'transparent'}>
        <>
          <NavigationButtons>{headerElement}</NavigationButtons>
          <UserMenu />
        </>
      </HeaderBar>
      {children}
    </div>
  );
});

export default Container;
