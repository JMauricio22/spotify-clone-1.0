import React, { useId } from 'react';
import HorizontalCardList from './HorizontalCardList';

const defaultLayout = (items) => <HorizontalCardList items={items} />;

export default function CardSection(Component) {
  return function Wrapper({ title, items, layout = defaultLayout, horizontalLayout, ...props }) {
    const id = useId();
    return (
      <section className='mt-10 w-[95%] mx-auto pl-4'>
        <h2 className='md:text-xl text-2xl mb-4 font-gothammedium md:text-left'>{title}</h2>
        {layout(
          <>
            {items.map((item) => (
              <Component key={`${id}-${item.id}`} {...Object.assign(item, props)} />
            ))}
          </>
        )}
      </section>
    );
  };
}
