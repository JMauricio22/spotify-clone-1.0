import React, { useState } from 'react';
import Link from 'next/link';

export default function CardContainer({ id, cardContent }) {
  const [showButton, setShowButton] = useState(false);

  return (
    <Link href={`/artist/${id}`}>
      <article
        className='lg:w-full h-auto px-4 pt-5 pb-7 bg-[#101010] hover:bg-[#282828] rounded-md transition-colors duration-150 ease-out cursor-pointer lg:last:block last:hidden shadow-sm'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        {cardContent(showButton)}
      </article>
    </Link>
  );
}
