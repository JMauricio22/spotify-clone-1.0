import React, { useEffect, useId, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import HorizontalCardList from './HorizontalCardList';

const defaultLayout = (items) => <HorizontalCardList items={items} />;

export default function CardSection(Component) {
  return function Wrapper({ title, items, limit = 4, layout = defaultLayout, ...props }) {
    const id = useId();
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const [maxElements, setMaxElements] = useState(limit);

    useEffect(() => {
      isDesktop ? setMaxElements(limit) : setMaxElements(items.length);
    }, [isDesktop]);

    return (
      <section className='mt-10 w-[95%] mx-auto pl-4'>
        <h2 className='md:text-xl text-2xl mb-4 font-gothammedium md:text-left'>{title}</h2>
        {layout(
          <>
            {items.slice(0, maxElements).map((item) => (
              <Component key={`${id}-${item.id}`} {...Object.assign(item, props)} />
            ))}
          </>
        )}
      </section>
    );
  };
}
