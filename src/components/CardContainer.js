import React from 'react';
import Link from 'next/link';

export default function CardContainer({ link, card, cardMobile, ...props }) {
  return (
    <Link href={link}>
      <li className='cursor-pointer inline-block'>
        {card(props)}
        {cardMobile(props)}
      </li>
    </Link>
  );
}
