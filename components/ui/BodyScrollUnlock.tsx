"use client";

import { useEffect } from "react";

/** Limpia overflow bloqueado por loaders o menús en sesiones anteriores. */
export function BodyScrollUnlock() {
  useEffect(() => {
    document.body.style.overflow = "";
    document.body.style.pointerEvents = "";
  }, []);

  return null;
}
