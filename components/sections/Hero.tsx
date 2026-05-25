import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { HeroCurvedBrands } from "@/components/sections/HeroCurvedBrands";
import { NavAnchor } from "@/components/ui/NavAnchor";
import { PageContainer } from "@/components/ui/PageContainer";
import { brand } from "@/lib/data/brand";
import { heroHighlights } from "@/lib/data/hero";
import { site, whatsappUrlWithMessage } from "@/lib/data/site";
import { heroImage } from "@/lib/data/images";
import { ICON_STROKE } from "@/lib/icons";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] overflow-x-clip bg-background"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 15% 8%, rgba(126,184,232,0.16), transparent 58%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(30,77,140,0.08), transparent 52%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(247,244,238,0.9), transparent 45%)",
        }}
      />

      <PageContainer
        size="wide"
        className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-12 pt-24 sm:pb-14 sm:pt-28 lg:pt-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 xl:gap-20">
          <div className="text-center lg:text-left">
            <p className="text-xs text-eyebrow">
              {brand.nameUpper} · {site.locationLabel}
            </p>

            <div
              className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-optic/45 to-transparent lg:mx-0 lg:from-optic/50 lg:via-optic/30 lg:to-transparent"
              aria-hidden
            />

            <h1 className="mt-7 font-display text-[clamp(2.5rem,7.5vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.04em] text-foreground">
              <span className="block">Ver el mundo</span>
              <span className="mt-1 block text-optic">con precisión.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg lg:mx-0">
              Examen visual, receta y monturas en un solo lugar. Atención amable
              para la Provincia del Limarí.
            </p>

            <ul className="mx-auto mt-8 flex max-w-md flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
              {heroHighlights.map((item) => (
                <li
                  key={item.value}
                  className="rounded-full border border-line bg-paper/90 px-3.5 py-2 shadow-soft backdrop-blur-sm"
                >
                  <span className="font-display text-sm font-semibold text-optic">
                    {item.value}
                  </span>
                  <span className="ml-1.5 text-xs text-muted">{item.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link href="/reservar" className="btn-cta group">
                Reservar tu examen
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
              <a
                href={whatsappUrlWithMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label={`Consultar por WhatsApp al ${site.phoneDisplay}`}
              >
                WhatsApp
              </a>
            </div>

            <NavAnchor
              href="/#compromiso"
              className="mt-5 inline-flex text-sm text-muted underline-offset-4 transition-colors hover:text-optic hover:underline"
            >
              Nuestro compromiso
            </NavAnchor>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-optic/10 blur-2xl"
              aria-hidden
            />

            <figure className="relative overflow-hidden rounded-[1.75rem] border border-line bg-cream shadow-float ring-1 ring-line/50">
              <div className="relative aspect-[4/5] sm:aspect-[5/6]">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 90vw, 520px"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-optic/10 via-transparent to-transparent"
                  aria-hidden
                />

                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 sm:p-6">
                  <p className="inline-flex w-fit items-center gap-2 rounded-full border border-on-dark/20 bg-ink/90 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-on-dark backdrop-blur-md">
                    <MapPin
                      className="size-3 shrink-0 text-on-dark-accent"
                      strokeWidth={ICON_STROKE}
                      aria-hidden
                    />
                    SALUD VISUAL · OVALLE
                  </p>
                  <p className="max-w-[16rem] text-left text-sm font-medium leading-snug text-on-dark">
                    Nuestro local en Coquimbo 177 — te esperamos en Ovalle.
                  </p>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        <div className="relative mt-14 w-full lg:mt-16">
          <HeroCurvedBrands />
        </div>
      </PageContainer>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent sm:h-36"
        aria-hidden
      />
    </section>
  );
}
