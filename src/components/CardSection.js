import React, { useEffect, useId, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HorizontalCardList from './HorizontalCardList';

const defaultLayout = (items) => <HorizontalCardList items={items} />;

export default function CardSection(Component) {
  return function Wrapper({ title, items, layout = defaultLayout, showAll, ...props }) {
    const id = useId();

    return (
      <section className='mt-10 w-[95%] mx-auto pl-4'>
        <h2 className='md:text-xl text-2xl mb-4 font-gothambold md:text-left'>{title}</h2>
        {layout(({ limit }) => (
          <>
            {items.slice(0, showAll ? items.length : limit ?? items.length).map((item) => (
              <Component key={`${id}-${item.id}`} {...Object.assign(item, props)} />
            ))}
          </>
        ))}
      </section>
    );
  };
}
