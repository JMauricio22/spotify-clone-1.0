import React, { useId } from 'react';
import clsx from 'clsx';

export default function CardItemList(Component) {
  return function Wrapper({ title, items, horizontalLayout, ...props }) {
    const id = useId();
    return (
      <section className='mt-10 w-[95%] mx-auto pl-4'>
        <h2 className='md:text-xl text-2xl mb-4 font-gothammedium md:text-left'>{title}</h2>
        <ul
          className={clsx(
            'lg:grid xl:grid-cols-[repeat(4,220px)] lg:grid-cols-[repeat(4,170px)] lg:grid-rows-1 lg:gap-5',
            horizontalLayout && 'block lg:overflow-hidden overflow-x-auto whitespace-nowrap',
            !horizontalLayout && 'grid grid-rows-1 grid-cols-1'
          )}
        >
          {items.map((item) => (
            <Component key={`${id}-${item.id}`} {...Object.assign(item, props)} />
          ))}
        </ul>
      </section>
    );
  };
}
