"use client";

import type Lenis from "lenis";
import { createContext, useContext } from "react";

export const ScrollContext = createContext(0);

export const ScrollLockContext = createContext<(locked: boolean) => void>(
  () => {},
);

export const LenisContext = createContext<Lenis | null>(null);

export function useScrollY() {
  return useContext(ScrollContext);
}

export function useScrollLock() {
  return useContext(ScrollLockContext);
}

export function useLenis() {
  return useContext(LenisContext);
}
