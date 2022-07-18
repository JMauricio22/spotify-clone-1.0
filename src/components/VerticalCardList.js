import React from 'react';

export default function VerticalCardList({ items }) {
  return (
    <ul className='grid xl:grid-cols-[repeat(4,1fr)] lg:grid-cols-[repeat(4,170px)] lg:grid-rows-1 lg:gap-6 lg:overflow-hidden grid-rows-1 grid-cols-1'>
      {items}
    </ul>
  );
}
