"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NavAnchor } from "@/components/ui/NavAnchor";
import { useScrollY } from "@/components/providers/ScrollContext";
import { navItems } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 16;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-4 sm:pt-4 md:px-6">
      <div
        className={cn(
          "pointer-events-auto mx-auto flex max-w-container min-w-0 items-center justify-between gap-2 overflow-hidden rounded-full border px-3 py-2.5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-luxury sm:gap-3 sm:px-5 sm:py-3 md:px-6",
          scrolled
            ? "border-line bg-glass shadow-soft backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent shadow-none backdrop-blur-none",
        )}
      >
        <Link href="/" className="min-w-0 shrink" aria-label="Inicio">
          <BrandLogo size="nav" />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-4 xl:flex xl:gap-5"
          aria-label="Secciones principales"
        >
          {navItems.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              className="group relative shrink-0 whitespace-nowrap text-[13px] text-muted transition-colors hover:text-foreground xl:text-sm"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-optic transition-all duration-500 ease-luxury group-hover:w-full" />
            </NavAnchor>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <AnimatedThemeToggler
            duration={500}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:bg-paper/60 sm:h-10 sm:w-10"
            aria-label="Cambiar tema claro u oscuro"
          />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:bg-paper/60 xl:hidden sm:h-10 sm:w-10"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "Cerrar menú" : "Abrir menú"}
            </span>
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
          <Link
            href="/reservar"
            className="btn-cta hidden px-4 py-2 text-xs sm:inline-flex sm:px-5 sm:text-sm"
          >
            Reservar →
          </Link>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="pointer-events-auto mx-auto mt-2 max-w-container rounded-3xl border border-line bg-glass px-4 py-4 shadow-soft backdrop-blur-xl xl:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavAnchor
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base text-foreground transition-colors hover:bg-paper/60"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavAnchor>
              </li>
            ))}
            <li className="mt-2 border-t border-line/80 pt-3">
              <Link
                href="/reservar"
                className="btn-cta w-full justify-center"
                onClick={() => setMenuOpen(false)}
              >
                Reservar tu examen →
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
