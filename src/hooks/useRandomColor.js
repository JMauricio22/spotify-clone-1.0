import { useMemo } from 'react';
import randomColor from 'randomcolor';

export default function useRandomColor({ generateRandomColor, seed }) {
  const color = useMemo(() => {
    /* Generate random color for playlist */
    if (generateRandomColor) {
      return randomColor({
        luminosity: 'dark',
        format: 'hsl',
        seed,
      });
    }
  }, [generateRandomColor, seed]);

  return color;
}
