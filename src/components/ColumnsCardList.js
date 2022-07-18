import React from 'react';

export default function HorizontalCardList({ items }) {
  return (
    <ul className='xl:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(4,170px)] lg:grid-rows-1 lg:gap-6 lg:overflow-hidden lg:place-items-stretch grid-rows-1 grid sm:grid-cols-3 grid-cols-2 place-items-center'>
      {items}
    </ul>
  );
}
