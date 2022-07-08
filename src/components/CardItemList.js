import React from 'react';

export default function CardItemList(Component) {
  return function Wrapper({ title, items }) {
    return (
      <article className='mt-10 w-[95%] mx-auto pl-4'>
        <h2 className='md:text-xl text-2xl mb-4 font-gothammedium md:text-left'>{title}</h2>
        <div className='lg:grid xl:grid-cols-[repeat(4,220px)] lg:grid-cols-[repeat(4,170px)] lg:grid-rows-1 lg:gap-5 block lg:overflow-hidden overflow-x-auto whitespace-nowrap pr-4'>
          {items.map((item) => (
            <Component key={item.id} {...item} />
          ))}
        </div>
      </article>
    );
  };
}
