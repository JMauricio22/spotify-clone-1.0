import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const DESKTOP_DEFAULT_MAX_CARD_WIDTH = 230;
const DESKTOP_DEFAULT_MIN_COLS = 4;

export default function useGridDynamicCols({
  container,
  mobileLayoutCallback,
  maxWidth = DESKTOP_DEFAULT_MAX_CARD_WIDTH,
  minCols = DESKTOP_DEFAULT_MIN_COLS,
  query = '(min-width: 1024px)',
}) {
  const [isMounted, setIsMounted] = useState();
  const [columnCount, setColumnCount] = useState(0);
  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  useEffect(() => {
    /* Component was mounted */
    setIsMounted(true);
  }, []);

  useEffect(() => {
    function calculateGridTemplateCols() {
      const { current: ul } = container;
      /* Calculate grid columns */
      /* If not a desktop set grid-template-columns to a column */
      const isDesktop = window.matchMedia(query).matches;
      if (!isDesktop) {
        typeof mobileLayoutCallback === 'function' && mobileLayoutCallback(ul);
        // ul.style.gridTemplateColumns = '1fr';
        return;
      }
      /* If it´s a desk calculate columns */
      let columns = Math.floor(ul.clientWidth / maxWidth);
      /* If columns is less than 4 set columns to 4 */
      columns = columns < minCols ? minCols : columns;
      ul.style.display = 'grid';
      ul.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      setColumnCount(columns);
    }

    calculateGridTemplateCols();

    window.addEventListener('resize', calculateGridTemplateCols);

    return () => window.removeEventListener('resize', calculateGridTemplateCols);
  }, []);

  return {
    showContent: isMounted,
    columnCount,
    isDesktop,
  };
}
