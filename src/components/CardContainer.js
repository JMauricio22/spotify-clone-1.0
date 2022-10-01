import React from 'react';
import { useRouter } from 'next/router';

export default function CardContainer({ link, card, cardMobile, ...props }) {
  const router = useRouter();

  const goTo = (event) => {
    event.preventDefault();
    router.push(link);
  };

  return (
    <a onClick={goTo} className='cursor-pointer inline-block'>
      {card(props)}
      {cardMobile && typeof cardMobile === 'function' && cardMobile(props)}
    </a>
  );
}
