'use client';

import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

import { BrandLogoMark } from '@/components/brand/BrandLogoMark';
import { easeOutSmooth } from '@/lib/motion/presets';
import { cn } from '@/lib/utils';

/** Time the splash stays fully visible before fade-out (~2s total with exit) */
const SPLASH_HOLD_MS = 1600;
const SPLASH_EXIT_MS = 400;
const SPLASH_REDUCED_MS = 600;
const SPLASH_SESSION_KEY = 'ohealth-splash-seen';

const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled])';

const subscribeNoop = () => () => {};
const getClientMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

const splashListeners = new Set<() => void>();

function subscribeSplash(onStoreChange: () => void) {
  splashListeners.add(onStoreChange);
  return () => splashListeners.delete(onStoreChange);
}

function notifySplashChange() {
  splashListeners.forEach(listener => listener());
}

function hasSeenSplash(): boolean {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function getSplashShouldShow(): boolean {
  return !hasSeenSplash();
}

function markSplashSeen(): void {
  try {
    sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
  } catch {
    // Private browsing or storage disabled — splash may replay on reload.
  }
}

function dismissSplash(): void {
  markSplashSeen();
  notifySplashChange();
}

export function AppSplash() {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientMountedSnapshot,
    getServerMountedSnapshot,
  );
  const active = useSyncExternalStore(subscribeSplash, getSplashShouldShow, () => false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(() => {
    dismissSplash();
  }, []);

  useEffect(() => {
    if (!mounted || !active) return;

    const holdMs = reduceMotion ? SPLASH_REDUCED_MS : SPLASH_HOLD_MS;

    const exitTimer = window.setTimeout(() => {
      dismissSplash();
    }, holdMs);

    return () => window.clearTimeout(exitTimer);
  }, [mounted, active, reduceMotion]);

  useEffect(() => {
    if (!mounted || !active) return;

    skipRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        dismissSplash();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      const focusables = dialog
        ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        : [];

      if (focusables.length === 0) return;

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
  }, [mounted, active]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {active ? (
        <m.div
          ref={dialogRef}
          key="app-splash"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to OHealth+"
          className={cn(
            'fixed inset-0 z-200 flex flex-col items-center justify-center',
            'bg-linear-to-br from-[#d8e5ff] via-white to-brand-gray-50',
          )}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: SPLASH_EXIT_MS / 1000, ease: easeOutSmooth }}>
          <button
            ref={skipRef}
            type="button"
            onClick={dismiss}
            className="absolute top-4 right-4 rounded-md px-3 py-1.5 text-sm font-medium text-brand-neutral-600 hover:bg-white/60 hover:text-brand-black-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500">
            Skip
          </button>

          <m.div
            aria-hidden
            className="pointer-events-none absolute size-72 rounded-full bg-brand-primary-200/45 blur-3xl sm:size-96"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.85, 0.55], scale: [0.6, 1.15, 1] }}
            transition={{
              duration: reduceMotion ? 0.25 : 1.6,
              ease: easeOutSmooth,
              times: [0, 0.45, 1],
            }}
          />

          <m.div
            className="relative flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{
              duration: reduceMotion ? 0.15 : 0.65,
              ease: easeOutSmooth,
            }}>
            <m.div
              className="relative"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.04, 1],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      delay: 1.1,
                      duration: 1.1,
                      repeat: 1,
                      ease: easeOutSmooth,
                    }
              }>
              <BrandLogoMark size={112} animate />
            </m.div>

            <m.p
              className="text-xl font-semibold tracking-[-0.8px] text-brand-black-800 sm:text-2xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reduceMotion ? 0 : 0.8,
                duration: 0.5,
                ease: easeOutSmooth,
              }}>
              OHealth+
            </m.p>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
