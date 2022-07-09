import React from 'react';
import Link from 'next/link';

export default function CardContainer({ artistId, card, cardMobile, ...props }) {
  return (
    <Link href={`/artist/${artistId}`}>
      <span className='cursor-pointer'>
        {card(props)}
        {cardMobile(props)}
      </span>
    </Link>
  );
}
