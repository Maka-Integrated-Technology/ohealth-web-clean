import { useCallback, useEffect, useRef, useState } from 'react';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';
const BACKDROP_ROOT_IDS = ['main-content', 'site-footer'];

function setPageBackdropHidden(hidden: boolean) {
  for (const id of BACKDROP_ROOT_IDS) {
    const element = document.getElementById(id);
    if (!element) continue;
    if (hidden) {
      element.setAttribute('aria-hidden', 'true');
    } else {
      element.removeAttribute('aria-hidden');
    }
  }
}

export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen(v => !v), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setPageBackdropHidden(true);

    return () => {
      document.body.style.overflow = previousOverflow;
      setPageBackdropHidden(false);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const menu = menuRef.current;
    const focusables = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusables[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) return;
    toggleRef.current?.focus();
  }, [open]);

  return { open, close, toggle, menuRef, toggleRef };
}
