import Link from "next/link";
import {
  ArrowUpRight,
  AtSign,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PageContainer } from "@/components/ui/PageContainer";
import { NavAnchor } from "@/components/ui/NavAnchor";
import { schedule } from "@/lib/data/clinic";
import { brand } from "@/lib/data/brand";
import { navItems } from "@/lib/data/nav";
import { site, whatsappUrlWithMessage } from "@/lib/data/site";
import { ICON_STROKE } from "@/lib/icons";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M17.5 6.5h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M20 11.5A7.5 7.5 0 0 1 9.2 18L4 20l1.8-5.2A7.5 7.5 0 1 1 20 11.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.5c.2-.5.5-.6 1-.4l.9.6c.3.2.4.6.2.9l-.2.5c-.1.2 0 .5.1.7.7 1.1 1.5 1.9 2.6 2.6.2.1.5.2.7.1l.5-.2c.3-.1.7 0 .9.2l.6.9c.2.4.1.8-.4 1-.6.3-1.4.5-2.1.2-1.5-.6-2.9-1.7-4.1-2.9-1.2-1.2-2.3-2.6-2.9-4.1-.3-.7-.1-1.5.2-2.1Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="relative border-t border-line bg-cream">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-optic/40 to-transparent"
        aria-hidden
      />

      <PageContainer size="full" className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="flex flex-col lg:col-span-5">
            <p className="text-xs text-eyebrow">
              UBICACIÓN Y CONTACTO
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.03em] text-ink">
              Visítanos en{" "}
              <span className="text-accent">Ovalle.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {brand.name} en Coquimbo #{site.streetNumber}. Salud visual
              amable para el Limarí — {site.payment.toLowerCase()}.
            </p>

            <div className="mt-8 flex gap-4 rounded-2xl border border-line bg-paper/90 p-4 backdrop-blur-sm">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-cream text-optic">
                <MapPin className="size-4" strokeWidth={ICON_STROKE} aria-hidden />
              </span>
              <div>
                <p className="font-medium text-ink">
                  {site.street} #{site.streetNumber}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {site.city}, {site.region}
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              <li className="rounded-2xl border border-line bg-paper/60 p-4">
                <Phone
                  className="size-4 text-optic"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                <a
                  href={`tel:${site.phone}`}
                  className="mt-3 block text-sm font-medium text-ink hover:text-optic"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="rounded-2xl border border-line bg-paper/60 p-4">
                <MessageCircle
                  className="size-4 text-optic"
                  strokeWidth={ICON_STROKE}
                  aria-hidden
                />
                <a
                  href={whatsappUrlWithMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Escribir por WhatsApp al ${site.phoneDisplay}`}
                  className="mt-3 block text-sm font-medium text-ink hover:text-optic"
                >
                  WhatsApp
                  <span className="mt-0.5 block text-xs font-normal text-muted">
                    {site.phoneDisplay}
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={site.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta gap-2 px-5 py-2.5"
              >
                Cómo llegar
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
              <a
                href={site.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Google Maps
              </a>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-paper shadow-float lg:col-span-7">
            <div className="relative min-h-[220px] flex-1 sm:min-h-[260px]">
              <iframe
                title={`Mapa — ${brand.name}, ${site.address}`}
                src={site.googleMapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[1.05] transition-[filter] duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="pointer-events-none absolute left-4 top-4 rounded-full border border-line bg-paper/95 px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.15em] text-muted backdrop-blur-sm">
                COQUIMBO · #{site.streetNumber}
              </p>
            </div>

            <div className="border-t border-line bg-cream/80 px-4 py-5 sm:px-6 sm:py-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-xs text-eyebrow">
                  <Clock className="size-3.5 text-optic" aria-hidden />
                  HORARIO DE ATENCIÓN
                </p>
                <span className="hidden rounded-full border border-line bg-paper px-3 py-1 font-mono text-[9px] font-medium tracking-[0.12em] text-muted sm:inline">
                  {site.payment}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <caption className="sr-only">Horario de atención</caption>
                  <thead>
                    <tr className="border-b border-line">
                      <th className="pb-2.5 pr-3 font-mono text-[9px] font-semibold tracking-[0.12em] text-muted">
                        DÍA
                      </th>
                      <th className="pb-2.5 pr-3 font-mono text-[9px] font-semibold tracking-[0.12em] text-muted">
                        MAÑANA
                      </th>
                      <th className="pb-2.5 font-mono text-[9px] font-semibold tracking-[0.12em] text-muted">
                        TARDE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row) => (
                      <tr
                        key={row.day}
                        className="border-b border-line/70 last:border-0"
                      >
                        <td className="py-2.5 pr-3 font-medium text-ink">
                          {row.day}
                        </td>
                        <td className="py-2.5 pr-3 text-muted">{row.morning}</td>
                        <td className="py-2.5 text-muted">{row.afternoon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandLogo size="footer" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Activa desde diciembre de 2024. Equipamiento clínico y amplia gama
              de armazones y cristales.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs text-eyebrow">
              NAVEGACIÓN
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems
                .filter((item) => item.href !== "/#contacto")
                .map((item) => (
                  <li key={item.href}>
                    <NavAnchor
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {item.label}
                    </NavAnchor>
                  </li>
                ))}
              <li>
                <Link
                  href="/reservar"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  Reservar cita
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs text-eyebrow">
              REDES Y CORREO
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {brand.instagram.map((ig) => (
                <li key={ig.handle}>
                  <a
                    href={ig.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  >
                    <InstagramIcon className="size-4 text-optic" />
                    <span className="font-medium text-ink/80">Instagram</span>
                    <span className="text-muted">·</span>
                    <span>{ig.handle}</span>
                  </a>
                </li>
              ))}
              {(brand.emails ?? [brand.email]).map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  >
                    <AtSign className="size-3.5 text-optic" aria-hidden />
                    <span className="font-medium text-ink/80">Correo</span>
                    <span className="text-muted">·</span>
                    {email}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrlWithMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
                  aria-label={`Escribir por WhatsApp al ${site.phoneDisplay}`}
                >
                  <WhatsAppIcon className="size-4 text-optic" />
                  <span className="font-medium text-ink/80">WhatsApp</span>
                  <span className="text-muted">·</span>
                  <span>{site.phoneDisplay}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <Link
            href="/reservar"
            className="btn-cta gap-2 px-8 py-3.5"
          >
            Agendar examen visual
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {brand.nameUpper}. {site.city},{" "}
            {site.country}.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
