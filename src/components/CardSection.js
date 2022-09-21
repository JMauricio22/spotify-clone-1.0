import React, { useId } from 'react';
import HorizontalCardList from './HorizontalCardList';

const defaultLayout = (items) => <HorizontalCardList items={items} />;

export default function CardSection(Component) {
  return function Wrapper({ title, items, showAll, element, layout = defaultLayout, ...props }) {
    const id = useId();

    return (
      <section className='lg:mt-10 mt-5 w-[95%] mx-auto pl-4'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='md:text-xl text-2xl font-gothambold md:text-left mb-0'>{title}</h2>
          {element}
        </div>
        {layout(({ limit }) => (
          <>
            {items.slice(0, showAll ? items.length : limit ?? items.length).map((item) => (
              <Component key={`${id}-${item.id}`} {...Object.assign(item, props)} />
            ))}
          </>
        ))}
      </section>
    );
  };
}
