import React, { useState } from 'react';
import Link from 'next/link';

export default function CardContainer({ id, cardContent }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <Link href={`/artist/${id}`}>
      <article
        className='lg:w-full h-auto lg:px-4 lg:pt-5 lg:pb-7 py-2 px-3 lg:bg-[#101010] lg:hover:bg-[#282828] rounded-md transition-colors duration-150 ease-out cursor-pointer lg:last:block last:hidden w-[200px] inline-block shadow-sm last:mr-0 lg:mr-0 lg:nth-child-n5:hidden'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        {cardContent(showButton)}
      </article>
    </Link>
  );
}
