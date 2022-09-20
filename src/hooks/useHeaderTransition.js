import { useRouter } from 'next/router';
import { useRef, useEffect } from 'react';
import colorAlpha from 'color-alpha';

function setBackgroundColor(element, opacity) {
  const currentColor = element.style.backgroundColor;
  element.style.backgroundColor = colorAlpha(currentColor, opacity);
}

function setOpacityOnScrollDown({ container, header, fromScrollY, onVisible, onTransparent }) {
  let currentAlphaValue = 0;

  return function () {
    const scrollTopContainer = container.scrollTop;

    const diff = scrollTopContainer - fromScrollY;

    let newAlphaValue;

    if (diff > 0) {
      newAlphaValue = Number(diff / header.clientHeight).toFixed(1);
    } else {
      newAlphaValue = 0;
    }

    setBackgroundColor(header, newAlphaValue);

    if (newAlphaValue >= 1) {
      if (!(currentAlphaValue >= 1)) {
        onVisible();
      }
    } else {
      if (currentAlphaValue >= 1) {
        onTransparent();
      }
    }

    currentAlphaValue = newAlphaValue;
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
  onVisible: {
    validators: [
      {
        validator: (onVisible) => typeof onVisible === 'function',
        error: () => getMessageError('onVisible invalid type'),
      },
    ],
  },
  onTransparent: {
    validators: [
      {
        validator: (onTransparent) => typeof onTransparent === 'function',
        error: () => getMessageError('onTransparent invalid type'),
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
      const { header, container, fromScrollY, onVisible, onTransparent } = transition;
      const scrollListener = setOpacityOnScrollDown({
        container,
        header,
        fromScrollY: fromScrollY(header),
        onVisible,
        onTransparent,
      });
      eventRef.current = {
        target: container,
        listener: scrollListener,
      };
      container.addEventListener('scroll', eventRef.current.listener);
      return removeScrollEvent;
    }
  }, [active]);
}
