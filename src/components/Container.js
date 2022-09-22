import React from 'react';
import HeaderBar from './HeaderBar';
import colorAlpha from 'color-alpha';
import UserMenu from './UserMenu';
import NavigationButtons from './NavigationButtons';

const Container = React.forwardRef(({ children, bgColor = 'transparent', headerTransition, headerElement }, ref) => {
  return (
    <section
      ref={ref}
      className='grid-in-main relative overflow-y-auto text-white bg-transparent flex flex-col flex-nowrap scrollbar'
      style={{ backgroundColor: bgColor }}
    >
      {/* <HeaderBar transition={headerTransition} bgColor={bgColor ? colorAlpha(bgColor, 0.0) : 'transparent'}>
        <>
          <NavigationButtons>{headerElement}</NavigationButtons>
          <UserMenu />
        </>
      </HeaderBar> */}
      {children}
    </section>
  );
});

export default Container;
