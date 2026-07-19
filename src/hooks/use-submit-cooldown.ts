'use client';

import { useEffect, useRef, useState } from 'react';

const COOLDOWN_MS = 60_000;

export function useSubmitCooldown() {
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (cooldownUntil == null) return;

    function tick() {
      const remaining = Math.max(0, cooldownUntil! - Date.now());
      setRemainingMs(remaining);

      if (remaining <= 0 && intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    tick();
    intervalRef.current = window.setInterval(tick, 250);
  }, [cooldownUntil]);

  return {
    isCoolingDown: remainingMs > 0,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    startCooldown: () => setCooldownUntil(Date.now() + COOLDOWN_MS),
  };
}
