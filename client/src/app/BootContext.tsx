import { createContext, useContext } from 'react';

/**
 * Tracks whether the initial boot sequence (loading screen) has completed.
 * Hero entrance animations wait for this, so the site reveals cinematically
 * instead of animating behind the loader.
 *
 * Defaults to `true` so components rendered in isolation (tests, storybook)
 * animate immediately.
 */
export const BootContext = createContext<boolean>(true);

export function useBooted(): boolean {
  return useContext(BootContext);
}
