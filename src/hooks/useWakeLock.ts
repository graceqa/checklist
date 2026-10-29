import { useEffect, useRef, useState, useCallback } from 'react';

export function useWakeLock(enabled: boolean) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  useEffect(() => {
    setIsSupported(typeof navigator !== 'undefined' && 'wakeLock' in navigator);
  }, []);

  const requestWakeLock = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) {
      return;
    }

    try {
      if (wakeLockRef.current && !wakeLockRef.current.released) {
        return; // Already holding an active wake lock
      }

      const lock = await navigator.wakeLock.request('screen');
      wakeLockRef.current = lock;
      setIsActive(true);

      lock.addEventListener('release', () => {
        wakeLockRef.current = null;
        setIsActive(false);
      });
    } catch (err) {
      // Browser may reject if battery is low or tab is backgrounded
      setIsActive(false);
    }
  }, []);

  const releaseWakeLock = useCallback(async () => {
    if (wakeLockRef.current && !wakeLockRef.current.released) {
      try {
        await wakeLockRef.current.release();
      } catch (err) {
        // Ignore release errors
      }
      wakeLockRef.current = null;
      setIsActive(false);
    }
  }, []);

  // Request or release when enabled changes
  useEffect(() => {
    if (enabled) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
    };
  }, [enabled, requestWakeLock, releaseWakeLock]);

  // Re-acquire wake lock when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && enabled) {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [enabled, requestWakeLock]);

  return {
    isSupported,
    isActive,
    requestWakeLock
  };
}
