import React from 'react';

export default function CardItemList(Component) {
  return function Wrapper({ title, items, limit }) {
    return (
      <article className='mt-10 w-[95%] mx-auto'>
        <h2 className='md:text-xl text-2xl mb-4 font-gothammedium md:text-left text-center'>{title}</h2>
        <div className='grid xl:grid-cols-[repeat(4,220px)] lg:grid-cols-[repeat(4,170px)] md:grid-cols-[repeat(3,170px)] grid-cols-[80%] md:place-content-start place-content-center grid-rows-1 lg:gap-5 md:gap-2 gap-4'>
          {items.slice(0, limit).map((item) => (
            <Component key={item.id} {...item} />
          ))}
        </div>
      </article>
    );
  };
}
