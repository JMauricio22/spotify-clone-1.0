import React from 'react';
import Link from 'next/link';

export default function CardContainer({ link, card, cardMobile, ...props }) {
  return (
    <Link href={link}>
      <a className='cursor-pointer inline-block'>
        {card(props)}
        {cardMobile(props)}
      </a>
    </Link>
  );
}
