import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every route + hash change:
 *  - If a hash is present, scroll the matching id into view (with retries
 *    so lazy-loaded sections have time to mount).
 *  - Otherwise, scroll to the top of the page.
 */
export const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (attempts++ < 12) {
          window.setTimeout(tryScroll, 80);
        }
      };
      tryScroll();
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, key]);

  return null;
};
