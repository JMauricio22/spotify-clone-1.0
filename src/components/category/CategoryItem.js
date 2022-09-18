import React, { useEffect, useMemo, useRef, useState } from 'react';
import randomColor from 'randomcolor';
import Link from 'next/link';

export default function CategoryItem({ category }) {
  const color = useMemo(() => randomColor({ seed: category.id }), [category.id]);
  // const [imageSize, setImageSize] = useState(null);
  const [monted, setMonted] = useState(false);
  const containerElementRef = useRef();
  const imageRef = useRef();
  const resizeObserver = useRef();

  useEffect(() => {
    setMonted(true);
  }, []);

  useEffect(() => {
    if (monted) {
      resizeObserver.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const image = imageRef.current;
          if (image) {
            const percentage = window.matchMedia('(max-width: 800px)').matches ? 0.7 : 0.5;
            const size = entry.contentRect.width * percentage;
            image.style.width = `${size}px`;
            image.style.height = `${size}px`;
          }
        }
      });

      resizeObserver.current.observe(containerElementRef.current);
    }

    return () => {
      if (resizeObserver.current && containerElementRef.current) {
        resizeObserver.current.unobserve(containerElementRef.current);
      }
    };
  }, [monted]);

  return (
    <Link href={`/category/${category.id}`}>
      <li
        ref={containerElementRef}
        className='w-full h-full p-4 rounded-lg bg-slate-400 cursor-pointer overflow-hidden relative hover:opacity-80 group transition-all'
        style={{ background: color }}
      >
        <span className='block w-9/12 whitespace-pre-wrap text-xl font-gothambold line-clamp-3'>{category.name}</span>
        <img
          ref={imageRef}
          className='absolute -right-3 -bottom-1 w-[80px] h-[80px] transform rotate-[30deg] group-hover:scale-150 transition-all'
          src={category.icons[0]?.url}
          alt={category.name}
        />
      </li>
    </Link>
  );
}
