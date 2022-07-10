import React from 'react';
import Link from 'next/link';

export default function CardContainer({ link, card, cardMobile, ...props }) {
  return (
    <Link href={link}>
      <span className='cursor-pointer'>
        {card(props)}
        {cardMobile(props)}
      </span>
    </Link>
  );
}
