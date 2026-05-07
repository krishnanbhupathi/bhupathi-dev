import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NAV_OFFSET = 72;
const WATCH_TIMEOUT_MS = 5000;
const RE_SCROLL_DELAY_MS = 600;

const scrollToElement = (el: HTMLElement, smooth: boolean) => {
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' });
};

export const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const id = decodeURIComponent(hash.replace(/^#/, ''));
    let cancelled = false;
    let observer: MutationObserver | null = null;
    let watchTimeoutId: number | null = null;
    let reScrollTimeoutId: number | null = null;

    // Land on target instantly, then nudge smoothly once layout has had
    // a chance to settle (additional lazy chunks may have mounted below
    // and shifted our element's final Y).
    const performScroll = (el: HTMLElement) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) return;
          scrollToElement(el, false);
          reScrollTimeoutId = window.setTimeout(() => {
            const fresh = document.getElementById(id);
            if (fresh && !cancelled) scrollToElement(fresh, true);
          }, RE_SCROLL_DELAY_MS);
        });
      });
    };

    const found = document.getElementById(id);
    if (found) {
      performScroll(found);
      return () => {
        cancelled = true;
        if (reScrollTimeoutId) clearTimeout(reScrollTimeoutId);
      };
    }

    observer = new MutationObserver(() => {
      const el = document.getElementById(id);
      if (el) {
        observer?.disconnect();
        observer = null;
        if (watchTimeoutId) clearTimeout(watchTimeoutId);
        performScroll(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    watchTimeoutId = window.setTimeout(() => {
      observer?.disconnect();
      observer = null;
    }, WATCH_TIMEOUT_MS);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (watchTimeoutId) clearTimeout(watchTimeoutId);
      if (reScrollTimeoutId) clearTimeout(reScrollTimeoutId);
    };
  }, [pathname, hash, key]);

  return null;
};
