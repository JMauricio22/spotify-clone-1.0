import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';

function setOpacityStyle(element, opacity) {
  /* Show or hide the header */
  if (opacity === 0) {
    element.style.display = 'none';
  } else {
    element.style.display = 'flex';
  }
  /* Set header bar opacity */
  element.style.opacity = opacity.toFixed(1);
}

function setOpacityOnScrollDown({ container, header, fromScrollY }) {
  return function () {
    const scrollTopContainer = container.scrollTop;

    const diff = scrollTopContainer - fromScrollY;

    diff > 0 ? setOpacityStyle(header, Number(diff / header.clientHeight)) : setOpacityStyle(header, 0);
  };
}

const isHTMLElement = (element) => element instanceof HTMLElement;
const getMessageError = (messsage) => `[useHeaderTransition]: ${messsage}`;

const validations = {
  container: {
    validators: [
      {
        validator: (container) => isHTMLElement(container),
        error: () => getMessageError('container is´n a valid htmlElement'),
      },
    ],
  },
  header: {
    validators: [
      {
        validator: (header) => isHTMLElement(header),
        error: () => getMessageError('header is´n a valid htmlElement'),
      },
    ],
  },
  fromScrollY: {
    validators: [
      {
        validator: (fromScrollY) => typeof fromScrollY === 'number' || typeof fromScrollY === 'function',
        error: () => getMessageError('fromScrollY invalid type'),
      },
    ],
  },
};

const validate = (args) =>
  Object.keys(args).forEach((key) => {
    validations[key].validators.forEach(({ validator, error }) => {
      if (!validator(args[key])) {
        throw new Error(error());
      }
    });
  });

export default function useHeaderTransition({ active, transition }) {
  const eventRef = useRef(null);
  const { query } = useRouter();

  const removeScrollEvent = () => {
    if (eventRef.current?.target) {
      eventRef.current?.target.removeEventListener('scroll', eventRef.current?.listener);
    }
  };

  useEffect(() => {
    removeScrollEvent();
  }, [query.id]);

  useEffect(() => {
    if (active) {
      validate(transition);
      const { header, container, fromScrollY } = transition;
      const scrollListener = setOpacityOnScrollDown({ container, header, fromScrollY: fromScrollY(header) });
      eventRef.current = {
        target: container,
        listener: scrollListener,
      };
      container.addEventListener('scroll', eventRef.current.listener);
      return removeScrollEvent;
    }
  }, [active]);
}
