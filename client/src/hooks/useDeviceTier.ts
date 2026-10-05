import { useEffect, useState, useCallback } from 'react';

export type DeviceTier = 'low' | 'mid' | 'high';

interface DeviceCapabilities {
  tier: DeviceTier;
  isTouch: boolean;
  reducedMotion: boolean;
}

function detectCapabilities(): DeviceCapabilities {
  if (typeof window === 'undefined') {
    return { tier: 'high', isTouch: false, reducedMotion: false };
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const w = window.innerWidth;

  // Mobile / small tablets or reduced-motion users get the lightweight tier
  let tier: DeviceTier = 'high';
  if (w < 768 || (isTouch && w < 900)) tier = 'low';
  else if (w < 1280 || isTouch) tier = 'mid';

  return { tier, isTouch, reducedMotion };
}

/**
 * Detects device capability tier for adaptive 3D / animation budgets.
 * - low: phones & small tablets → minimal particles, low DPR, simplified effects
 * - mid: tablets / smaller laptops → reduced effect counts
 * - high: desktop → full experience
 */
export function useDeviceTier(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>(detectCapabilities);

  const onChange = useCallback(() => setCaps(detectCapabilities()), []);

  useEffect(() => {
    let raf: number | null = null;
    const handleResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onChange);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    rmQuery.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (raf) cancelAnimationFrame(raf);
      rmQuery.removeEventListener('change', onChange);
    };
  }, [onChange]);

  return caps;
}
