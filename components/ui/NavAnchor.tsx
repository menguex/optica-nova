"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { useLenis } from "@/components/providers/ScrollContext";
import { parseHashHref, scrollToSection } from "@/lib/scroll";

type NavAnchorProps = ComponentProps<typeof Link>;

export function NavAnchor({ href, onClick, ...props }: NavAnchorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const hrefString = typeof href === "string" ? href : href.pathname ?? "";
  const { path, hash } = parseHashHref(hrefString);

  function scrollToHash(targetHash: string) {
    const selector = targetHash.startsWith("#") ? targetHash : `#${targetHash}`;
    const apply = () => {
      scrollToSection(targetHash, { lenis });
      window.history.pushState(null, "", `${path}${selector}`);
    };

    // Modal u otros overlays detienen Lenis; esperar al desbloqueo del scroll.
    if (lenis?.isStopped) {
      window.setTimeout(apply, 160);
      return;
    }

    apply();
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !hash) return;

    const targetPath = path === "/" || path === "" ? "/" : path;
    const onHome = pathname === "/" && targetPath === "/";

    if (onHome) {
      event.preventDefault();
      scrollToHash(hash);
      return;
    }

    if (targetPath === "/" && pathname !== "/") {
      event.preventDefault();
      router.push(`/#${hash}`);
    }
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
