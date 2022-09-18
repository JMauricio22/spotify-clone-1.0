import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const DESKTOP_DEFAULT_MAX_CARD_WIDTH = 230;
const DESKTOP_DEFAULT_MIN_COLS = 4;
const QUERY = '(min-width: 1024px)';
const GRID_GAP = 20;
const AUTHO_HEIGHT = true;

export default function useGridDynamicCols({
  container,
  mobileLayoutCallback,
  maxWidth = DESKTOP_DEFAULT_MAX_CARD_WIDTH,
  minCols = DESKTOP_DEFAULT_MIN_COLS,
  autoHeight = AUTHO_HEIGHT,
  gap = GRID_GAP,
  query = QUERY,
}) {
  const [isMounted, setIsMounted] = useState();
  const [columnCount, setColumnCount] = useState(0);
  const isDesktop = useMediaQuery({
    query,
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
      const size = (ul.clientWidth - Math.abs(columns - 1) * gap) / columns;
      ul.style.display = 'grid';
      ul.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;
      ul.style.gridAutoRows = autoHeight ? '1fr' : `${size}px`;
      ul.style.gridGap = `${gap}px`;
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
