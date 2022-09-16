import React, { useMemo } from 'react';
import randomColor from 'randomcolor';
import Link from 'next/link';

export default function CategoryItem({ category }) {
  const color = useMemo(() => randomColor({ seed: category.id }), [category.id]);

  return (
    <Link href={`/category/${category.id}`}>
      <li
        className='w-auto h-52 p-4 rounded-lg bg-slate-400 cursor-pointer overflow-hidden relative'
        style={{ background: color }}
      >
        <span className='block w-[100px] whitespace-pre-wrap text-md font-gothambold line-clamp-2'>
          {category.name}
        </span>
        <img
          className='absolute -right-3 -bottom-1 w-[80px] h-[80px] transform rotate-[30deg]'
          src={category.icons[0]?.url}
          alt={category.name}
        />
      </li>
    </Link>
  );
}
