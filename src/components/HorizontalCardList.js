import React from 'react';

export default function HorizontalCardList({ items }) {
  return (
    <ul className='lg:grid xl:grid-cols-[repeat(4,220px)] lg:grid-cols-[repeat(4,170px)] lg:grid-rows-1 lg:gap-5 block lg:overflow-hidden overflow-x-auto whitespace-nowrap'>
      {items}
    </ul>
  );
}
